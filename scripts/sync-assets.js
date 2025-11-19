import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.resolve(__dirname, '..', 'src', 'assets');
const dest = path.resolve(__dirname, '..', 'wordpress', 'wp-content', 'themes', 'homeground', 'assets');

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.warn('Source assets folder not found:', srcDir);
    return;
  }
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const items = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const item of items) {
    const srcPath = path.join(srcDir, item.name);
    const destPath = path.join(destDir, item.name);
    if (item.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log('Copied', srcPath, '->', destPath);
    }
  }
}

copyDir(src, dest);
console.log('Asset sync complete.');
