# MIGRATION.md — ce qu'il reste à faire

## 1. Backend — à vérifier après `composer install`

- [ ] `composer install` (ajoute `laravel/sanctum`, retire `inertiajs/inertia-laravel`)
- [ ] `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`
      si le fichier `config/sanctum.php` généré diffère de celui fourni ici
- [ ] Vérifier `app/Http/Kernel.php` (s'il existe encore dans ta version Laravel)
      ou `bootstrap/app.php` : le middleware `EnsureFrontendRequestsAreStateful`
      doit bien s'appliquer aux routes `/api/*` (fait via `$middleware->statefulApi()`)
- [ ] Les contrôleurs Admin (`ArticleController`, `ProduitController`, etc.)
      utilisaient `Route::resource` (web, formulaires HTML implicites) ;
      ils sont passés en `Route::apiResource` — vérifie que chaque méthode
      `store`/`update` lit bien `$request->all()` ou `$request->validated()`
      sans dépendre de redirections web (`redirect()->back()`), qui n'ont
      plus de sens en API. Remplace tout `redirect()->...` restant par
      `response()->json([...], 200|201|204)`.
- [ ] `App\Http\Responses\LoginResponse` / `RegisterResponse` (Fortify) :
      vérifie qu'ils renvoient bien une réponse JSON quand
      `$request->wantsJson()` est vrai (comportement par défaut de Fortify,
      normalement rien à changer puisque le frontend envoie `Accept: application/json`)
- [ ] Storage public (images produits, factures PDF) : vérifie que les URLs
      générées (`Storage::url(...)`) restent des URLs absolues valides pour
      le frontend (domaine backend, pas frontend)

## 2. Frontend — pages à finir de migrer

Toutes les pages compilent grâce à `lib/inertia-shim.tsx`, mais certaines
attendaient des **props injectées par le serveur** (Inertia) qui n'existent
plus. Pour chacune, il faut ajouter un fetch (voir le patron dans
`src/pages/Catalogue.tsx`).

✅ Déjà corrigées (fetch ajouté + redirection après connexion/inscription) :
`Catalogue.tsx`, `ProductDetail.tsx`, `BlogIndex.tsx`, `BlogShow.tsx`,
`admin/Notifications.tsx`, `auth/login.tsx`, `auth/register.tsx`.

⚠️ Encore à faire (même symptôme : la page affiche une erreur ou reste
vide car `usePage().props` ne contient plus les données) :

| Page | Donnée à fetcher | Endpoint API |
|---|---|---|
| `pages/Home.tsx` / `Home/HomePage.tsx` | produits vedettes, etc. | `GET /api/` |
| `pages/about.tsx` | produits vedettes | `GET /api/a-propos` |
| `pages/contact.tsx` | — (juste le formulaire) | `POST /api/contact` |
| `pages/Checkout.tsx` | panier / récap commande | `POST /api/commandes` |
| `pages/AccountOrders.tsx` | commandes du client | `GET /api/compte/commandes` |
| `pages/settings/profile.tsx` | user + `mustVerifyEmail`/`status` | `GET /api/settings/profile` |
| `pages/admin/Dashboard.tsx` | statistiques | `GET /api/admin` |
| `pages/admin/Articles.tsx` | liste articles | `GET /api/admin/articles` |
| `pages/admin/Categories.tsx` | liste catégories | `GET /api/admin/categories` |
| `pages/admin/Clients.tsx` | liste clients | `GET /api/admin/clients` |
| `pages/admin/Commandes` (`Orders.tsx`) | liste commandes | `GET /api/admin/commandes` |
| `pages/admin/Products.tsx` | liste produits | `GET /api/admin/produits` |
| `pages/admin/Reviews.tsx` | liste avis | `GET /api/admin/avis` |
| `pages/admin/Messages.tsx` | liste messages contact | `GET /api/admin/messages` |
| `pages/admin/Settings.tsx` | paramètres admin | `GET /api/admin/parametres` |

Le correctif type (voir `admin/Notifications.tsx` pour un exemple complet
d'écran admin) :
1. Remplacer `usePage<...>().props` par un `useState(null)` + `useEffect`
   qui appelle `api.get('/api/...')`.
2. Après toute action qui modifie les données (créer/modifier/supprimer),
   rappeler ce même fetch pour rafraîchir la liste (Inertia le faisait
   automatiquement, plus maintenant).
3. Les URLs d'action (`admin.produits.update(id).url`, etc.) sont déjà
   préfixées `/api/...` dans `src/routes/admin/*` — pas besoin d'y toucher.

## 3. Points d'attention sur le shim (`src/lib/inertia-shim.tsx`)

- `usePage().props` ne fournit plus que `{ auth, name, sidebarOpen }`
  (équivalent des "shared props" Inertia). Toute prop spécifique à une page
  doit venir d'un fetch local, pas de `usePage()`.
- `Head` ne gère que `title` (pas les balises `<meta>` enfants) — à étendre
  si le SEO par page est important.
- `Form` (composant Inertia v2) est réimplémenté simplement : il lit un
  `FormData` natif du `<form>` au submit. Si une page utilisait des champs
  contrôlés en dehors du `<form>`, vérifie que leurs `name` HTML sont bien
  posés (`<input name="email" />`), sinon `FormData` ne les verra pas.
- `router.visit()` fait une vraie navigation SPA une fois que `App.tsx` a
  monté (`setRouterNavigate`) ; avant ce montage (très bref), il retombe sur
  `window.location.href`.

## 4. Fichiers legacy à supprimer une fois la migration terminée

- `frontend/src/lib/inertia-shim.tsx` peut être progressivement vidé au fur
  et à mesure que chaque page est réécrite "nativement" (react-router pur).
- Les routes générées par Wayfinder (`frontend/src/routes/`,
  `frontend/src/wayfinder/`) ont été **préfixées manuellement en `/api`**
  pour coller aux nouvelles routes du backend. Si tu modifies les routes
  Laravel plus tard, régénère-les avec `php artisan wayfinder:generate`
  côté backend puis recopie-les et re-préfixe (ou écris-les à la main).
