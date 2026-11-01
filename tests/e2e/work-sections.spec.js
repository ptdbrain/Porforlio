const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;

test('capability tabs support keyboard selection and filter the one project library',async({page})=>{
 await page.goto('/work');
 const tab=page.getByRole('tab',{name:'RAG & LLM'});await tab.focus();
 await page.keyboard.press('ArrowRight');
 await expect(page.getByRole('tab',{name:'Computer Vision'})).toBeFocused();
 await expect(page.locator('.v4-cap-layer.is-active')).toContainText('YOLO');
 await page.keyboard.press('End');await expect(page.locator('.v4-cap-layer.is-active')).toContainText('Mixed precision');
 await page.keyboard.press('Home');await expect(page.locator('.v4-cap-layer.is-active')).toContainText('Qdrant');
 await page.getByRole('button',{name:'Xem dự án liên quan'}).click();
 await expect(page.locator('.v4-filters').getByRole('button',{name:'RAG & LLM',exact:true})).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('.v4-project-card')).toHaveCount(3);
 await expect(page.locator('.v4-project-card h3')).toHaveText(['MedTutor','LabGuard','BrandFlow']);
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 expect(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});

for(const back of ['browser','link'])test(`library restores expanded results, search and origin focus after ${back} return`,async({page})=>{
 await page.goto('/work');
 const search=page.getByRole('searchbox',{name:'Tìm dự án'});
 await search.fill('medbot');
 const card=page.locator('[data-work-project="medtutor"]');await card.scrollIntoViewIfNeeded();
 const scroll=await page.evaluate(()=>scrollY);await card.click();
 await expect(page.locator('h1')).toHaveText('MedTutor.');
 if(back==='browser')await page.goBack();else await page.locator('.back-link').click();
 await expect(search).toHaveValue('medbot');await expect(card).toBeFocused();
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeCloseTo(scroll,-1);
 await expect(page.locator('.v4-project-card')).toHaveCount(1);
});

test('expanded archive remains expanded and has no duplicate gallery after browser back',async({page})=>{
 await page.goto('/work');await page.getByRole('button',{name:/Xem toàn bộ/}).click();
 const total=await page.locator('.v4-project-card').count();
 await page.locator('[data-work-project="pathfinder"]').click();await expect(page).toHaveURL(/\/projects\/pathfinder$/);
 await page.goBack();await expect(page.locator('.v4-project-card')).toHaveCount(total);
 await expect(page.locator('[data-work-project="pathfinder"]')).toBeFocused();
 await expect(page.locator('.selected-works,.cinema-project-index')).toHaveCount(0);
});

test('narrow-screen capability changes keep panel height stable in both languages',async({page})=>{
 await page.setViewportSize({width:320,height:840});
 for(const language of ['vi','en']){
  await page.goto(`/work?lang=${language}`);await page.evaluate(()=>document.fonts.ready);
  const heights=[];
  for(const tab of await page.getByRole('tab').all()){
   await tab.click();heights.push(await page.locator('#v4-cap-panel').evaluate(node=>node.getBoundingClientRect().height));
   await expect(page.locator('.v4-cap-layer.is-active')).toHaveCount(1);
   await expect(page.locator('#v4-cap-panel').getByRole('button')).toHaveCount(1);
  }
  expect(Math.max(...heights)-Math.min(...heights)).toBeLessThan(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
});
