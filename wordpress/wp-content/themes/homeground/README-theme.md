# Homeground WordPress Theme

This is a minimal WordPress theme scaffold included to help migrate the existing React pages into a PHP theme when running WordPress locally.

Files added:
- `style.css` — theme header + base styles
- `functions.php` — enqueues stylesheet and enables basic theme support
- `header.php`, `footer.php`, `index.php` — minimal templates

How to use

1. Ensure the Docker Compose stack is running (see `docker-compose.yml`).
2. Visit `http://localhost:8000/wp-admin` and activate the `Homeground` theme under Appearance → Themes.
3. Copy assets from `src/assets` to `wordpress/wp-content/uploads` or into the theme folder as needed.

Next steps

- Add template files for pages like `page-about.php`, `page-books.php`, etc., and copy the content from the React pages.
- Register menus and widget areas in `functions.php`.
- Implement custom post types for `Books` and `Subscription`.
- If you prefer headless, keep the React app and consume the REST API or GraphQL from `http://localhost:8000/wp-json`.
