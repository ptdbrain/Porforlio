const {test,expect}=require('@playwright/test');

test.beforeEach(async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
});
async function place(page,index,offset){
 await page.locator('[data-chapter]').nth(index).evaluate((node,offset)=>scrollTo({top:node.getBoundingClientRect().top+scrollY-innerHeight*offset,behavior:'instant'}),offset);
}

test('chapters have distinct text compositions and one accessible name per animated heading',async({page})=>{
 await page.goto('/personal');await page.evaluate(()=>document.fonts.ready);
 const chapters=page.locator('[data-chapter]');
 expect(await chapters.evaluateAll(nodes=>nodes.map(node=>node.dataset.writingLayout))).toEqual(['notes','editorial','perspective']);
 for(const [index,label]of ['THCS','THPT','Đại học'].entries()){
  await place(page,index,.3);
  const heading=chapters.nth(index).getByRole('heading',{name:label,exact:true});
  await expect(heading).toHaveCount(1);await expect(heading).toBeVisible();
  await expect(heading.locator('.journey-heading-visual')).toHaveAttribute('aria-hidden','true');
  await expect(heading).toHaveCSS('text-align',index===1?'right':index===2?'center':'left');
 }
 const indexNumbers=page.locator('#chapter-high-school .journey-milestone-index');
 await expect(indexNumbers.first()).toHaveText('01');await expect(indexNumbers.first()).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('text moves at the viewport edge and settles exactly in the reading zone without reflow',async({page})=>{
 await page.goto('/personal');await page.evaluate(()=>document.fonts.ready);
 const article=page.locator('#chapter-high-school'),camera=article.locator('.journey-copy-flight');
 const size=await article.evaluate(node=>({width:node.offsetWidth,height:node.offsetHeight}));
 await article.locator('.journey-reading').evaluate(node=>scrollTo({top:node.getBoundingClientRect().top+scrollY-innerHeight*.6,behavior:'instant'}));await expect(camera).not.toHaveCSS('transform','none');
 await article.locator('.journey-reading').evaluate(node=>scrollTo({top:node.getBoundingClientRect().top+scrollY-innerHeight*.15,behavior:'instant'}));await expect(camera).toHaveCSS('transform','none');
 await expect(article.locator('.journey-type-camera')).toHaveCSS('transform','none');
 expect(await article.evaluate(node=>({width:node.offsetWidth,height:node.offsetHeight}))).toEqual(size);
 await article.locator('.journey-reading').evaluate(node=>scrollTo({top:node.getBoundingClientRect().top+scrollY-innerHeight*.6,behavior:'instant'}));await expect(camera).not.toHaveCSS('transform','none');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(camera).toHaveCSS('transform','none');
 for(const glyph of await article.locator('.journey-glyph').all()){
  await expect(glyph).toHaveCSS('transform','none');await expect(glyph).toHaveCSS('animation-name','none');
 }
});

test('keyboard focus keeps the text panel still and VI/EN reflows without overflow',async({page})=>{
 await page.goto('/personal');await place(page,1,.4);
 const link=page.locator('#chapter-high-school a[href*="odaychuyenvinhphuc"]');
 await link.focus();await expect(link).toBeFocused();
 await expect(page.locator('#chapter-high-school .journey-copy-flight')).toHaveCSS('transform','none');
 await page.getByRole('button',{name:'Switch to English'}).click();
 await expect(page.locator('#chapter-university').getByRole('heading',{name:'University',exact:true})).toHaveCount(1);
 await page.setViewportSize({width:320,height:840});
 await place(page,2,.3);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await expect(page.locator('#chapter-university .journey-story')).not.toBeEmpty();
});
