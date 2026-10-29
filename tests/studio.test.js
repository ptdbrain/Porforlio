const test=require('node:test');
const assert=require('node:assert/strict');
const data=require('../src/content/portfolio.json');
const studio=require('../src/content/studio.json');

test('studio capabilities reference actual projects and the three featured formats are distinct',async()=>{
  const {capabilityProjects}=await import('../src/lib/studio.mjs');
  for(const item of studio.capabilities)assert.equal(capabilityProjects(item,data.projects).length,item.projects.length);
  assert.deepEqual(studio.featured.map(item=>item.format),['flagship','blueprint','reel']);
  for(const item of studio.featured)assert.ok(data.projects.find(p=>p.slug===item.slug));
  for(const group of studio.labGroups)for(const item of group.items)assert.ok(data.projects.find(p=>p.slug===item.slug));
});

test('project filtering combines actual category, technology and accent-insensitive search',async()=>{
  const {filterProjects,getCategories}=await import('../src/lib/studio.mjs');
  assert.equal(filterProjects(data.projects,{category:'research',technology:'MATLAB'})[0].slug,'pso-optimize');
  assert.equal(filterProjects(data.projects,{query:'medtutor'}).length,1);
  assert.equal(filterProjects(data.projects,{query:'truy xuat tai lieu'})[0].slug,'medtutor');
  assert.equal(filterProjects(data.projects,{category:'research',technology:'FastAPI'}).length,0);
  assert.deepEqual(new Set(getCategories(data.projects)),new Set(data.projects.map(p=>p.category)));
});

test('optional publishing fields accept missing data and configured screenshots require alt text',()=>{
  assert.equal(typeof studio.availabilityUpdatedAt,'string');
  assert.ok(studio.demoFrames.every(frame=>typeof frame.image.src==='string'));
  for(const frame of studio.demoFrames)if(frame.image.src)assert.ok(frame.image.alt.vi&&frame.image.alt.en);
  assert.ok(data.projects.every(project=>Array.isArray(project.technicalDecisions)));
  assert.ok(data.experiences.every(item=>item.type && item.evidence));
});
