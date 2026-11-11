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

test('timeline follows chapters forward and backward with one accessible photo layer',async({page},info)=>{
  await page.goto('/personal');
  if(info.project.name==='mobile'){
    await page.locator('#chapter-university .photo').first().scrollIntoViewIfNeeded();
    await expect(page.locator('#chapter-university .mobile-chapter-photo')).toBeVisible();
    await expect(page.locator('.timeline-sticky')).toBeHidden();
    return;
  }
  const chapters=page.locator('[data-chapter]');
  for(const index of [0,1,2,1,0]){
    await chapters.nth(index).evaluate(n=>scrollTo({top:n.getBoundingClientRect().top+scrollY-innerHeight*.3,behavior:'instant'}));
    const layer=page.locator('.timeline-photo-layer').nth(index);
    await expect(layer).toHaveClass(/is-active/);
    await expect(layer).toHaveCSS('opacity','1');
    await expect(page.locator('.timeline-photo-layer[aria-hidden="false"]')).toHaveCount(1);
    await expect(page.locator('.timeline-photo-layer[inert]')).toHaveCount(2);
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
