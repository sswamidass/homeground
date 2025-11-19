#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not found. Please install Docker Desktop for macOS and retry."
  exit 1
fi

echo "Starting Docker Compose stack..."
docker compose up -d

echo "Waiting for WordPress to be ready at http://localhost:8000/wp-json ..."
for i in {1..60}; do
  if curl -sSf http://localhost:8000/wp-json >/dev/null 2>&1; then
    echo "WordPress is ready."
    break
  fi
  echo -n "."
  sleep 2
done

if ! curl -sSf http://localhost:8000/wp-json >/dev/null 2>&1; then
  echo "Timed out waiting for WordPress to become available." >&2
  docker compose logs --tail=50 wordpress
  exit 2
fi

echo "Running WP setup (install plugins, create pages, menus, sample content)..."
bash "$ROOT_DIR/scripts/wp-setup.sh"

echo "Syncing assets into theme..."
npm run sync:assets

echo "All automation steps complete."
echo "- WordPress: http://localhost:8000"
echo "- WP Admin: http://localhost:8000/wp-admin"
echo "- phpMyAdmin: http://localhost:8081"
echo "- React example (dev server required): http://localhost:5173/wp-posts"

exit 0
