FROM wordpress:php8.2-apache

# Install additional PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy custom theme and uploads
COPY wordpress/wp-content/themes/homeground /var/www/html/wp-content/themes/homeground
COPY wordpress/wp-content/uploads /var/www/html/wp-content/uploads

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html/wp-content && \
    chmod -R 755 /var/www/html/wp-content

# Expose port 80
EXPOSE 80

CMD ["apache2-foreground"]
