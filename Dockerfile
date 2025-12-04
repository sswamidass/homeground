FROM wordpress:php8.2-apache

# Install additional PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Set proper permissions for wp-content
RUN chown -R www-data:www-data /var/www/html/wp-content && \
    chmod -R 755 /var/www/html/wp-content

# Copy custom theme after WordPress is set up
COPY --chown=www-data:www-data wordpress/wp-content/themes/homeground /var/www/html/wp-content/themes/homeground

# Copy uploads if they exist
COPY --chown=www-data:www-data wordpress/wp-content/uploads /var/www/html/wp-content/uploads

# Expose port 80
EXPOSE 80

CMD ["apache2-foreground"]
