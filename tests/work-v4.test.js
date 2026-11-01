const test=require('node:test');
const assert=require('node:assert/strict');
const data=require('../src/content/portfolio.json');

test('Work filters combine capability, technology and repository aliases',async()=>{
 const {workProjects,initialWorkView}=await import('../src/lib/workV4.mjs');
 assert.deepEqual(workProjects(data.projects,{...initialWorkView,filter:'research',technology:'MATLAB'}).map(p=>p.slug),['pso-optimize']);
 assert.deepEqual(workProjects(data.projects,{...initialWorkView,filter:'rag',query:'medbot'}).map(p=>p.slug),['medtutor']);
 assert.equal(workProjects(data.projects,{...initialWorkView,filter:'vision',query:'medbot'}).length,0);
 assert.deepEqual(workProjects(data.projects,initialWorkView).slice(0,6).map(p=>p.slug),['dpotm','advertest','medtutor','prism','parking-ai','labguard']);
 assert.equal(workProjects(data.projects,initialWorkView).length,data.projects.length);
});

test('saved library state rejects malformed fields while retaining valid selections',async()=>{
 const {normalizeWorkView,initialWorkView}=await import('../src/lib/workV4.mjs');
 assert.deepEqual(normalizeWorkView({filter:'missing',capability:null,query:[],technology:'missing',expanded:'true'},data.projects),initialWorkView);
 assert.deepEqual(normalizeWorkView({filter:'vision',capability:'research',query:'YOLO',technology:'Python',expanded:true},data.projects),{filter:'vision',capability:'research',query:'YOLO',technology:'Python',expanded:true});
 assert.equal(normalizeWorkView({query:'a'.repeat(500)},data.projects).query.length,250);
});
