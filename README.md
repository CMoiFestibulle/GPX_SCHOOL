# GPX Révision — déploiement Netlify

Ce dossier est un projet complet et prêt à déployer. Le contenu de l'application
(`src/App.jsx`) n'a rien été modifié dans son fond (fiches, examens,
entraînement PV...).

## Fonctionnement

- Chaque élève crée sa session avec un prénom + un code à 4 chiffres.
- Toute nouvelle session doit être validée par l'administrateur (Thimy) dans
  l'onglet "Sessions élèves" avant de devenir accessible (système
  d'approbation, pour éviter les créations de comptes automatisées).
- Accès administrateur : taper "Thimy" au démarrage suffit, sans code.
- Les données (sessions, progression, tickets support) sont stockées via
  Netlify Blobs, à travers la fonction serverless `netlify/functions/storage.js`.

## Fichiers du projet

- `src/App.jsx` — l'application complète (contenu + interface).
- `src/storageShim.js` — reproduit l'API `window.storage` attendue par
  l'app, en la faisant transiter par `/api/storage`.
- `netlify/functions/storage.js` — fonction serverless qui lit/écrit dans
  Netlify Blobs.
- `netlify.toml` — configuration du build et des redirections.

## Déploiement

### Option recommandée — connexion à un dépôt Git

1. Mets ce dossier dans un dépôt GitHub (ou GitLab/Bitbucket).
2. Sur Netlify : **Add new site → Import an existing project** → connecte le
   dépôt.
3. Netlify détecte automatiquement `netlify.toml` (build, dossier à publier,
   fonctions) — clique **Deploy**.

### Depuis ton ordinateur, en ligne de commande

```bash
npm install
npm install -g netlify-cli
netlify deploy --prod
```

## Vérification après déploiement

- Connecte-toi en tapant "Thimy" : l'accès admin doit être immédiat, sans
  code demandé.
- Dans "Sessions élèves", le code de chaque élève s'affiche en clair
  ("code : ####"), modifiable à tout moment.
- Crée un compte élève depuis l'écran de connexion : il doit apparaître dans
  "Demandes en attente de validation" avant de pouvoir être utilisé.

## Point d'attention

Les codes élèves et le compte admin sont stockés sans chiffrement ni
protection particulière côté serveur — la seule barrière d'accès est le
système d'approbation manuelle des nouveaux comptes. C'est un choix assumé
pour cette application (groupe restreint d'une même promotion), pas une
limitation technique.
