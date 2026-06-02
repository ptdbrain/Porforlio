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

  assert.equal(pkg.scripts.build, 'node scripts/build.mjs');
  assert.equal(pkg.scripts.test, 'node --test tests/*.test.js');
});

test('build script writes the deployable static files', () => {
  execFileSync('node', ['scripts/build.mjs'], { cwd: root, stdio: 'pipe' });

  const requiredFiles = ['index.html', 'styles.css', 'script.js'];
  for (const fileName of requiredFiles) {
    assert.equal(fs.existsSync(path.join(root, 'dist', fileName)), true, `${fileName} should exist in dist`);
  }

  const html = fs.readFileSync(path.join(root, 'dist', 'index.html'), 'utf8');
  assert.equal(html.includes('styles.css'), true);
  assert.equal(html.includes('script.js'), true);
});
