# Local WordPress (headless) setup

This repository includes a Docker Compose configuration to run a local WordPress instance that can act as a headless CMS for the existing React/Vite front-end. It also includes a minimal WordPress theme scaffold and example templates to help migrate or consume content from WordPress.

Quick start

1. Start the stack:

```bash
cd /path/to/homeground
docker compose up -d
```

2. Open WordPress admin (first-run will show setup):
- Site: http://localhost:8000
- Admin: http://localhost:8000/wp-admin

3. Open phpMyAdmin if you need DB access: http://localhost:8081 (user: `root`, password: `root_pass`)

Recommended plugins

- WPGraphQL (if you prefer GraphQL) — install via plugin admin or composer
- WP REST API is available by default at `http://localhost:8000/wp-json`

Connecting from the React app

This repo includes a small example component that fetches posts from the WP REST API. By default it will use `VITE_WP_API_URL` configured in your Vite environment; the fallback is `http://localhost:8000`.

To run the React app locally:

```bash
# in a separate terminal from docker
npm install
npm run dev
```

Environment variable (optional)

Create a `.env` file in the project root or set env vars for Vite:

```
VITE_WP_API_URL=http://localhost:8000
```

Notes and next steps

- After WordPress is running, install `WPGraphQL` if you prefer GraphQL and `WPGraphQL JWT Auth` for authenticated requests.
- You can keep this React front-end and progressively replace pages with content coming from WP (headless). For previews and editor experience, consider adding a preview endpoint to the React app.
- To persist WP uploads and themes, use the `./wordpress` folder created by the compose setup.

Automation scripts

- `scripts/start-stack.sh` — will run `docker compose up -d`, wait for WordPress to be available, run `scripts/wp-setup.sh` and then `npm run sync:assets`.
- `scripts/wp-setup.sh` — uses `wp-cli` (installed into the container if missing) to activate the theme, install `WPGraphQL`, create a `Primary` menu, create pages and assign templates, and create two sample `book` entries.

Run everything with one command (after installing Docker Desktop):

```bash
cd /Users/223024491/Downloads/homeground
npm run start:wp
```

If the bundled automation fails for any step, the scripts print helpful output and you can run the failing commands manually from the WP admin or by re-running the `wp` commands inside the `wordpress` container.

Added repo features

- `wordpress/wp-content/themes/homeground` — minimal theme scaffold with template files and CPT registration.
- `scripts/sync-assets.js` — Node script to copy `src/assets` into the theme (run `npm run sync:assets`).
- `src/wp/WPExample.tsx` — React example that fetches posts from the WP REST API and is accessible at `/wp-posts` in the React app.

Troubleshooting

- If `docker` is not installed, install Docker Desktop for macOS and re-run the compose command.
- If the compose command fails, check `docker compose logs` for container errors.

