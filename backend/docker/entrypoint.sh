#!/bin/sh
set -e
cd /var/www/html

php artisan package:discover --ansi || true
php artisan storage:link 2>/dev/null || true

# Migrations automatiques au démarrage (désactivables : RUN_MIGRATIONS=false)
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  php artisan migrate --force
fi

# NB : pas de "route:cache" — routes/api.php contient des closures (non sérialisables)
php artisan config:cache

chown -R www-data:www-data storage bootstrap/cache
exec "$@"
