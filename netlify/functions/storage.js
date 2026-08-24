// Fonction serverless Netlify qui reproduit l'API window.storage utilisée par
// l'application (get / set / delete / list), adossée à Netlify Blobs — version
// durcie : les codes (pin) élèves sont hachés avant stockage et ne sont plus
// jamais renvoyés au navigateur ; les écritures sensibles exigent un jeton
// valide (élève sur sa propre session, ou admin).
//
// Contrat respecté côté app (identique à window.storage) :
//   get(key, shared)    -> { key, value, shared } | null
//   set(key, value, shared) -> { key, value, shared } | null
//   delete(key, shared) -> { key, deleted, shared } | null
//   list(prefix, shared) -> { keys, prefix, shared } | null
//
// En plus du contrat d'origine, le corps de la requête peut inclure un champ
// "token" (issu de /api/verify-login ou /api/admin-auth) utilisé pour
// autoriser les écritures sur les données d'un élève ou d'un ticket.

import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

const ADMIN_NAME_NORM = "thimy";

function storeFor(shared) {
  return getStore(shared ? "gpx-shared" : "gpx-private");
}

function normalizeKey(name) {
  // Doit rester rigoureusement identique à normalizeKey côté client (App.jsx).
  return String(name || "").trim().toLowerCase().replace(/\s+/g, "");
}

/* ------------------------- codes (pin) : hachage ------------------------- */

function hashPin(pin) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(pin), salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

/* ------------------------------ jetons HMAC ------------------------------ */

function getSecret() {
  return process.env.SESSION_SECRET || "";
}

function verifyToken(token) {
  const secret = getSecret();
  if (!secret || !token || typeof token !== "string" || !token.includes(".")) return null;
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return null;
  const expectedSig = crypto.createHmac("sha256", secret).update(b64).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(b64, "base64url").toString("utf8"));
  } catch (e) {
    return null;
  }
  if (!payload.exp || Date.now() > payload.exp) return null;
  return payload;
}

/* ------------------------------ utilitaires ------------------------------ */

function sansDonneesSensibles(obj) {
  if (!obj || typeof obj !== "object") return obj;
  const { pin, pinHash, ...reste } = obj;
  return reste;
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

export default async (req) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Méthode non supportée" }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return jsonResponse({ error: "Corps de requête invalide" }, 400);
  }

  const { action, key = "", value, shared = false, prefix = "", token } = body;
  const store = storeFor(shared);
  const auth = token ? verifyToken(token) : null;
  const secretConfigured = !!getSecret();

  try {
    /* --------------------------------- GET --------------------------------- */
    if (action === "get") {
      const found = await store.get(key);
      if (found === null || found === undefined) {
        return jsonResponse(null);
      }
      if (shared && key.startsWith("student:")) {
        let parsed;
        try { parsed = JSON.parse(found); } catch (e) { parsed = found; }
        const safe = typeof parsed === "object" ? sansDonneesSensibles(parsed) : parsed;
        return jsonResponse({ key, value: JSON.stringify(safe), shared });
      }
      return jsonResponse({ key, value: found, shared });
    }

    /* --------------------------------- LIST --------------------------------- */
    if (action === "list") {
      const { blobs } = await store.list({ prefix });
      const keys = blobs.map((b) => b.key);
      return jsonResponse({ keys, prefix, shared });
    }

    /* --------------------------------- SET --------------------------------- */
    if (action === "set") {
      if (!secretConfigured) {
        return jsonResponse({ error: "Configuration serveur incomplète : SESSION_SECRET n'est pas défini." }, 500);
      }

      if (shared && key.startsWith("student:")) {
        const cibleNorm = key.slice("student:".length);
        let incoming;
        try { incoming = typeof value === "string" ? JSON.parse(value) : value; } catch (e) { incoming = value; }

        const existingRaw = await store.get(key);
        const existing = existingRaw ? (() => { try { return JSON.parse(existingRaw); } catch (e) { return null; } })() : null;

        const estSoiMeme = auth && normalizeKey(auth.name) === cibleNorm;
        const estAdmin = auth && auth.isAdmin === true;

        if (!existing) {
          // Création (auto-inscription libre, ou compte créé à la main par
          // l'admin). Les champs sensibles restent imposés par le serveur :
          // isAdmin ne peut être vrai que pour le compte de l'administratrice
          // elle-même, et seule une création authentifiée par un jeton admin
          // peut être directement approuvée ; une auto-inscription libre
          // reste toujours en attente de validation.
          const estCompteAdmin = cibleNorm === ADMIN_NAME_NORM;
          incoming.isAdmin = estCompteAdmin && estAdmin ? true : false;
          incoming.approuve = estAdmin ? incoming.approuve === true : false;
        } else {
          if (!estSoiMeme && !estAdmin) {
            return jsonResponse({ error: "Non autorisé." }, 403);
          }
          if (!estAdmin) {
            // Un élève ne peut jamais changer son propre statut admin/approbation.
            incoming.isAdmin = existing.isAdmin;
            incoming.approuve = existing.approuve;
          }
        }

        if (incoming && typeof incoming === "object" && incoming.pin) {
          incoming.pinHash = hashPin(incoming.pin);
          delete incoming.pin;
        } else if (existing && existing.pinHash) {
          incoming.pinHash = existing.pinHash;
        }

        await store.set(key, JSON.stringify(incoming));
        return jsonResponse({ key, value: JSON.stringify(sansDonneesSensibles(incoming)), shared });
      }

      if (shared && key.startsWith("ticket:")) {
        let incoming;
        try { incoming = typeof value === "string" ? JSON.parse(value) : value; } catch (e) { incoming = value; }

        const existingRaw = await store.get(key);
        const existing = existingRaw ? (() => { try { return JSON.parse(existingRaw); } catch (e) { return null; } })() : null;
        const estAdmin = auth && auth.isAdmin === true;

        if (!existing) {
          if (!auth || normalizeKey(auth.name) !== normalizeKey(incoming?.auteur)) {
            return jsonResponse({ error: "Non autorisé." }, 403);
          }
          incoming.reponseAdmin = "";
          incoming.resolu = false;
        } else if (!estAdmin) {
          return jsonResponse({ error: "Non autorisé." }, 403);
        }

        await store.set(key, JSON.stringify(incoming));
        return jsonResponse({ key, value: JSON.stringify(incoming), shared });
      }

      // Toute autre clé partagée : réservé à l'admin par défaut.
      if (shared && !(auth && auth.isAdmin === true)) {
        return jsonResponse({ error: "Non autorisé." }, 403);
      }
      await store.set(key, typeof value === "string" ? value : JSON.stringify(value));
      return jsonResponse({ key, value, shared });
    }

    /* -------------------------------- DELETE -------------------------------- */
    if (action === "delete") {
      if (shared && (key.startsWith("student:") || key.startsWith("ticket:"))) {
        if (!auth || auth.isAdmin !== true) {
          return jsonResponse({ error: "Non autorisé." }, 403);
        }
      }
      await store.delete(key);
      return jsonResponse({ key, deleted: true, shared });
    }

    return jsonResponse({ error: "Action inconnue" }, 400);
  } catch (e) {
    return jsonResponse({ error: String(e) }, 500);
  }
};

export const config = {
  path: "/api/storage",
};
