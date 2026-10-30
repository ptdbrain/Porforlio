const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const crypto=require('node:crypto');
const data=require('../src/content/portfolio.json');
const inventory=require('../docs/github-project-inventory.json');

test('the inventory accounts for every public repo and excludes teaching labs and empty starters',()=>{
 const publicRepos=inventory.repositories.filter(repo=>repo.disposition!=='included-local-checkout');
 assert.equal(publicRepos.length,inventory.publicRepositoryCount);
 assert.equal(new Set(publicRepos.map(repo=>repo.repo)).size,publicRepos.length);
 for(const repo of inventory.repositories){
  const project=data.projects.find(project=>project.repo===repo.repo);
  if(repo.disposition.startsWith('included')){
   assert.ok(project,repo.repo);
   assert.equal(project.slug,repo.slug);
   assert.equal(project.repositoryReview.commit,repo.commit);
   assert.ok(repo.filesReviewed.length);
  }else assert.equal(project,undefined,`${repo.repo} must stay out of the project library`);
 }
 assert.equal(data.projects.length,inventory.projectsInPortfolio);
});

test('every case has bilingual explanations and evidence without inventing a repository for CV-only work',()=>{
 for(const project of data.projects){
  for(const field of ['description','problem','implementation','result','constraints'])for(const lang of ['vi','en'])assert.ok(project[field][lang].length>30,`${project.slug}.${field}.${lang}`);
  assert.ok(project.sources.length);
  for(const source of project.sources){assert.ok(source.label);assert.match(source.href,/^(https:\/\/|\/CV_PhanTrongDat\.pdf$)/);}
  assert.ok(project.repositoryReview.attribution.vi&&project.repositoryReview.attribution.en);
 }
 const arm=data.projects.find(project=>project.slug==='assistive-robotic-arm');
 assert.equal(arm.repo,'');assert.equal(arm.links.github,'');assert.equal(arm.source,data.identity.cv);
 const prism=data.projects.find(project=>project.slug==='prism');
 assert.equal(prism.repositoryReview.access,'local-checkout');
 assert.equal(Object.keys(prism.repositoryReview.fileHashes).length,prism.repositoryReview.filesRead.length);
});

test('CV download matches the provided document and priority projects have CV-backed contributions',async()=>{
 const digest=path=>crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
 assert.equal(digest('public/CV_PhanTrongDat.pdf'),data.verification.cvSha256);
 for(const slug of ['dpotm','advertest','medtutor','prism','brandflow','parking-ai']){
  const project=data.projects.find(project=>project.slug===slug);
  assert.ok(project.personalContribution.vi.length>100&&project.personalContribution.en.length>100);
  assert.ok(project.sources.some(source=>source.href===data.identity.cv));
 }
 const {filterProjects}=await import('../src/lib/studio.mjs');
 assert.equal(filterProjects(data.projects,{query:'medbot'})[0].slug,'medtutor');
 assert.equal(filterProjects(data.projects,{query:'BrainFlow'})[0].slug,'brandflow');
 assert.equal(filterProjects(data.projects,{query:'DPOTM'})[0].slug,'dpotm');
});
