#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import playwright from 'playwright';
import { fileURLToPath as fURL } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..', '..');
const OUT_DIR = path.join(ROOT, 'migrate', 'html');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const DEV_URL = process.env.DEV_URL || 'http://localhost:5173';

// Basic CLI args parsing
const argv = process.argv.slice(2);
const opts = {
  dryRun: false,
  only: null,
  verbose: false,
};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--dry-run' || a === '-d') opts.dryRun = true;
  if (a === '--verbose' || a === '-v') opts.verbose = true;
  if (a === '--only' || a === '-o') { opts.only = argv[i+1]; i++; }
}

const ROUTES = [
  { path: '/', title: 'Home', template: 'front-page.php', slug: 'home' },
  { path: '/about', title: 'About', template: 'page-about.php', slug: 'about' },
  { path: '/monthly-box', title: 'Monthly Box', template: 'page-monthly-box.php', slug: 'monthly-box' },
  { path: '/books', title: 'Books', template: 'page-books.php', slug: 'books' },
  { path: '/coffee', title: 'Coffee', template: 'page-coffee.php', slug: 'coffee' },
  { path: '/subscription', title: 'Subscription', template: 'page-subscription.php', slug: 'subscription' },
  { path: '/faq', title: 'FAQ', template: 'page-faq.php', slug: 'faq' },
  { path: '/contact', title: 'Contact', template: 'page-contact.php', slug: 'contact' },
];

async function renderRoute(route) {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = DEV_URL.replace(/\/$/, '') + route.path;
  log('info', 'Rendering', url);
  await page.goto(url, { waitUntil: 'networkidle' });
  // Try to capture the main content inside #root or body
  let content = '';
  try {
    content = await page.$eval('#root', (el) => el.innerHTML);
  } catch (e) {
    content = await page.content();
  }
  // Extract inline styles and linked stylesheets to find background images
  try {
    const css = await page.$$eval('link[rel="stylesheet"]', (links) => links.map(l => l.href));
    const inlineStyles = await page.$$eval('style', (s) => s.map(x => x.innerText));
    content += '\n<!-- EXTRACTED_CSS_LINKS -->\n' + JSON.stringify(css) + '\n<!-- INLINE_STYLES -->\n' + inlineStyles.join('\n');
  } catch (e) {
    log('debug', 'Failed to extract styles', e.message || e);
  }
  await browser.close();
  return content;
}

async function downloadImageToTheme(imgUrl) {
  try {
    const url = imgUrl.startsWith('/') ? (DEV_URL.replace(/\/$/, '') + imgUrl) : imgUrl;
    const parsed = new URL(url);
    const filename = path.basename(parsed.pathname);
    const destDir = path.join(ROOT, 'wordpress', 'wp-content', 'themes', 'homeground', 'assets');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const destPath = path.join(destDir, filename);
    // download
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    return { destPath, filename };
  } catch (err) {
    console.warn('Failed download', imgUrl, err.message || err);
    return null;
  }
}

