// Vérifie le code (pin) d'un élève côté serveur : le code n'est jamais
// comparé côté client, et n'est jamais renvoyé au navigateur. Limite le
// nombre de tentatives pour ralentir un essai systématique des 10 000 codes
// possibles. Migre automatiquement les anciens comptes qui avaient encore un
// code en clair (avant le hachage) vers un code haché, de façon transparente.

import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

const FENETRE_MS = 10 * 60 * 1000; // 10 minutes
const MAX_TENTATIVES = 8;

function normalizeKey(name) {
  // Doit rester rigoureusement identique à normalizeKey côté client (App.jsx).
  return String(name || "").trim().toLowerCase().replace(/\s+/g, "");
}

function hashPin(pin) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(pin), salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPin(pin, stored) {
  if (!stored || typeof stored !== "string" || !stored.includes(":")) return false;
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  let candidate;
  try {
    candidate = crypto.scryptSync(String(pin), salt, 32);
  } catch (e) {
    return false;
  }
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return crypto.timingSafeEqual(candidate, expected);
}

function signToken(payload, secret, ttlSeconds = 6 * 60 * 60) {
  const body = { ...payload, iat: Date.now(), exp: Date.now() + ttlSeconds * 1000 };
  const b64 = Buffer.from(JSON.stringify(body)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(b64).digest("base64url");
  return `${b64}.${sig}`;
}

async function verifierDebit(rateStore, cle) {
  const now = Date.now();
  let entry = null;
  try {
    const raw = await rateStore.get(cle);
    entry = raw ? JSON.parse(raw) : null;
  } catch (e) {
    entry = null;
  }
  if (!entry || now - entry.debut > FENETRE_MS) {
    entry = { debut: now, tentatives: 0 };
  }
  entry.tentatives += 1;
  await rateStore.set(cle, JSON.stringify(entry));
  return entry.tentatives <= MAX_TENTATIVES;
}

async function reinitialiserDebit(rateStore, cle) {
  try { await rateStore.delete(cle); } catch (e) { /* ignore */ }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

export default async (req) => {
  if (req.method !== "POST") {
    return jsonResponse({ ok: false, error: "Méthode non supportée" }, 405);
  }

  const secret = process.env.SESSION_SECRET || "";
  if (!secret) {
    return jsonResponse({ ok: false, error: "SESSION_SECRET n'est pas configuré côté serveur." }, 500);
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return jsonResponse({ ok: false, error: "Corps de requête invalide" }, 400);
  }

  const { name, pin } = body;
  if (!name || !pin) {
    return jsonResponse({ ok: false, error: "Prénom et code requis." }, 400);
  }

  const norm = normalizeKey(name);
  const rateStore = getStore("gpx-ratelimit");
  const cleDebit = `login:${norm}`;

  const autorise = await verifierDebit(rateStore, cleDebit);
  if (!autorise) {
    return jsonResponse({ ok: false, error: "Trop de tentatives. Réessaie dans quelques minutes." }, 429);
  }

  const store = getStore("gpx-shared");
  const raw = await store.get(`student:${norm}`);
  if (!raw) {
    return jsonResponse({ ok: false, error: "Aucune session avec ce prénom." }, 404);
  }

  let record;
  try {
    record = JSON.parse(raw);
  } catch (e) {
    return jsonResponse({ ok: false, error: "Données de session illisibles." }, 500);
  }

  let valide = false;
  if (record.pinHash) {
    valide = verifyPin(pin, record.pinHash);
  } else if (record.pin != null) {
    // Ancien compte, code encore en clair : on vérifie une dernière fois de
    // façon directe, puis on migre immédiatement vers un code haché.
    valide = String(record.pin) === String(pin);
    if (valide) {
      record.pinHash = hashPin(pin);
      delete record.pin;
      await store.set(`student:${norm}`, JSON.stringify(record));
    }
  }

  if (!valide) {
    return jsonResponse({ ok: false, error: "Code incorrect." });
  }

  await reinitialiserDebit(rateStore, cleDebit);

  const { pin: _p, pinHash: _h, ...sansDonneesSensibles } = record;
  const token = signToken({ name: record.name, isAdmin: !!record.isAdmin }, secret);

  return jsonResponse({ ok: true, token, student: sansDonneesSensibles });
};

export const config = {
  path: "/api/verify-login",
};
