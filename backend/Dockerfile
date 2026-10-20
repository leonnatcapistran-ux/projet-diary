# API Laravel : PHP-FPM + Nginx dans une seule image (supervisord)
FROM php:8.4-fpm-alpine

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN apk add --no-cache nginx supervisor curl \
 && install-php-extensions pdo_mysql gd bcmath zip intl opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 1) dépendances d'abord (meilleur cache Docker)
COPY composer.json composer.lock* ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

# 2) code applicatif
COPY . .
RUN composer dump-autoload --optimize --no-dev --no-scripts \
 && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
 && chown -R www-data:www-data storage bootstrap/cache

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -fsS http://localhost:8000/up || exit 1

ENTRYPOINT ["entrypoint.sh"]
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
