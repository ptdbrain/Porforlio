const test = require('node:test');
const assert = require('node:assert/strict');
const data = require('../src/content/portfolio.json');


test('public case studies have unique routes and traceable first-party sources', async () => {
  const { resolveRoute } = await import('../src/lib/routes.mjs');
  const slugs = data.projects.map(p => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(data.projects.filter(p => p.featured).length, 3);
  for (const project of data.projects) {
    const route = resolveRoute(`/projects/${project.slug}`, data.projects);
    assert.equal(route.project.title, project.title);
    assert.ok(project.sources.length>0);
    if(project.repo)assert.equal(project.links.github, `https://github.com/ptdbrain/${project.repo}`);
    else assert.equal(project.source,data.identity.cv);
    assert.ok(project.pipeline.length >= 3);
    for (const key of ['description','problem','implementation','result','constraints']) {
      assert.ok(project[key].vi && project[key].en, `${project.slug}.${key} must support both languages`);
    }
  }
});

test('optional biography, education and evidence fields support missing content without sample claims', () => {
  assert.equal(typeof data.identity.personalBio.vi, 'string');
  assert.equal(typeof data.identity.cv, 'string');
  assert.deepEqual(data.education.map(p => p.id), ['secondary','high-school','university','present']);
  for (const chapter of data.education) {
    assert.equal(typeof chapter.school.vi, 'string');
    assert.equal(typeof chapter.period, 'string');
    assert.equal(typeof chapter.story.vi, 'string');
    assert.equal(typeof chapter.image.src, 'string');
  }
  assert.ok(Array.isArray(data.experiences));
  assert.ok(Array.isArray(data.achievements));
  for (const project of data.projects) {
    assert.ok(Array.isArray(project.metrics));
    assert.equal(typeof project.personalContribution.vi, 'string');
    for (const metric of project.metrics) assert.ok(metric.context?.vi && project.links.report, 'Measurements need context and a linked report');
  }
});

test('training reflects the user-confirmed completion without fabricated credential details', () => {
  assert.equal(data.training.status.vi, 'Đã hoàn thành');
  assert.equal(data.training.status.en, 'Completed');
  assert.equal(data.training.source, 'https://vinuni.edu.vn/aithucchien/');
  for (const key of ['date','credentialId','evidence']) assert.equal(typeof data.training[key], 'string');
});

test('public profile links match the user-provided accounts', () => {
  assert.equal(data.identity.github, 'https://github.com/ptdbrain');
  assert.equal(data.identity.linkedin, 'https://www.linkedin.com/in/phantrongdat-ptdbrain/');
  assert.equal(data.verification.linkedinReadable, false);
  assert.match(data.projects.find(p => p.slug === 'labguard').role.en, /Product Owner/);
  assert.match(data.projects.find(p => p.slug === 'pathfinder').role.en, /Team member/);
});

test('route resolver handles direct URLs, trailing slashes and malformed or unknown paths', async () => {
  const { resolveRoute } = await import('../src/lib/routes.mjs');
  for (const [url,kind] of [['/','home'],['/personal/','personal'],['/work','work'],['/contact','contact'],['/projects/no-such-project','not-found'],['/%E0%A4%A','not-found']]) {
    assert.equal(resolveRoute(url,data.projects).kind,kind);
  }
});

test('case-study metadata describes the specific project in either language', async () => {
  const { resolveRoute, routeMetadata } = await import('../src/lib/routes.mjs');
  const route = resolveRoute('/projects/parking-ai',data.projects);
  const vi = routeMetadata(route,data,'vi');
  const en = routeMetadata(route,data,'en');
  assert.match(vi.title,/ParkingAI/);
  assert.equal(vi.type,'article');
  assert.notEqual(vi.description,en.description);
  assert.equal(vi.image,'');
});

test('configured media use accessible descriptions, never empty img URLs', () => {
  function walk(value) {
    if (!value || typeof value !== 'object') return;
    if (value.src) assert.ok(typeof value.alt === 'object' && value.alt.vi && value.alt.en);
    Object.values(value).forEach(walk);
  }
  walk(data);
  assert.ok(Object.values(data.assets).every(asset => typeof asset.src === 'string'));
  for (const project of data.projects) if(project.media.cover) assert.ok(project.media.alt.vi && project.media.alt.en);
});
