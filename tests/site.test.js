const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'portfolioData.json'), 'utf8'));
const { portfolioContent, projects } = data;

function getProjectsByCategory(category) {
  if (category === 'all') return projects;
  return projects.filter((project) => project.categories.includes(category));
}

function getVisibleContactLinks(config = data.contactConfig) {
  return config.filter((item) => item.featured || Boolean(item.href));
}

test('uses approved bilingual hero names', () => {
  assert.equal(portfolioContent.vi.hero.name, 'Phan Trọng Đạt');
  assert.equal(portfolioContent.en.hero.name, 'Dat Brain');
});

test('provides matching top-level sections for both languages', () => {
  assert.deepEqual(Object.keys(portfolioContent.en), Object.keys(portfolioContent.vi));
});

test('filters projects by category and keeps all projects available', () => {
  const allProjects = getProjectsByCategory('all');
  const cvProjects = getProjectsByCategory('computer-vision');

  assert.equal(allProjects.length, 6);
  assert.ok(cvProjects.length >= 3);
  assert.ok(cvProjects.every((project) => project.categories.includes('computer-vision')));
});

test('projects expose future demo, source and media slots', () => {
  assert.ok(projects.every((project) => typeof project.links.demo === 'string'));
  assert.ok(projects.every((project) => typeof project.links.github === 'string'));
  assert.ok(projects.every((project) => typeof project.media.image === 'string'));
  assert.ok(projects.every((project) => typeof project.media.alt === 'string'));
  assert.ok(projects.every((project) => Array.isArray(project.media.gallery)));
});

test('shows featured contact fields and configured social links', () => {
  const links = getVisibleContactLinks([
    { id: 'email', featured: true, href: '' },
    { id: 'github', featured: true, href: 'https://github.com/ptdbrain' },
    { id: 'linkedin', featured: false, href: 'https://linkedin.com/in/datbrain' },
    { id: 'facebook', featured: false, href: '' },
  ]);

  assert.deepEqual(links.map((link) => link.id), ['email', 'github', 'linkedin']);
});

test('contact directory includes core details and relevant professional networks', () => {
  const ids = data.contactConfig.map((item) => item.id);

  assert.deepEqual(ids.slice(0, 4), ['email', 'phone', 'location', 'github']);
  assert.ok(ids.includes('linkedin'));
  assert.ok(ids.includes('huggingface'));
  assert.ok(ids.includes('kaggle'));
});

test('primary contact details are directly actionable', () => {
  const email = data.contactConfig.find((item) => item.id === 'email');
  const phone = data.contactConfig.find((item) => item.id === 'phone');

  assert.equal(email.value, 'phandat20052009@gmail.com');
  assert.equal(email.href, 'mailto:phandat20052009@gmail.com');
  assert.equal(phone.value, '0382 977 551');
  assert.equal(phone.href, 'tel:+84382977551');
});

test('portfolio uses intersection observer scroll reveals', () => {
  const component = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'components', 'PortfolioHome.jsx'),
    'utf8',
  );

  assert.match(component, /IntersectionObserver/);
  assert.match(component, /data-reveal/);
  assert.match(component, /prefers-reduced-motion/);
  assert.match(component, /classList\.toggle\('is-revealed', entry\.isIntersecting\)/);
  assert.doesNotMatch(component, /observer\.unobserve/);
});

test('project cards open an accessible animated detail viewer', () => {
  const component = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'components', 'PortfolioHome.jsx'),
    'utf8',
  );

  assert.match(component, /aria-haspopup="dialog"/);
  assert.match(component, /role="dialog"/);
  assert.match(component, /createPortal/);
  assert.match(component, /document\.body/);
  assert.match(component, /event\.key === 'Escape'/);
  assert.match(component, /project\.links\.demo/);
  assert.match(component, /project\.links\.github/);
  assert.match(component, /activeMediaIndex/);
  assert.match(component, /project-thumbnails/);
  assert.match(component, /project-result-list/);
});

test('project viewer remains fixed to the viewport', () => {
  const styles = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

  assert.match(styles, /\.portfolio-app\.is-visible\s*\{[^}]*transform:\s*none/s);
  assert.match(styles, /\.project-detail-layer\s*\{[^}]*position:\s*fixed/s);
  assert.match(styles, /\.project-detail-layer\s*\{[^}]*height:\s*100dvh/s);
});

test('about section includes education stages with empty image slots', () => {
  const stages = portfolioContent.vi.about.educationStages;

  assert.equal(stages.length, 3);
  assert.deepEqual(stages.map((stage) => stage.id), ['high-school', 'university', 'major']);
  assert.ok(stages.every((stage) => stage.image.src === ''));
  assert.ok(stages.every((stage) => stage.image.alt === ''));
});

test('about section includes bilingual hobbies', () => {
  assert.ok(portfolioContent.vi.about.hobbies.length >= 4);
  assert.equal(portfolioContent.en.about.hobbies.length, portfolioContent.vi.about.hobbies.length);
});
