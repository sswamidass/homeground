#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse/lib/sync';
import { execSync } from 'child_process';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname, '..');
const CSV_PATH = path.join(process.cwd(), 'migrate', 'books.csv');

if (!fs.existsSync(CSV_PATH)) {
  console.error('CSV file not found at', CSV_PATH);
  process.exit(1);
}

const raw = fs.readFileSync(CSV_PATH, 'utf8');
const records = csvParse(raw, { columns: true, skip_empty_lines: true });

for (const row of records) {
  const title = row.title || 'Untitled';
  const content = row.content || '';
  const excerpt = row.excerpt || '';
  console.log('Creating book:', title);
  const createCmd = `docker compose exec wordpress bash -lc "wp post create --post_type=book --post_title=${escapeShell(title)} --post_content=${escapeShell(content)} --post_excerpt=${escapeShell(excerpt)} --post_status=publish --porcelain --allow-root"`;
  try {
    const id = execSync(createCmd, { stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim();
    console.log('Created book ID', id);
    if (row.image) {
      // attempt to import image from theme assets or URL
      let localPath = row.image;
      if (!localPath.startsWith('/')) {
        // assume image file is relative to theme assets
        localPath = path.join('/var/www/html/wp-content/themes/homeground/assets', path.basename(row.image));
      }
      const importCmd = `docker compose exec wordpress bash -lc "wp media import ${escapeShell(localPath)} --porcelain --allow-root"`;
      try {
        const attachId = execSync(importCmd, { stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim();
        console.log('Imported media id', attachId);
        const setThumb = `docker compose exec wordpress bash -lc "wp post meta update ${id} _thumbnail_id ${attachId} --allow-root"`;
        execSync(setThumb, { stdio: 'inherit' });
      } catch (e) {
        console.warn('Failed to import image for', title, e.message || e);
      }
    }
  } catch (e) {
    console.error('Failed creating book', title, e.message || e);
  }
}

function escapeShell(s) {
  if (!s) return "''";
  return `'${String(s).replace(/'/g, "'\\''")}'`;
}
