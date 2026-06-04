const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function readJson(fileName) {
  return JSON.parse(fs.readFileSync(path.join(root, fileName), 'utf8'));
}

test('vercel config deploys the generated dist directory', () => {
  const config = readJson('vercel.json');

  assert.equal(config.outputDirectory, 'dist');
  assert.equal(config.buildCommand, 'npm run build');
  assert.equal(config.cleanUrls, true);
});

test('package scripts expose local verification and Vercel build commands', () => {
  const pkg = readJson('package.json');

  assert.equal(pkg.scripts.build, 'vite build');
  assert.equal(pkg.scripts.test, 'node --test tests/*.test.js');
  assert.equal(pkg.scripts.dev, 'vite --host 127.0.0.1');
  assert.equal(pkg.dependencies.react, '^18.3.1');
  assert.equal(pkg.dependencies.vite, '^6.0.0');
});

test('vite build writes the deployable static files', () => {
  execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'pipe', shell: true });

  assert.equal(fs.existsSync(path.join(root, 'dist', 'index.html')), true, 'index.html should exist in dist');

  const html = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf8');
  assert.equal(html.includes('/assets/'), true);
});
