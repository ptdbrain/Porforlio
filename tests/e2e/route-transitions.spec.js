const {test,expect}=require('@playwright/test');

test.beforeEach(async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.addInitScript(()=>{
    localStorage.setItem('ptd-motion','full');sessionStorage.setItem('ptd-neural-intro-v2-seen','1');
    window.transitionErrors=[];window.transitionCount=0;
    const original=document.startViewTransition?.bind(document);
    if(original)document.startViewTransition=callback=>{
      window.transitionCount++;
      const transition=original(callback);
      transition.ready.catch(error=>{if(error.name!=='AbortError')window.transitionErrors.push(error.message)});
      return transition;
    };
  });
});

async function go(page,path){
  const menu=page.getByRole('button',{name:'Mở menu'});
  const mobile=await menu.isVisible();
  if(mobile)await menu.click();
  const link=page.locator(`.site-header a[href="${path}"]`).first();
  if(mobile){
    const box=await link.boundingBox();
    await page.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);
  }else await link.click();
  await expect(page).toHaveURL(new RegExp(path==='/'?'/$':path+'$'));
  await expect(page.locator('html')).not.toHaveAttribute('data-route-motion');
}

test('Home and both stories crossfade repeatedly with readable content and a stable header',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');
  const header=await page.locator('.site-header').boundingBox();
  for(const path of ['/work','/personal','/work','/','/personal','/']){
    await go(page,path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    expect((await page.locator('.site-header').boundingBox()).y).toBe(header.y);
    expect(await page.evaluate(()=>scrollY)).toBe(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  }
  expect(await page.evaluate(()=>transitionCount)).toBe(6);
  expect(await page.evaluate(()=>transitionErrors)).toEqual([]);
  expect(errors).toEqual([]);
});

test('Back restores a scrolled story and rapid changes settle on the latest destination',async({page})=>{
  await page.goto('/personal');await page.evaluate(()=>document.fonts.ready);
  await page.locator('#chapter-university').scrollIntoViewIfNeeded();
  const scroll=await page.evaluate(()=>scrollY);
  await go(page,'/work');await page.goBack();
  await expect(page.locator('html')).not.toHaveAttribute('data-route-motion');
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeCloseTo(scroll,-1);
  // Programmatic clicks exercise cancellation before old snapshots finish.
  await page.evaluate(()=>document.querySelector('.main-nav a[href="/work"]').click());
  await expect(page).toHaveURL(/\/work$/);
  await page.evaluate(()=>document.querySelector('.main-nav a[href="/personal"]').click());
  await expect(page).toHaveURL(/\/personal$/);
  await expect(page.locator('html')).not.toHaveAttribute('data-route-motion');
  await expect(page.locator('.personal-hero h1')).toBeVisible();
  expect(await page.evaluate(()=>transitionErrors)).toEqual([]);
});

test('unsupported native transitions use a clean fallback and reduced motion skips animation',async({page})=>{
  await page.addInitScript(()=>document.startViewTransition=undefined);
  await page.goto('/');
  await go(page,'/work');await go(page,'/personal');
  await expect(page.locator('main')).toHaveCSS('transform','none');
  await page.emulateMedia({reducedMotion:'reduce'});
  await go(page,'/work');
  await expect(page.locator('main')).toHaveCSS('opacity','1');
  expect(await page.evaluate(()=>document.documentElement.style.getPropertyValue('--route-surface'))).toBe('');
});
