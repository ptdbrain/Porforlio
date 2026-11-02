const {test,expect}=require('@playwright/test');

test.beforeEach(async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
});

test('Work reveals return on reverse scroll and section accents track native scrolling',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/work');
  const root=page.locator('.work-v4'),hero=page.locator('.v4-hero-copy');
  await expect(root).toHaveClass(/v4-motion/);
  await expect(hero).toHaveCSS('opacity','1');
  const heading=page.locator('#experience .v4-section-heading');
  await heading.evaluate(node=>window.scrollTo({top:node.getBoundingClientRect().top+scrollY-240,behavior:'instant'}));
  await expect(heading).toHaveCSS('opacity','1');
  const progress=()=>page.locator('#experience').evaluate(n=>Number(n.style.getPropertyValue('--work-progress')));
  const before=await progress();
  await page.evaluate(()=>scrollBy({top:180,behavior:'instant'}));
  await expect.poll(progress).toBeGreaterThan(before);
  await expect(hero).not.toHaveClass(/is-revealed/);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await expect(hero).toHaveClass(/is-revealed/);
  await expect(hero).toHaveCSS('opacity','1');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('animated tabs retain one interactive panel through rapid keyboard changes',async({page})=>{
  await page.goto('/work#capabilities');
  const panel=page.locator('#v4-cap-panel');
  const height=await panel.evaluate(n=>n.offsetHeight);
  await page.getByRole('tab',{name:'RAG & LLM'}).focus();
  await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');await page.keyboard.press('End');
  await expect(page.getByRole('tab',{name:'Nghiên cứu & tối ưu'})).toBeFocused();
  await expect(panel.getByRole('button')).toHaveCount(1);
  await expect(page.locator('.v4-cap-layer.is-active')).toHaveCSS('opacity','1');
  await expect(page.locator('.v4-cap-layer.is-active')).toContainText('Mixed precision');
  expect(await panel.evaluate(n=>n.offsetHeight)).toBe(height);
});

test('new filtered cards reveal and project return preserves focus with motion enabled',async({page})=>{
  await page.goto('/work#archive');
  await page.getByRole('searchbox',{name:'Tìm dự án'}).fill('medbot');
  const card=page.locator('[data-work-project="medtutor"]');
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveCSS('opacity','1');
  await card.click();await expect(page.locator('h1')).toHaveText('MedTutor.');
  await page.goBack();await expect(card).toBeFocused();await expect(card).toHaveCSS('opacity','1');
  await page.getByRole('searchbox',{name:'Tìm dự án'}).fill('');
  await expect(page.locator('.v4-project-card')).toHaveCount(6);
  await page.getByRole('button',{name:/Xem toàn bộ/}).click();
  const last=page.locator('.v4-project-card').last();await last.scrollIntoViewIfNeeded();
  await expect(last).toHaveCSS('opacity','1');
});

test('changing reduced motion at runtime restores all content and removes scroll effects',async({page})=>{
  await page.goto('/work');await expect(page.locator('.work-v4')).toHaveClass(/v4-motion/);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('.work-v4')).not.toHaveClass(/v4-motion/);
  for(const node of await page.locator('[data-work-reveal]').all()){
    await expect(node).toHaveCSS('opacity','1');await expect(node).toHaveCSS('translate','none');
  }
  await expect(page.locator('.v4-map-signal')).toBeHidden();
  await page.getByRole('tab',{name:'Computer Vision'}).click();
  await expect(page.locator('.v4-cap-layer.is-active')).toHaveCSS('opacity','1');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await expect(page.locator('.work-v4')).toHaveClass(/v4-motion/);
  await page.locator('.v4-hero-copy').scrollIntoViewIfNeeded();
  await expect(page.locator('.v4-hero-copy')).toHaveCSS('opacity','1');
});
