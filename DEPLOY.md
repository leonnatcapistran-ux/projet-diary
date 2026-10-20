# Déploiement & automatisation (Docker · GitHub Actions · Jenkins)

## Architecture

```
 navigateur ──► frontend (nginx, :8080/:80)  fichiers statiques React
      │
      └──────► backend  (nginx+php-fpm, :8000)  API Laravel  ──► db (MySQL 8.4)
```

Fichiers ajoutés : `docker-compose.yml`, `docker-compose.build.yml`, `.env.example`,
`backend/Dockerfile` (+ `backend/docker/`), `frontend/Dockerfile` (+ `nginx.conf`),
`Jenkinsfile`, `.github/workflows/ci-cd.yml`.

## 1. Tester en local avec Docker

```bash
cp .env.example .env          # puis renseigne APP_KEY et les mots de passe DB
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```
- Site : http://localhost:8080  · API : http://localhost:8000/api/catalogue
- Les migrations tournent automatiquement au démarrage du backend.
- Logs : `docker compose logs -f backend` · Arrêt : `docker compose down` (`-v` supprime aussi la base).

## 2. Préparer le serveur (VPS Ubuntu)

1. Installer Docker + le plugin compose.
2. `mkdir -p /opt/diary` puis y créer le `.env` (copie de `.env.example`) avec les valeurs de **production** :
   ```
   API_URL=https://api.tondomaine.mg
   FRONTEND_URL=https://app.tondomaine.mg
   SANCTUM_STATEFUL_DOMAINS=app.tondomaine.mg
   SESSION_DOMAIN=.tondomaine.mg
   SESSION_SECURE_COOKIE=true
   BACKEND_IMAGE=ghcr.io/<ton-user-minuscule>/diary-backend
   FRONTEND_IMAGE=ghcr.io/<ton-user-minuscule>/diary-frontend
   ```
3. Si les images GHCR sont privées : `docker login ghcr.io` une fois sur le serveur (PAT `read:packages`).
4. HTTPS : un reverse proxy devant les ports 8080 et 8000, par exemple Caddy (certificats automatiques) :
   ```
   app.tondomaine.mg { reverse_proxy localhost:8080 }
   api.tondomaine.mg { reverse_proxy localhost:8000 }
   ```
5. Créer une clé SSH dédiée au déploiement (`ssh-keygen -t ed25519`), ajouter la publique dans `~deploy/.ssh/authorized_keys`.

> **Règle cookies Sanctum** : le frontend et l'API doivent partager le même domaine racine
> (`app.` + `api.tondomaine.mg`) avec `SESSION_DOMAIN=.tondomaine.mg`, sinon la connexion ne « tient » pas.
> En local, `localhost:8080` et `localhost:8000` comptent comme un même site : ça marche tel quel.

## 3. GitHub Actions (`.github/workflows/ci-cd.yml`)

Déclenché à chaque push/PR : tests backend → build frontend → (sur `main`) build + push des images
dans GHCR → déploiement SSH.

| Où (Settings → …) | Nom | Valeur |
|---|---|---|
| Variables | `API_URL` | `https://api.tondomaine.mg` (figée dans le bundle frontend) |
| Variables | `DEPLOY_DIR` | `/opt/diary` |
| Secrets | `DEPLOY_HOST` | IP/nom du serveur |
| Secrets | `DEPLOY_USER` | `deploy` |
| Secrets | `DEPLOY_SSH_KEY` | clé **privée** SSH |

Créer aussi un environnement `production` (Settings → Environments), avec au besoin une approbation manuelle.

## 4. Jenkins (`Jenkinsfile`)

- Plugins : *Docker Pipeline*, *SSH Agent*. L'agent Jenkins doit pouvoir utiliser Docker.
- Credentials : `registry-creds` (user + token du registre), `deploy-ssh-key` (clé privée SSH).
- Adapter en haut du fichier : `IMAGE_NS`, `API_URL`, `DEPLOY_HOST`.
- Job « Pipeline from SCM » (ou Multibranch) pointant sur le dépôt ; les étapes push/deploy ne tournent que sur `main`.
- Choisis **un seul** des deux outils pour déployer (GitHub Actions *ou* Jenkins), sinon les deux se marcheront dessus.

## 5. Rollback

Chaque image est taguée avec le SHA du commit (GitHub) ou le n° de build (Jenkins) :
```bash
cd /opt/diary && IMAGE_TAG=<ancien-tag> docker compose up -d
```
(les migrations ne sont pas annulées automatiquement).

## Limites connues — à lire avant de compter dessus

- **Je n'ai pas pu lancer `docker build`** (pas de Docker dans mon environnement). Ce que j'ai vérifié :
  syntaxe YAML/sh, et `npm install && npm run build` du frontend (réussi). Les Dockerfiles, `composer install`
  et les migrations n'ont pas été exécutés : attends-toi à corriger un détail au premier build.
- **Tests backend** : 6+ fichiers de `backend/tests` utilisent `assertInertia` ou testent des pages HTML
  qui n'existent plus. Ils échoueront tant qu'ils ne sont pas réécrits pour l'API JSON ; c'est pourquoi l'étape
  de tests est *non bloquante* (GitHub : `continue-on-error`, Jenkins : stage `UNSTABLE`). À corriger puis à rendre bloquante.
- **`composer.lock`** : absent (supprimé lors de la séparation). Lance `composer install` une fois en local et
  **commite le `composer.lock` généré** pour avoir des builds reproductibles.
- **TypeScript** : `npm run build` (Vite) passe, mais `tsc --noEmit` signale ~70 erreurs de typage liées à la couche
  de compatibilité Inertia ; le type-check n'est donc pas dans la CI.
- File d'attente en `sync` (pas de worker) et pas de `route:cache` (closures dans `routes/api.php`).

## 6. Supervision (monitoring)

Une pile de supervision optionnelle est fournie dans `docker-compose.monitoring.yml` :

| Service | Rôle | Port |
|---|---|---|
| cAdvisor | Métriques par conteneur (CPU, RAM, réseau, disque) | 8081 |
| node-exporter | Métriques de la machine hôte | 9100 (interne) |
| Prometheus | Collecte et stocke les métriques ci-dessus | 9090 |
| Grafana | Visualise les métriques (tableaux de bord) | 3000 |

Lancer en plus de la stack applicative :
```bash
docker compose -f docker-compose.yml -f docker-compose.monitoring.yml up -d
```

Dans Grafana (http://localhost:3000, identifiants `admin` / valeur de `GRAFANA_ADMIN_PASSWORD`) :
1. Ajouter Prometheus comme source de données : URL `http://prometheus:9090`.
2. Importer un tableau de bord existant pour Docker/cAdvisor (ex. dashboard communautaire ID **193** ou **14282** sur grafana.com) pour visualiser CPU/RAM par conteneur sans repartir de zéro.

Prometheus interroge aussi directement `GET /up` du backend (route de santé native de Laravel) pour détecter une indisponibilité de l'API.

**Limite connue** : je n'ai pas pu lancer cette pile ici (pas de Docker dans mon environnement) — la configuration est syntaxiquement valide mais n'a pas été testée en conditions réelles.