function importMediaToWP(localPath) {
  try {
    const containerPath = `/var/www/html${localPath.split('/wordpress')[1]}`;
    const cmd = `docker compose exec wordpress bash -lc "wp media import ${escapeShell(containerPath)} --porcelain --allow-root"`;
    const id = execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim();
    const urlCmd = `docker compose exec wordpress bash -lc "wp post get ${id} --field=guid --allow-root"`;
    const mediaUrl = execSync(urlCmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim();
    return { id, mediaUrl };
  } catch (err) {
    console.warn('Failed import media', localPath, err.message || err);
    return null;
  }
}

function log(level, ...args) {
  if (opts.verbose || level !== 'debug') console[level](...args);
  try {
    const logsDir = path.join(ROOT, 'migrate', 'logs');
    if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
    const logFile = path.join(logsDir, 'migration.log');
    const entry = `[${new Date().toISOString()}] ${level.toUpperCase()} ${args.join(' ')}\n`;
    fs.appendFileSync(logFile, entry);
  } catch (e) {
    // ignore
  }
}

function runCmd(cmd) {
  if (opts.dryRun) {
    log('info', '[dry-run] would run:', cmd);
    return '';
  }
  log('debug', 'running command:', cmd);
  return execSync(cmd, { cwd: ROOT, stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim();
}

function saveHtml(slug, html) {
  const file = path.join(OUT_DIR, `${slug}.html`);
  fs.writeFileSync(file, html, 'utf8');
  return file;
}

function importToWP(filePath, title, template) {
  console.log('Importing', filePath, 'as', title);
  const createCmd = `docker compose exec wordpress bash -lc "wp post create ${escapeShell(filePath)} --post_type=page --post_title=${escapeShell(title)} --post_status=publish --porcelain --allow-root"`;
  const id = runCmd(createCmd);
  log('info', 'Created page with ID', id || '[dry-run id]');
  if (template) {
    const metaCmd = `docker compose exec wordpress bash -lc "wp post meta update ${id} _wp_page_template ${escapeShell(template)} --allow-root"`;
    runCmd(metaCmd);
    log('info', 'Assigned template', template);
  }
}

function escapeShell(s) {
  // very simple escape for single-quoted shell arg
  if (!s) return "''";
  return `'${s.replace(/'/g, "'\\''")}'`;
}

(async function main(){
  console.log('DEV_URL =', DEV_URL);
  for (const route of ROUTES) {
    try {
      let html = await renderRoute(route);
      // find image srcs and srcset
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
      const srcsetRegex = /<img[^>]+srcset=["']([^"']+)["'][^>]*>/g;
      const urlInCssRegex = /url\(([^)]+)\)/g;
      const found = new Set();
      let m;
      while ((m = imgRegex.exec(html)) !== null) found.add(m[1]);
      while ((m = srcsetRegex.exec(html)) !== null) {
        const parts = m[1].split(',').map(p => p.trim().split(' ')[0]);
        parts.forEach(p => p && found.add(p));
      }
      // find urls in extracted CSS links and inline styles
      const cssBlockMatch = html.match(/<!-- EXTRACTED_CSS_LINKS -->\n(.*?)\n<!-- INLINE_STYLES -->\n(.*)/s);
      if (cssBlockMatch) {
        try {
          const cssLinks = JSON.parse(cssBlockMatch[1]);
          const inlineStyles = cssBlockMatch[2] || '';
          // fetch linked CSS and search for url(...) patterns
          for (const linkHref of cssLinks) {
            try {
              const cssRes = await (await import('node-fetch')).default(linkHref);
              if (cssRes.ok) {
                const cssText = await cssRes.text();
                let mm;
                while ((mm = urlInCssRegex.exec(cssText)) !== null) {
                  const raw = mm[1].replace(/['\"]/g, '').trim();
                  if (raw) found.add(raw);
                }
              }
            } catch (e) {
              log('debug', 'Failed fetch CSS', linkHref, e.message || e);
            }
          }
          // search inline styles
          let mm;
          while ((mm = urlInCssRegex.exec(inlineStyles)) !== null) {
            const raw = mm[1].replace(/['\"]/g, '').trim();
            if (raw) found.add(raw);
          }
        } catch (e) {
          log('debug', 'CSS parse error', e.message || e);
        }
      }
      for (const src of Array.from(found)) {
        if (src.startsWith('data:')) continue; // skip data URIs
        const downloaded = await downloadImageToTheme(src);
        if (!downloaded) continue;
        const imported = importMediaToWP(downloaded.destPath);
        if (imported && imported.mediaUrl) {
          // replace all occurrences of src with mediaUrl
          html = html.split(src).join(imported.mediaUrl);
        }
      }
      const file = saveHtml(route.slug, html);
      importToWP(file, route.title, route.template);
    } catch (err) {
      console.error('Failed for route', route.path, err);
    }
  }
  console.log('Migration complete. Review pages in WP Admin.');
})();
