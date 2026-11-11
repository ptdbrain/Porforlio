const {test,expect}=require('@playwright/test');

test('decorative motion stays in gutters and never blocks the reading surface',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>{localStorage.setItem('ptd-motion','full');sessionStorage.setItem('ptd-neural-intro-v2-seen','1');});
 for(const path of ['/','/work','/personal','/contact','/projects/dpotm']){
  await page.goto(path);const ambient=page.locator('.ambient-motion');await expect(ambient).toBeVisible();
  await expect(ambient).toHaveAttribute('aria-hidden','true');await expect(ambient).toHaveCSS('pointer-events','none');
  await expect(ambient.locator('.ambient-companion')).toHaveCSS('animation-iteration-count','infinite');
  expect(await ambient.locator('a,button,[tabindex]').count()).toBe(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
});

test('manual motion preference persists across both stories',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/personal');
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
 await page.getByRole('button',{name:'Simple view',exact:true}).click();
 await expect(page.locator('.ambient-motion')).toBeHidden();
 await expect(page.locator('.portfolio')).toHaveClass(/is-simple/);
 await page.locator('.main-nav').getByRole('link',{name:'Công việc',exact:true}).click();
 await expect(page.locator('.work-v4')).toHaveClass(/v4-simple/);
 await page.reload();await expect(page.locator('.work-v4')).toHaveClass(/v4-simple/);
});

test('runtime reduced motion removes continuous scroll transforms',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/personal');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.personal-story')).not.toHaveClass(/personal-photo-motion/);
 await expect(page.locator('.ambient-motion')).toBeHidden();
 await page.emulateMedia({reducedMotion:'no-preference'});
 await expect(page.locator('.personal-story')).toHaveClass(/personal-photo-motion/);
 await expect(page.locator('.ambient-motion')).toBeVisible();
});


test('opening a photo pauses the decorative companion and Escape resumes it',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
 await page.goto('/personal');await page.locator('.personal-intro-photo .photo-button').click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await expect(page.locator('.ambient-companion')).toHaveCSS('animation-play-state','paused');
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
 await expect(page.locator('.ambient-companion')).toHaveCSS('animation-play-state','running');
});
