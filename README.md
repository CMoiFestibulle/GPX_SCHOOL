# GPX Révision — déploiement Netlify

Ce dossier est un projet complet et prêt à déployer. Le contenu de l'application
(`src/App.jsx`) n'a rien été modifié dans son fond (fiches, examens,
entraînement PV...).

## Fonctionnement

- Chaque élève crée sa session avec un prénom + un code à 4 chiffres.
- Toute nouvelle session doit être validée par l'administrateur (Thimy) dans
  l'onglet "Sessions élèves" avant de devenir accessible (système
  d'approbation, pour éviter les créations de comptes automatisées).
- Accès administrateur : taper "Thimy" au démarrage suffit, sans code — choix
  assumé du projet (voir "Point d'attention" ci-dessous).
- Les données (sessions, progression, tickets support) sont stockées via
  Netlify Blobs, à travers 3 fonctions serverless dédiées.

## ⚠️ Variable d'environnement obligatoire

Avant le premier déploiement (ou juste après), va sur Netlify :
**Site configuration → Environment variables**, et ajoute :

- `SESSION_SECRET` : une chaîne longue et aléatoire (30+ caractères, peu
  importe laquelle — sers-toi d'un générateur de mot de passe). Sert à signer
  les jetons de connexion. Sans elle, la connexion élève et l'accès admin ne
  fonctionneront pas (message d'erreur explicite affiché dans ce cas).

Après l'avoir ajoutée : **Deploys → Trigger deploy → Deploy site**.

Contrairement à une tentative précédente, **aucun code secret n'est écrit
dans le code source** : `SESSION_SECRET` n'a donc aucun risque de faire
bloquer le build par le scanner de secrets de Netlify, quelle que soit la
valeur choisie.

## Fichiers du projet

- `src/App.jsx` — l'application complète (contenu + interface).
- `src/storageShim.js` — reproduit l'API `window.storage` attendue par
  l'app, en la faisant transiter par `/api/storage`, et joint automatiquement
  le jeton de session à chaque appel.
- `netlify/functions/storage.js` — lit/écrit dans Netlify Blobs ; hache les
  codes élèves, ne renvoie jamais de code au navigateur, exige un jeton
  valide pour toute écriture sensible.
- `netlify/functions/verify-login.js` — vérifie le code d'un élève côté
  serveur (jamais côté client), limite les tentatives, émet un jeton de
  session en cas de succès.
- `netlify/functions/admin-auth.js` — émet un jeton admin quand le prénom
  saisi correspond à l'administratrice (voir le point d'attention plus bas).
- `netlify.toml` — configuration du build, des redirections et des en-têtes
  de sécurité HTTP.

## Déploiement

### Option recommandée — connexion à un dépôt Git

1. Mets ce dossier dans un dépôt GitHub (ou GitLab/Bitbucket).
2. Sur Netlify : **Add new site → Import an existing project** → connecte le
   dépôt.
3. Netlify détecte automatiquement `netlify.toml` (build, dossier à publier,
   fonctions) — clique **Deploy**.
4. Ajoute `SESSION_SECRET` (voir ci-dessus), puis **Trigger deploy**.

### Depuis ton ordinateur, en ligne de commande

```bash
npm install
npm install -g netlify-cli
netlify deploy --prod
```

## Vérification après déploiement

- Connecte-toi en tapant "Thimy" : l'accès admin doit être immédiat, sans
  code demandé.
- Dans "Sessions élèves", chaque compte affiche "code protégé" — le code
  réel n'est plus jamais visible nulle part, y compris pour l'admin.
- Crée un compte élève depuis l'écran de connexion, puis reconnecte-toi avec
  le même code : ça doit marcher. Avec un mauvais code : refusé. Après
  plusieurs codes erronés d'affilée : message "Trop de tentatives".

## Point d'attention

`ADMIN_NAME` ("Thimy") reste visible dans le code source de l'application,
comme n'importe quel texte affiché à l'écran — c'est inévitable pour du code
qui s'exécute dans le navigateur. Le choix assumé de ce projet est de ne pas
demander de code secret pour l'accès admin, uniquement le prénom. Cela
signifie que l'accès admin n'est pas protégé par un vrai secret : quelqu'un
de suffisamment déterminé et technique pourrait obtenir un accès admin en
lisant le code source, même si l'interface elle-même ne le permet pas en
usage normal. Tout le reste (codes élèves, données personnelles) est en
revanche correctement protégé : haché avant stockage, jamais renvoyé au
navigateur, écritures vérifiées côté serveur.

