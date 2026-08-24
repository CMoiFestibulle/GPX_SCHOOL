// Fonction serverless Netlify qui reproduit l'API window.storage utilisée par
// l'application (get / set / delete / list), adossée à Netlify Blobs.
//
// Contrat respecté côté app (identique à window.storage) :
//   get(key, shared)    -> { key, value, shared } | null
//   set(key, value, shared) -> { key, value, shared } | null
//   delete(key, shared) -> { key, deleted, shared } | null
//   list(prefix, shared) -> { keys, prefix, shared } | null

import { getStore } from "@netlify/blobs";

function storeFor(shared) {
  return getStore(shared ? "gpx-shared" : "gpx-private");
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non supportée" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Corps de requête invalide" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { action, key, value, shared = false, prefix = "" } = body;
  const store = storeFor(shared);

  try {
    if (action === "get") {
      const found = await store.get(key);
      if (found === null || found === undefined) {
        return new Response(JSON.stringify(null), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      return new Response(JSON.stringify({ key, value: found, shared }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (action === "set") {
      await store.set(key, value);
      return new Response(JSON.stringify({ key, value, shared }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (action === "delete") {
      await store.delete(key);
      return new Response(JSON.stringify({ key, deleted: true, shared }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (action === "list") {
      const { blobs } = await store.list({ prefix });
      const keys = blobs.map((b) => b.key);
      return new Response(JSON.stringify({ keys, prefix, shared }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Action inconnue" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/storage",
};
