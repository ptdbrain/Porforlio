const test = require('node:test');
const assert = require('node:assert/strict');

const {
  portfolioContent,
  getProjectsByCategory,
  getVisibleContactLinks,
} = require('../script.js');

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

test('hides contact links without configured values', () => {
  const links = getVisibleContactLinks({
    email: 'dat@example.com',
    github: '',
    linkedin: 'https://linkedin.com/in/datbrain',
    facebook: '',
    cv: '',
  });

  assert.deepEqual(links.map((link) => link.key), ['email', 'linkedin']);
});
