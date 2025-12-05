FROM wordpress:php8.2-apache

# Install additional PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install mysql client for database connection testing
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

# Copy PHP config for larger uploads
COPY uploads.ini /usr/local/etc/php/conf.d/uploads.ini

# Copy theme to temp location
COPY wordpress/wp-content/themes/homeground /tmp/homeground-theme

# Create mu-plugins directory and copy installer plugin
RUN mkdir -p /var/www/html/wp-content/mu-plugins
COPY wordpress/wp-content/mu-plugins/install-homeground-theme.php /var/www/html/wp-content/mu-plugins/
COPY wordpress/wp-content/mu-plugins/force-https.php /var/www/html/wp-content/mu-plugins/

# Copy custom entrypoint script
COPY docker-entrypoint-custom.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint-custom.sh

# Set permissions
RUN chown -R www-data:www-data /var/www/html/wp-content/mu-plugins && \
    chmod -R 755 /var/www/html/wp-content/mu-plugins

# Expose port 80
EXPOSE 80

# Use custom entrypoint
ENTRYPOINT ["docker-entrypoint-custom.sh"]
