// Reproduit l'API window.storage attendue par App.jsx (get / set / delete /
// list), en la faisant transiter par la fonction serverless Netlify
// /api/storage, elle-même adossée à Netlify Blobs.
//
// Ce fichier ne modifie EN RIEN le contenu ou la logique de l'application :
// il fournit juste, dans le navigateur, le même objet window.storage que
// celui fourni nativement par l'environnement Claude.ai. Il ajoute en plus
// une méthode setAuthToken (absente de l'environnement Claude.ai, donc à
// appeler uniquement après vérification que window.storage.setAuthToken
// existe) qui joint automatiquement le jeton de session à chaque requête.

let currentToken = null;

async function call(action, payload) {
  const res = await fetch("/api/storage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, token: currentToken, ...payload }),
  });
  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = data?.error ? ` — ${data.error}` : "";
    } catch (e) {
      /* réponse non JSON, on garde le detail vide */
    }
    throw new Error(`Erreur de stockage (${action}) : ${res.status}${detail}`);
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
  setAuthToken(token) {
    currentToken = token || null;
  },
};

if (typeof window !== "undefined" && !window.storage) {
  window.storage = storage;
}

export default storage;
