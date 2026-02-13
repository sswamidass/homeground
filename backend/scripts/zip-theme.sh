#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
THEME_DIR="$ROOT_DIR/wordpress/wp-content/themes/homeground"
OUT_DIR="$ROOT_DIR/dist"
OUT_FILE="$OUT_DIR/homeground-theme.zip"

if [ ! -d "$THEME_DIR" ]; then
  echo "Theme directory not found: $THEME_DIR" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"
cd "$THEME_DIR"
echo "Creating theme zip: $OUT_FILE"
zip -r "$OUT_FILE" . -x "node_modules/*" 
echo "Theme zip created: $OUT_FILE"

exit 0
