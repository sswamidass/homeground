FROM wordpress:php8.2-apache

# Install additional PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copy PHP config for larger uploads
COPY uploads.ini /usr/local/etc/php/conf.d/uploads.ini

# Force HTTPS in WordPress
RUN echo "<?php" > /var/www/html/wp-content/mu-plugins/force-https.php && \
    echo "// Force HTTPS URLs" >> /var/www/html/wp-content/mu-plugins/force-https.php && \
    echo "if (isset(\$_SERVER['HTTP_X_FORWARDED_PROTO']) && \$_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {" >> /var/www/html/wp-content/mu-plugins/force-https.php && \
    echo "    \$_SERVER['HTTPS'] = 'on';" >> /var/www/html/wp-content/mu-plugins/force-https.php && \
    echo "}" >> /var/www/html/wp-content/mu-plugins/force-https.php

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
