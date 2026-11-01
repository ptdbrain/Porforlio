const {test,expect}=require('@playwright/test');

test('simple view persists and keeps Work content available across routes',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/work');
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
 await page.getByRole('button',{name:'Simple view',exact:true}).click();
 await expect(page.locator('.work-v4')).toHaveClass(/v4-simple/);
 await expect(page.locator('.v4-map-signal')).toBeHidden();
 await page.reload();await expect(page.locator('.work-v4')).toHaveClass(/v4-simple/);
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
 await page.locator('.main-nav').getByRole('link',{name:'Cá nhân',exact:true}).click();
 await expect(page.locator('.life-chapter')).toHaveCount(4);
 await page.goBack();await expect(page.locator('.v4-job-summary')).toHaveCount(3);
});

test('normal motion settles to readable content and cleans up on route revisits',async({page},info)=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/work');
 await page.locator('#capabilities').scrollIntoViewIfNeeded();
 await expect(page.locator('#v4-cap-title').locator('..')).toHaveClass(/is-revealed/);
 await expect(page.locator('#v4-cap-title').locator('..')).toHaveCSS('opacity','1');
 await page.getByRole('tab',{name:'Computer Vision'}).click();
 await expect(page.locator('.v4-cap-layer.is-active')).toContainText('YOLO');
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
 await page.locator('.main-nav').getByRole('link',{name:'Cá nhân',exact:true}).click();
 await page.goBack();await expect(page.locator('.work-v4')).toBeVisible();
 expect(errors).toEqual([]);
});

test('low-power fallback keeps the capability selector functional',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>Object.defineProperty(navigator,'hardwareConcurrency',{get:()=>2}));
 await page.goto('/work');await expect(page.locator('.work-v4')).toHaveClass(/v4-simple/);
 await page.getByRole('tab',{name:'Nghiên cứu & tối ưu'}).click();
 await expect(page.locator('.v4-cap-layer.is-active')).toContainText('Mixed precision');
});

test('contact connects to email, clipboard and Personal',async({page,context})=>{
 await page.goto('/work');await expect(page.locator('.v4-email')).toHaveAttribute('href','mailto:phandat20052009@gmail.com');
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 await page.locator('.v4-contact').getByRole('button',{name:'Sao chép email'}).click();
 await expect(page.locator('.v4-copy-status')).toHaveText('Đã sao chép');
 await page.locator('.v4-contact-links').getByRole('link',{name:'Gặp con người phía sau công việc'}).click();
 await expect(page).toHaveURL(/\/personal$/);
});
