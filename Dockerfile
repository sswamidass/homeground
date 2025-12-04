FROM wordpress:php8.2-apache

# Install additional PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy custom theme to temp location first
COPY --chown=www-data:www-data wordpress/wp-content/themes/homeground /tmp/homeground-theme

# Copy custom entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/custom-entrypoint.sh
RUN chmod +x /usr/local/bin/custom-entrypoint.sh

# Expose port 80
EXPOSE 80

ENTRYPOINT ["/usr/local/bin/custom-entrypoint.sh"]
