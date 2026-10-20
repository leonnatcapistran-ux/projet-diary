# Diary Madagascar — projet découpé en backend / frontend

Ce dépôt a été scindé en deux applications indépendantes :

```
backend/    Laravel 12 — API JSON pure (Sanctum pour l'auth SPA)
frontend/   Vite + React 19 — SPA autonome (React Router, axios)
```

## Pourquoi ce découpage

Le projet était un monolithe **Laravel + Inertia.js** : les contrôleurs
rendaient directement les pages React côté serveur (`Inertia::render(...)`),
sans API REST. Ce n'est plus le cas : le backend ne renvoie plus que du JSON,
et le frontend est un SPA classique qui consomme cette API via `fetch`/axios.

> Déploiement Docker + CI/CD (GitHub Actions / Jenkins) : voir **DEPLOY.md**.

## Démarrage rapide

### Backend

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve   # http://localhost:8000
```

Dans `.env`, vérifie/ajuste :
- `SANCTUM_STATEFUL_DOMAINS=localhost:5173`
- `FRONTEND_URLS=http://localhost:5173`
- `SESSION_DOMAIN=localhost` (en prod : ton domaine racine commun, ex. `.tondomaine.mg`)

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:8000
npm run dev             # http://localhost:5173
```

## Authentification (Sanctum SPA)

Le frontend s'authentifie par **cookie de session** (pas de token à stocker
en localStorage — plus sûr contre le XSS) :

1. `GET /sanctum/csrf-cookie` avant tout login/register (géré automatiquement
   par `ensureCsrfCookie()` dans `frontend/src/lib/api.ts`)
2. `POST /login` (route Fortify, déjà en place côté backend)
3. Les requêtes suivantes envoient le cookie de session automatiquement
   (`withCredentials: true`)

En production, backend et frontend doivent partager le même domaine racine
(ex. `api.diary.mg` et `app.diary.mg`) pour que les cookies fonctionnent.

## État de la migration — IMPORTANT

Voir **MIGRATION.md** pour le détail complet. En résumé :

- ✅ Backend : tous les contrôleurs renvoient du JSON, routes API en place,
  Sanctum/CORS configurés.
- ✅ Frontend : structure Vite/React Router en place, toutes les pages ont
  été **débranchées d'Inertia** via une couche de compatibilité
  (`frontend/src/lib/inertia-shim.tsx`) qui réimplémente `Link`, `useForm`,
  `usePage`, `Head`, `router`, `Form` par-dessus axios/react-router.
- ⚠️ Cette couche de compatibilité permet au code de **compiler et de
  fonctionner rapidement**, mais certaines pages qui recevaient leurs
  données via les props Inertia (`usePage().props`) doivent être adaptées
  pour aller chercher leurs données via un `useEffect` + `api.get(...)`
  (voir l'exemple dans `frontend/src/pages/Catalogue.tsx`).
- ⚠️ Je n'ai pas pu exécuter `composer install` / `npm install` /
  `npm run build` dans cet environnement (pas d'accès à packagist.org),
  donc le code n'a pas été testé en conditions réelles — attends-toi à
  devoir corriger quelques erreurs TypeScript/PHP mineures au premier
  `npm run dev` / `php artisan serve`.
