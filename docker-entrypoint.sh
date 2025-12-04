#!/bin/bash
set -e

# Ensure the themes directory exists
mkdir -p /var/www/html/wp-content/themes/homeground

# Copy theme files to the correct location
echo "Copying Homeground theme files..."
cp -r /tmp/homeground-theme/. /var/www/html/wp-content/themes/homeground/

# Set proper permissions
chown -R www-data:www-data /var/www/html/wp-content/themes/homeground
chmod -R 755 /var/www/html/wp-content/themes/homeground

echo "Homeground theme installed successfully!"

# Execute the original WordPress entrypoint
exec docker-entrypoint.sh apache2-foreground
