const test=require('node:test');const assert=require('node:assert/strict');
const data=require('../src/content/portfolio.json');const cinema=require('../src/content/cinema.json');
test('cinema worlds select real projects and explicit formats without fabricated stage upgrades',()=>{
 assert.deepEqual(cinema.featured.map(item=>item.format),['product-film','research-motion','interactive-experience']);
 for(const item of cinema.featured){const project=data.projects.find(p=>p.slug===item.slug);assert.ok(project);assert.ok(['prototype','research','in-progress'].includes(project.status));}
 for(const group of cinema.skillGroups)for(const slug of group.projects)assert.ok(data.projects.find(p=>p.slug===slug));
});
test('experiments and saved examples require real source data, dates are optional and never inferred',()=>{
 for(const experiment of cinema.experiments){assert.ok(data.projects.find(p=>p.slug===experiment.slug));assert.equal(typeof experiment.updatedAt,'string');for(const field of ['hypothesis','tried','learned','next'])assert.equal(typeof experiment[field].vi,'string');}
 for(const item of cinema.savedExamples)assert.ok(item.input&&item.output&&item.source);
});
