#!/bin/bash
set -e

# Copy theme files to the correct location if they don't exist or force update
echo "Ensuring Homeground theme is present..."
cp -r /tmp/homeground-theme/* /var/www/html/wp-content/themes/homeground/ 2>/dev/null || true

# Set proper permissions
chown -R www-data:www-data /var/www/html/wp-content/themes/homeground
chmod -R 755 /var/www/html/wp-content/themes/homeground

# Execute the original WordPress entrypoint
exec docker-entrypoint.sh apache2-foreground
