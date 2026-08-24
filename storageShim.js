// Reproduit exactement l'API window.storage attendue par App.jsx
// (get / set / delete / list), en la faisant transiter par la fonction
// serverless Netlify /api/storage, elle-même adossée à Netlify Blobs.
//
// Ce fichier ne modifie EN RIEN le contenu ou la logique de l'application :
// il fournit juste, dans le navigateur, le même objet window.storage que
// celui fourni nativement par l'environnement Claude.ai.

async function call(action, payload) {
  const res = await fetch("/api/storage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...payload }),
  });
  if (!res.ok) {
    throw new Error(`Erreur de stockage (${action}) : ${res.status}`);
  }
  return res.json();
}

const storage = {
  async get(key, shared = false) {
    return call("get", { key, shared });
  },
  async set(key, value, shared = false) {
    return call("set", { key, value, shared });
  },
  async delete(key, shared = false) {
    return call("delete", { key, shared });
  },
  async list(prefix = "", shared = false) {
    return call("list", { prefix, shared });
  },
};

if (typeof window !== "undefined" && !window.storage) {
  window.storage = storage;
}

export default storage;
