# Render-and-Import migration

This script renders the React dev site routes and imports them into the local WordPress instance using `wp-cli` inside the container.

Prerequisites

- React dev server running (Vite): `npm run dev` (default `http://localhost:5173`). You can change by setting `DEV_URL` env var.
- Docker Compose stack running with WordPress: `npm run start:wp` (the script uses `docker compose exec wordpress wp` to create pages).
- `playwright` must be installed. Run `npm install` to install dependencies.

Usage

```bash
# start React dev server in another terminal
npm run dev

# then from repo root
DEV_URL=http://localhost:5173 node ./scripts/migrate/render-and-import.mjs
```

Notes

- The script saves rendered HTML files to `migrate/html/<slug>.html`.
- It creates WP Pages and assigns templates defined in the script. It does not currently upload or replace image URLs — ensure `npm run sync:assets` copied your assets to the theme folder before running.
- You can extend `ROUTES` in the script to add/remove pages.

Image handling

- The render-and-import script will now detect `<img>` tags in rendered HTML, download those images into the theme `assets` folder, import them into WordPress via `wp media import`, and replace image `src` attributes with the WP media URL before importing the page content.

CSV importer for Books

- There is a CSV importer `scripts/migrate/import-books-csv.mjs` which reads `migrate/books.csv` and creates `book` CPT entries.
- CSV columns: `title`, `content`, `excerpt`, `image` (image may be a filename present in theme assets or an absolute URL).

Run the CSV importer:

```bash
node ./scripts/migrate/import-books-csv.mjs
```

