const {test,expect}=require('@playwright/test');

test.beforeEach(async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.addInitScript(()=>{
    localStorage.setItem('ptd-motion','full');
    sessionStorage.setItem('ptd-neural-intro-seen','1');
  });
});

test('every page has a continuous decorative companion outside the reading column',async({page})=>{
  for(const path of ['/','/work','/personal','/contact','/projects/dpotm']){
    await page.goto(path);
    const ambient=page.locator('.ambient-motion'),companion=ambient.locator('.ambient-companion');
    await expect(ambient).toBeVisible();
    await expect(ambient).toHaveAttribute('aria-hidden','true');
    await expect(ambient).toHaveCSS('pointer-events','none');
    await expect(companion).toHaveCSS('animation-iteration-count','infinite');
    const first=await companion.evaluate(n=>getComputedStyle(n).transform);
    await expect.poll(()=>companion.evaluate(n=>getComputedStyle(n).transform)).not.toBe(first);
    expect(await ambient.locator('a,button,[tabindex]').count()).toBe(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const {right}=await companion.boundingBox().then(b=>({right:b.x+b.width}));
    expect(right).toBeLessThanOrEqual(await page.evaluate(()=>innerWidth));
  }
});

test('Personal can disable continuous motion and the preference follows navigation',async({page},info)=>{
  await page.goto('/personal');
  if(info.project.name==='mobile'){
    await page.getByRole('button',{name:'Mở menu'}).click();
    await expect(page.locator('.ambient-companion')).toHaveCSS('animation-play-state','paused');
  }
  await page.getByRole('button',{name:'Simple view',exact:true}).click();
  await expect(page.locator('.ambient-motion')).toBeHidden();
  await page.locator('.main-nav').getByRole('link',{name:'Công việc',exact:true}).click();
  await expect(page.locator('.work-v4')).toHaveClass(/v4-simple/);
  await expect(page.locator('.ambient-motion')).toBeHidden();
});

test('runtime reduced motion hides the companion and restores it when allowed',async({page})=>{
  await page.goto('/personal');await expect(page.locator('.ambient-motion')).toBeVisible();
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('.ambient-motion')).toBeHidden();
  await page.emulateMedia({reducedMotion:'no-preference'});
  await expect(page.locator('.ambient-motion')).toBeVisible();
});
