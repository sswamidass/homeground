FROM wordpress:php8.2-apache

# Install additional PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Create themes directory and copy our theme
RUN mkdir -p /var/www/html/wp-content/themes/homeground
COPY wordpress/wp-content/themes/homeground /var/www/html/wp-content/themes/homeground

# Set ownership and permissions
RUN chown -R www-data:www-data /var/www/html/wp-content/themes/homeground && \
    chmod -R 755 /var/www/html/wp-content/themes/homeground

# Expose port 80
EXPOSE 80
