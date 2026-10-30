const test=require('node:test');const assert=require('node:assert/strict');
const sections=require('../src/content/workSections.json');const portfolio=require('../src/content/portfolio.json');
test('process examples reference real projects and existing bilingual source fields',()=>{
 assert.equal(sections.process.steps.length,4);
 assert.deepEqual(sections.process.steps.map(step=>step.id),['explore','experiment','build','improve']);
 for(const step of sections.process.steps){const project=portfolio.projects.find(item=>item.slug===step.example.slug);assert.ok(project);assert.ok(project[step.example.field].vi);assert.ok(project[step.example.field].en);assert.ok(project.source.startsWith('https://github.com/ptdbrain/'));}
});
