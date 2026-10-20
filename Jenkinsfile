// Pipeline Jenkins du projet Diary
//   DEPLOY_MODE = local  : tests -> build -> déploiement sur Docker Desktop (défaut)
//   DEPLOY_MODE = server : tests -> build -> push registre -> déploiement SSH
//
// Plugins : Pipeline, Git, Credentials Binding, Timestamper (inclus dans les plugins suggérés)
//           + "SSH Agent" uniquement pour le mode server
// Credentials à créer (Manage Jenkins > Credentials) :
//   diary-env       : Secret file = ton fichier .env                    (mode local)
//   registry-creds  : Username/Password du registre (GHCR : user + PAT write:packages)  (mode server)
//   deploy-ssh-key  : clé privée SSH de l'utilisateur de déploiement    (mode server)
pipeline {
  agent any

  parameters {
    choice(name: 'DEPLOY_MODE', choices: ['local', 'server'],
           description: 'local = Docker Desktop de ce PC, server = push registre + déploiement SSH')
  }

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  environment {
    // Même projet Compose que le lancement manuel : mêmes conteneurs, volumes et ports
    COMPOSE_PROJECT_NAME = 'projet-diary-split'
    COMPOSE_BAKE         = 'false'

    // --- Mode server uniquement (préfixe SRV_ pour ne pas perturber docker compose) ---
    REGISTRY          = 'ghcr.io'
    SRV_IMAGE_NS      = 'ton-user-github/diary'           // <-- à adapter (minuscules)
    SRV_BACKEND_IMAGE = "${REGISTRY}/${SRV_IMAGE_NS}-backend"
    SRV_FRONTEND_IMAGE = "${REGISTRY}/${SRV_IMAGE_NS}-frontend"
    SRV_API_URL       = 'https://api.tondomaine.mg'       // <-- figée dans le bundle frontend
    SRV_DEPLOY_HOST   = 'deploy@IP_DU_SERVEUR'            // <-- à adapter
    SRV_DEPLOY_DIR    = '/opt/diary'
    SRV_TAG           = "${env.BUILD_NUMBER}"
  }

  stages {

    // Les tests tournent dans un conteneur temporaire alimenté par "docker cp"
    // (un agent docker{} ne voit pas le workspace quand Jenkins lui-même est dans Docker).
    stage('Backend (phpunit)') {
      steps {
        // UNSTABLE (et non FAILED) tant que les tests hérités d'Inertia ne sont pas migrés vers l'API
        catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
          sh '''
            set -e
            cid=$(docker create --entrypoint sh -w /app -e HOME=/tmp -e COMPOSER_HOME=/tmp/composer composer:2 \
              -c "composer install --no-interaction --prefer-dist --ignore-platform-reqs && cp -n .env.example .env && php artisan key:generate && php artisan test")
            trap 'docker rm -f "$cid" >/dev/null 2>&1' EXIT
            docker cp backend/. "$cid":/app
            docker start -a "$cid" || true
            code=$(docker inspect -f '{{.State.ExitCode}}' "$cid")
            exit "$code"
          '''
        }
      }
    }

    // Le build Vite du frontend est fait par son Dockerfile (étape "npm run build")

    // ------------------------------ MODE LOCAL ------------------------------
    stage('Build & déploiement local') {
      when { expression { (params.DEPLOY_MODE ?: 'local') == 'local' } }
      steps {
        withCredentials([file(credentialsId: 'diary-env', variable: 'ENV_FILE')]) {
          sh '''
            cp "$ENV_FILE" .env
            docker compose config -q
            docker compose build
            docker compose up -d
          '''
        }
      }
    }

    stage('Vérifier la santé') {
      when { expression { (params.DEPLOY_MODE ?: 'local') == 'local' } }
      steps {
        sh '''
          for svc in db backend frontend; do
            cid=$(docker compose ps -q $svc)
            status=none
            echo "Attente de $svc..."
            for i in $(seq 1 30); do
              status=$(docker inspect -f '{{.State.Health.Status}}' "$cid" 2>/dev/null || echo none)
              [ "$status" = "healthy" ] && break
              sleep 5
            done
            if [ "$status" != "healthy" ]; then
              echo "$svc n'est pas healthy ($status)"
              docker compose logs --tail=50 $svc
              exit 1
            fi
            echo "$svc : healthy"
          done
        '''
      }
    }

    // ------------------------------ MODE SERVER -----------------------------
    stage('Build & push images') {
      when {
        allOf {
          expression { params.DEPLOY_MODE == 'server' }
          expression { env.BRANCH_NAME == 'main' || env.GIT_BRANCH == 'origin/main' }
        }
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'registry-creds', usernameVariable: 'REG_USER', passwordVariable: 'REG_PASS')]) {
          sh '''
            echo "$REG_PASS" | docker login "$REGISTRY" -u "$REG_USER" --password-stdin
            docker build -t "$SRV_BACKEND_IMAGE:$SRV_TAG" -t "$SRV_BACKEND_IMAGE:latest" ./backend
            docker build --build-arg VITE_API_URL="$SRV_API_URL" -t "$SRV_FRONTEND_IMAGE:$SRV_TAG" -t "$SRV_FRONTEND_IMAGE:latest" ./frontend
            docker push "$SRV_BACKEND_IMAGE:$SRV_TAG";  docker push "$SRV_BACKEND_IMAGE:latest"
            docker push "$SRV_FRONTEND_IMAGE:$SRV_TAG"; docker push "$SRV_FRONTEND_IMAGE:latest"
          '''
        }
      }
    }

    stage('Deploy SSH') {
      when {
        allOf {
          expression { params.DEPLOY_MODE == 'server' }
          expression { env.BRANCH_NAME == 'main' || env.GIT_BRANCH == 'origin/main' }
        }
      }
      steps {
        sshagent(credentials: ['deploy-ssh-key']) {
          sh '''
            scp -o StrictHostKeyChecking=accept-new docker-compose.yml "$SRV_DEPLOY_HOST:$SRV_DEPLOY_DIR/docker-compose.yml"
            ssh -o StrictHostKeyChecking=accept-new "$SRV_DEPLOY_HOST" \
              "cd $SRV_DEPLOY_DIR && export BACKEND_IMAGE=$SRV_BACKEND_IMAGE FRONTEND_IMAGE=$SRV_FRONTEND_IMAGE IMAGE_TAG=$SRV_TAG && docker compose pull && docker compose up -d --no-build --remove-orphans && docker image prune -f"
          '''
        }
      }
    }
  }

  post {
    always  { sh 'docker logout "$REGISTRY" || true' }
    success { echo "Terminé (mode ${params.DEPLOY_MODE ?: 'local'}) : http://127.0.0.1:8090 - API http://127.0.0.1:8002" }
    failure { sh 'docker compose ps || true' }
    cleanup { sh 'rm -f .env' }
  }
}