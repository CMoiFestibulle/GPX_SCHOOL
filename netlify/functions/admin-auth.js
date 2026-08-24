// Émet un jeton admin quand le prénom saisi correspond à l'administratrice.
// Choix assumé du projet : pas de code secret pour l'accès admin (juste le
// prénom) — ce point ne constitue donc pas une vraie barrière face à
// quelqu'un qui lirait le code source, seulement face à un usage superficiel
// de l'interface. En revanche, faire passer cette étape par le serveur (avec
// limitation des tentatives) évite qu'une action sensible (approbation,
// suppression, réponse aux tickets) ne soit déclenchée par un simple appel
// direct à /api/storage sans jeton du tout.

import crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

const ADMIN_NAME = "Thimy";
const FENETRE_MS = 10 * 60 * 1000;
const MAX_TENTATIVES = 20;

function normalizeKey(name) {
  // Doit rester rigoureusement identique à normalizeKey côté client (App.jsx).
  return String(name || "").trim().toLowerCase().replace(/\s+/g, "");
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

  const { name } = body;
  if (!name) {
    return jsonResponse({ ok: false, error: "Prénom requis." }, 400);
  }

  const rateStore = getStore("gpx-ratelimit");
  const autorise = await verifierDebit(rateStore, `admin:${normalizeKey(name)}`);
  if (!autorise) {
    return jsonResponse({ ok: false, error: "Trop de tentatives. Réessaie dans quelques minutes." }, 429);
  }

  if (normalizeKey(name) !== normalizeKey(ADMIN_NAME)) {
    return jsonResponse({ ok: false, error: "Accès refusé." }, 403);
  }

  const token = signToken({ name: ADMIN_NAME, isAdmin: true }, secret);
  return jsonResponse({ ok: true, token });
};

export const config = {
  path: "/api/admin-auth",
};
