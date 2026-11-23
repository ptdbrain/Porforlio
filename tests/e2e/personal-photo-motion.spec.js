const {test,expect}=require('@playwright/test');

test.beforeEach(async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
});

test('photo gestures follow scroll in both directions without changing layout',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/personal');
  await expect(page.locator('.personal-story')).toHaveClass(/personal-photo-motion/);
  for(const selector of ['.collage-2','.achievement-card .photo','.sport-feature>.photo']){
    const photo=page.locator(selector).first();
    const fold=()=>photo.evaluate(n=>Number(n.style.getPropertyValue('--photo-fold')));
    await photo.evaluate(n=>scrollTo({top:n.getBoundingClientRect().top+scrollY-innerHeight+80,behavior:'instant'}));
    await expect.poll(fold).toBeGreaterThan(.1);
    const size=await photo.evaluate(n=>({width:n.offsetWidth,height:n.offsetHeight}));
    await photo.evaluate(n=>scrollTo({top:n.getBoundingClientRect().top+scrollY-180,behavior:'instant'}));
    await expect.poll(fold).toBe(0);
    expect(await photo.evaluate(n=>({width:n.offsetWidth,height:n.offsetHeight}))).toEqual(size);
    await photo.evaluate(n=>scrollTo({top:n.getBoundingClientRect().top+scrollY-innerHeight+80,behavior:'instant'}));
    await expect.poll(fold).toBeGreaterThan(.1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('wide chapter scenes track forward and backward without a shared sticky photo column',async({page})=>{
  await page.goto('/personal');
  await expect(page.locator('.timeline-sticky,.timeline-photo-layer')).toHaveCount(0);
  await expect(page.locator('.journey-board')).toHaveCount(3);
  const chapters=page.locator('[data-chapter]');
  for(const index of [0,1,2,1,0]){
    await chapters.nth(index).evaluate(n=>scrollTo({top:n.getBoundingClientRect().top+scrollY-innerHeight*.3,behavior:'instant'}));
    await expect(chapters.nth(index)).toHaveClass(/is-active/);
    await expect(chapters.nth(index).locator('.journey-board .photo img')).toBeVisible();
    await expect(page.locator('.timeline-markers a[aria-current=step]')).toHaveCount(1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
});

test('reduced motion removes folding and restores neutral image surfaces immediately',async({page})=>{
  await page.goto('/personal');
  await page.locator('.sport-feature').scrollIntoViewIfNeeded();
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('.personal-story')).not.toHaveClass(/personal-photo-motion/);
  for(const surface of await page.locator('.photo-surface').all()){
    await expect(surface).toHaveCSS('transform','none');
    await expect(surface).toHaveCSS('clip-path','none');
  }
  await page.emulateMedia({reducedMotion:'no-preference'});
  await expect(page.locator('.personal-story')).toHaveClass(/personal-photo-motion/);
});
