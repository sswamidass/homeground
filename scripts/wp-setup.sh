#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

DOCKER_COMPOSE_EXEC="docker compose exec wordpress bash -lc"

echo "Checking for wp-cli inside container..."
if ! docker compose exec wordpress which wp >/dev/null 2>&1; then
  echo "wp-cli not found in container — attempting to install wp-cli.phar inside container..."
  docker compose exec wordpress bash -lc "curl -sS https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o /usr/local/bin/wp && chmod +x /usr/local/bin/wp || true"
fi

echo "Activating theme 'homeground'..."
${DOCKER_COMPOSE_EXEC} "wp theme activate homeground --allow-root" || echo "Theme activation failed (theme may not yet be present or WP not ready)."

echo "Installing recommended plugins (WPGraphQL)..."
${DOCKER_COMPOSE_EXEC} "wp plugin install wp-graphql --activate --allow-root" || echo "Plugin install may have failed or already installed."

echo "Creating primary menu and assigning location..."
${DOCKER_COMPOSE_EXEC} "wp menu create 'Primary' --allow-root" || true
${DOCKER_COMPOSE_EXEC} "wp menu location assign primary 'Primary' --allow-root" || true

echo "Creating pages and assigning templates..."
create_page() {
  local title="$1"
  local slug="$2"
  local template_meta="$3"
  local post_id
  post_id=$(${DOCKER_COMPOSE_EXEC} "wp post create --post_type=page --post_title='${title}' --post_status=publish --porcelain --allow-root") || post_id=""
  if [ -n "${post_id}" ]; then
    echo "Created page ${title} (ID: ${post_id})"
    if [ -n "${template_meta}" ]; then
      ${DOCKER_COMPOSE_EXEC} "wp post meta update ${post_id} _wp_page_template ${template_meta} --allow-root"
    fi
  fi
}

create_page "About" "about" "page-about.php"
create_page "Books" "books" "page-books.php"
create_page "Monthly Box" "monthly-box" "page-monthly-box.php"
create_page "Coffee" "coffee" "page-coffee.php"
create_page "Subscription" "subscription" "page-subscription.php"
create_page "FAQ" "faq" "page-faq.php"
create_page "Contact" "contact" "page-contact.php"

echo "Creating sample Book entries..."
${DOCKER_COMPOSE_EXEC} "wp post create --post_type=book --post_title='Sample Book 1' --post_status=publish --post_content='Excerpt for sample book 1.' --allow-root" || true
${DOCKER_COMPOSE_EXEC} "wp post create --post_type=book --post_title='Sample Book 2' --post_status=publish --post_content='Excerpt for sample book 2.' --allow-root" || true

echo "WP setup completed (or attempted). If any commands failed, run the commands manually via WP Admin or check container logs."

exit 0
