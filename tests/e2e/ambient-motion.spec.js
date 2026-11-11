const {test,expect}=require('@playwright/test');

test('reading surfaces have no infinite decorative animation',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
 for(const path of ['/','/work','/personal','/contact','/projects/dpotm']){
  await page.goto(path);await expect(page.locator('.ambient-motion')).toHaveCount(0);
  expect(await page.evaluate(()=>document.getAnimations().filter(animation=>animation.effect.getTiming().iterations===Infinity&&animation.playState==='running').length)).toBe(0);
 }
});

test('manual motion preference persists across both stories',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/personal');
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
 await page.getByRole('button',{name:'Simple view',exact:true}).click();
 await expect(page.locator('.portfolio')).toHaveClass(/is-simple/);
 await page.locator('.main-nav').getByRole('link',{name:'Công việc',exact:true}).click();
 await expect(page.locator('.work-v4')).toHaveClass(/v4-simple/);
 await page.reload();await expect(page.locator('.work-v4')).toHaveClass(/v4-simple/);
});

test('runtime reduced motion removes continuous scroll transforms',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/personal');
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.personal-story')).not.toHaveClass(/personal-photo-motion/);
 await page.emulateMedia({reducedMotion:'no-preference'});
 await expect(page.locator('.personal-story')).toHaveClass(/personal-photo-motion/);
});
