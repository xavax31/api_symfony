FROM php:8.1-rc-apache-buster
# FROM php:8.0.17-apache-buster
# COPY _srctest/ /var/www/html/

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN apt-get update \
    && apt-get install --yes --no-install-recommends unzip zip certbot python3-certbot-apache git libpng-dev libzip-dev libxml2-dev libcurl4-openssl-dev libonig-dev zlib1g-dev libjpeg-dev libfreetype6-dev wkhtmltopdf ffmpeg cron

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install zip calendar intl opcache pdo_mysql exif gd

RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && a2enmod rewrite ssl

# Install composer and dependencies
COPY composer.json /var/www/html
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && php -d memory_limit=-1 /usr/local/bin/composer update --no-scripts \
    && php -d memory_limit=-1 /usr/local/bin/composer install --no-scripts --optimize-autoloader \
    && php -d memory_limit=-1 /usr/local/bin/composer update --no-scripts

RUN echo 'alias pbc="php bin/console"' >> ~/.bashrc

# COPY .env /var/www/html
# COPY .env.local /var/www/html
# COPY .env.test /var/www/html
# RUN composer dump-env dev

# COPY ./docker/apache/cron /etc/cron.d/cron

# RUN chmod 0644 /etc/cron.d/cron

# RUN crontab /etc/cron.d/cron

# RUN mkdir -p /var/log/cron

# RUN sed -i 's/^exec /service cron start\n\nexec /' /usr/local/bin/apache2-foreground

EXPOSE 80
