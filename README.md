# Blogger-Box Frontend

Frontend Angular 17 pour l'application Blogger-Box.

Cette app permet de:
- Afficher la liste des posts (avec categorie et date)
- Rafraichir la liste
- Creer un nouveau post via un formulaire valide

## Stack technique

- Angular `17.3.x` (architecture NgModule, non-standalone)
- TypeScript `5.4.x`
- RxJS `7.8.x`
- Bootstrap `5.3.x` + Bootstrap Icons
- SweetAlert2 (toasts)

## Prerequis

- Node.js `>= 18.13` (recommande: Node 20 LTS)
- npm `>= 9`
- Backend Blogger-Box demarre sur `http://localhost:8080`

## Guide d'installation

1. Cloner le depot frontend:
```bash
git clone https://github.com/dalalsml/blogger-box-frontend.git
cd blogger-box-frontend
```

2. Installer les dependances:
```bash
npm install
```

3. Verifier la configuration de l'API:
- Fichier: `src/environments/environment.ts`
- Valeur attendue: `apiBaseUrl: 'http://localhost:8080/api'`

4. Demarrer le backend (dans le repo backend), puis lancer le frontend:
```bash
npm start
```

5. Ouvrir l'application:
- `http://localhost:4200`

## Scripts utiles

- `npm start`: lance le serveur de developpement Angular
- `npm run build`: build de production dans `dist/blogger-box-frontend`
- `npm run watch`: build de developpement en mode watch
- `npm test`: lance les tests unitaires (Karma/Jasmine)

## Configuration API

Le frontend consomme par defaut:
- `GET /api/posts`
- `POST /api/posts`
- `GET /api/categories`
- etc.

Base URL configuree dans:
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Si votre backend tourne sur un autre port/hote, modifiez `apiBaseUrl`.

## Routage

- `/` -> liste des posts
- `/add-post` -> formulaire de creation
- `**` -> redirection vers `/`

## Structure du projet (fichier par fichier)

### Racine
- `package.json`: dependances, scripts npm
- `package-lock.json`: verrouillage des versions npm
- `angular.json`: config Angular CLI (build/serve/styles/scripts/budgets)
- `tsconfig.json`: regles TypeScript strictes
- `tsconfig.app.json`: tsconfig pour l'app
- `tsconfig.spec.json`: tsconfig pour les tests
- `README.md`: documentation du projet
- `.editorconfig`: regles d'edition
- `.gitignore`: fichiers/dossiers ignores par Git

### `src/`
- `index.html`: page hote HTML
- `main.ts`: bootstrap Angular (`AppModule`)
- `styles.css`: styles globaux (fond + typo + reset box-sizing)
- `favicon.ico`: icone du site

### `src/environments/`
- `environment.ts`: config dev (`production: false`, URL API)
- `environment.prod.ts`: config prod (`production: true`, URL API)

### `src/app/` (core)
- `app.module.ts`: module principal (declarations/imports/bootstrap)
- `app-routing.module.ts`: routes de l'application
- `app.component.ts`: composant racine
- `app.component.html`: layout global (`top-bar` + `router-outlet`)
- `app.component.css`: container principal
- `app.component.spec.ts`: tests de base du composant racine

### `src/app/models/`
- `post.model.ts`: interface `Post` + types d'input create/update/patch
- `category.model.ts`: interface `Category` + types d'input

### `src/app/services/`
- `post.service.ts`:
  - CRUD des posts
  - normalisation des reponses API (array direct ou enveloppe)
  - normalisation date + correction d'encodage texte
- `category.service.ts`:
  - CRUD des categories
  - recuperation des posts d'une categorie
  - gestion d'erreurs HTTP centralisee

### `src/app/components/top-bar/`
- `top-bar.component.ts`: composant navbar
- `top-bar.component.html`: logo + bouton `Write`
- `top-bar.component.css`: style navbar (bordure + blur)

### `src/app/components/posts-list/`
- `posts-list.component.ts`:
  - flux RxJS pour chargement/refresh
  - gestion `loading`, `error`, `postsTotal`
  - tri par date decroissante
- `posts-list.component.html`: panneau liste + compteur + bouton recharger
- `posts-list.component.css`: mise en page et scroll de la liste

### `src/app/components/post-list-item/`
- `post-list-item.component.ts`: composant de rendu d'un post
- `post-list-item.component.html`: titre, contenu, badge categorie, date
- `post-list-item.component.css`: style carte post

### `src/app/components/add-post/`
- `add-post.component.ts`:
  - formulaire reactif
  - validation
  - chargement categories
  - soumission + toast succes/erreur
- `add-post.component.html`: template du formulaire
- `add-post.component.css`: styles locaux du formulaire

### `src/app/components/home/` (non utilise actuellement)
- `home.component.ts/.html/.css`: ancienne vue dashboard API
- Remarque: ce composant n'est pas declare dans `app.module.ts` et n'est pas route.

## Flux fonctionnel

1. L'app demarre dans `AppComponent`.
2. La route `/` charge `PostsListComponent`.
3. `PostsListComponent` appelle `PostService.getAll()`.
4. Les posts sont normalises puis affiches via `PostListItemComponent`.
5. La route `/add-post` ouvre le formulaire `AddPostComponent`.
6. A la soumission, l'app envoie `POST /api/posts`, affiche un toast, puis revient a `/`.

## Build et deploiement

Build production:
```bash
npm run build
```

Sortie:
- `dist/blogger-box-frontend`

Exemple de deploiement statique:
- Nginx
- Apache
- GitHub Pages (avec configuration Angular adaptee)

## Depannage rapide

- Erreur de chargement posts:
  - Verifier que le backend repond sur `http://localhost:8080/api/posts`
  - Verifier `apiBaseUrl` dans les fichiers `environment`
- Seulement quelques posts visibles:
  - La liste est dans une zone scrollable (`posts-list.component.css`), faire defiler
  - Verifier la reponse brute API
- Erreurs CORS:
  - Verifier la config CORS cote backend
- Port 4200 deja utilise:
```bash
npx ng serve --port 4201
```

## Ameliorations possibles

- Ajouter tests unitaires pour `PostService` et `AddPostComponent`
- Ajouter pagination/filtre/recherche cote UI
- Ajouter i18n (FR/EN)
- Ajouter CI (lint/test/build) sur GitHub Actions
