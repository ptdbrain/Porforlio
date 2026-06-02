import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const requiredFiles = ['index.html', 'styles.css', 'script.js'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const fileName of requiredFiles) {
  await cp(path.join(root, fileName), path.join(dist, fileName));
}

const assetsDir = path.join(root, 'assets');
if (existsSync(assetsDir)) {
  await cp(assetsDir, path.join(dist, 'assets'), { recursive: true });
}

console.log(`Built static portfolio into ${path.relative(root, dist)}`);
