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

test('milestone page turns stay inside their image frame and clear the section heading',async({page})=>{
  await page.goto('/personal');await page.evaluate(()=>document.fonts.ready);
  const photo=page.locator('.defining-moments [data-photo-motion="page"]').first();
  const surface=photo.locator('.photo-surface');
  const size=await photo.evaluate(node=>({width:node.offsetWidth,height:node.offsetHeight}));
  for(const offset of [.92,.65,.25,.65,.92]){
    await photo.evaluate((node,offset)=>scrollTo({top:node.getBoundingClientRect().top+scrollY-innerHeight*offset,behavior:'instant'}),offset);
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await expect.poll(()=>surface.evaluate(node=>node.getAnimations().filter(animation=>animation.playState==='running').length)).toBe(0);
    const bounds=await photo.evaluate(node=>{
      const frame=node.getBoundingClientRect(),image=node.querySelector('.photo-surface').getBoundingClientRect();
      const x=frame.left+frame.width*.5,y=frame.top-12;
      return {left:image.left-frame.left,right:image.right-frame.right,top:image.top-frame.top,bottom:image.bottom-frame.bottom,
        coversAbove:y>90&&y<innerHeight?node.contains(document.elementFromPoint(x,y)):false};
    });
    expect(bounds.left).toBeGreaterThanOrEqual(-1);expect(bounds.right).toBeLessThanOrEqual(1);
    expect(bounds.top).toBeGreaterThanOrEqual(-1);expect(bounds.bottom).toBeLessThanOrEqual(1);
    expect(bounds.coversAbove).toBe(false);
    expect(await photo.evaluate(node=>({width:node.offsetWidth,height:node.offsetHeight}))).toEqual(size);
  }
  await photo.getByRole('button').focus();await expect(surface).toHaveCSS('transform','none');
  await page.keyboard.press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(photo.getByRole('button')).toBeFocused();
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
