const test=require('node:test');
const assert=require('node:assert/strict');
const data=require('../src/content/portfolio.json');

test('project filtering combines actual category, technology and accent-insensitive search',async()=>{
  const {filterProjects,getCategories}=await import('../src/lib/studio.mjs');
  assert.equal(filterProjects(data.projects,{category:'research',technology:'MATLAB'})[0].slug,'pso-optimize');
  assert.equal(filterProjects(data.projects,{query:'medtutor'}).length,1);
  assert.equal(filterProjects(data.projects,{query:'truy xuat tai lieu'})[0].slug,'medtutor');
  assert.equal(filterProjects(data.projects,{category:'research',technology:'FastAPI'}).length,0);
  assert.deepEqual(new Set(getCategories(data.projects)),new Set(data.projects.map(p=>p.category)));
});

test('optional publishing fields stay well-formed',()=>{
  assert.ok(data.projects.every(project=>Array.isArray(project.technicalDecisions)));
  assert.ok(data.experiences.every(item=>item.type && item.evidence));
});
