const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
const data=require('../../src/content/portfolio.json');

test('priority case studies explain work, contribution and results with traceable sources',async({page})=>{
 for(const slug of ['dpotm','advertest','medtutor','prism']){
  const project=data.projects.find(project=>project.slug===slug);
  await page.goto(`/projects/${slug}`);
  await expect(page.locator('h1')).toContainText(project.title);
  await expect(page.locator('#overview')).toContainText(project.description.vi);
  await expect(page.locator('#contribution')).toContainText(project.personalContribution.vi);
  await expect(page.locator('#implementation')).toContainText(project.implementation.vi);
  await expect(page.locator('#results')).toContainText(project.result.vi);
  await expect(page.locator('.case-sources a')).toHaveCount(project.sources.length);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 expect(results.violations).toEqual([]);
 await page.getByRole('button',{name:'Switch to English'}).click();
 await expect(page.locator('#contribution')).toContainText(data.projects.find(p=>p.slug==='prism').personalContribution.en);
});

test('CV-backed education, experience and downloadable PDF are available without fabricated assets',async({page,request})=>{
 const response=await request.get('/CV_PhanTrongDat.pdf');expect(response.ok()).toBe(true);
 expect(response.headers()['content-type']).toContain('application/pdf');
 await page.goto('/personal');
 await expect(page.locator('#chapter-high-school')).toContainText('THPT Chuyên Vĩnh Phúc');
 await expect(page.locator('#chapter-university')).toContainText('Đại học Bách khoa Hà Nội');
 await expect(page.locator('.achievement-grid')).toContainText('EMNLP 2026');
 await page.goto('/work');
 await expect(page.locator('#experience')).toContainText('GeoIT VNPT');
 await expect(page.locator('#experience')).toContainText('BA GPS');
 const search=page.locator('#archive input[type=search]');await search.fill('medbot');
 await expect(page.locator('.cinema-index-entry')).toHaveCount(1);
 await expect(page.locator('.cinema-index-entry h3')).toContainText('MedTutor');
});
