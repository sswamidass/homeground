FROM wordpress:php8.2-apache

# Install additional PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy PHP config for larger uploads
COPY uploads.ini /usr/local/etc/php/conf.d/uploads.ini

# Copy theme to temp location
COPY wordpress/wp-content/themes/homeground /tmp/homeground-theme

# Create mu-plugins directory and copy installer plugin
RUN mkdir -p /var/www/html/wp-content/mu-plugins
COPY wordpress/wp-content/mu-plugins/install-homeground-theme.php /var/www/html/wp-content/mu-plugins/

# Set permissions
RUN chown -R www-data:www-data /var/www/html/wp-content/mu-plugins && \
    chmod -R 755 /var/www/html/wp-content/mu-plugins

# Expose port 80
EXPOSE 80
