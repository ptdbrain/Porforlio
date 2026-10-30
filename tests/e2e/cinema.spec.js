const {test,expect}=require('@playwright/test');

test('cold open identifies the person and keeps project/CV actions immediately accessible',async({page})=>{
 await page.goto('/work');await expect(page.locator('.cold-identity')).toContainText('PHAN TRỌNG ĐẠT');
 await expect(page.locator('.cold-focus')).toContainText('COMPUTER VISION');
 await expect(page.locator('.cold-actions a')).toBeInViewport();
 await expect(page.locator('.cold-actions [aria-disabled=true]')).toContainText('CV');
 await page.locator('.cold-actions a').click();await expect(page).toHaveURL(/#selected-work$/);
});

test('three distinct project worlds show documented scope, not generated results',async({page})=>{
 await page.goto('/work');
 await expect(page.locator('.product-film h2')).toHaveText('MedTutor');
 await expect(page.locator('.research-motion h2')).toHaveText('FutureVLA');
 await expect(page.locator('.interactive-world h2')).toHaveText('LabGuard');
 await expect(page.locator('.demo-honesty')).toContainText('không gọi AI');
 await expect(page.locator('.research-proof')).toContainText('Chưa bổ sung phép đo');
 await expect(page.locator('.metric-grid')).toHaveCount(0);
 await page.locator('.film-tabs').getByRole('button',{name:'Chi tiết tính năng'}).click();await expect(page.locator('.film-annotation')).toContainText('Backend FastAPI');
 await page.locator('.film-layers').getByRole('button',{name:/API/}).click();await expect(page.locator('.layer-description')).toContainText('FastAPI');
});

test('research process opens an accessible detail overlay and restores focus',async({page})=>{
 await page.goto('/work');const node=page.locator('.research-process button').nth(2);await node.click();
 const modal=page.getByRole('dialog');await expect(modal).toContainText('Critic');await expect(modal).toContainText('Chưa bổ sung');
 await page.keyboard.press('Tab');expect(await modal.evaluate(root=>root.contains(document.activeElement))).toBe(true);
 await page.keyboard.press('Escape');await expect(modal).toHaveCount(0);await expect(node).toBeFocused();
});

test('interactive fallback reel supports tabs and arrow keys without a fake live request',async({page})=>{
 const requests=[];page.on('request',request=>{if(request.method()==='POST')requests.push(request.url());});
 await page.goto('/work');const world=page.locator('.interactive-world');
 await world.getByRole('tab',{name:'03 / Kết quả'}).click();await expect(world.getByRole('tabpanel')).toContainText('Prototype hỗ trợ');
 await world.getByRole('button',{name:'Khung tiếp theo'}).click();await expect(world.getByRole('tab',{name:'04 / Công nghệ'})).toHaveAttribute('aria-selected','true');
 await world.getByRole('button',{name:'Khung trước'}).click();
 await world.getByRole('tab',{name:'03 / Kết quả'}).focus();await page.keyboard.press('Home');
 await expect(world.getByRole('tab',{name:'01 / Tổng quan'})).toHaveAttribute('aria-selected','true');
 await world.locator('.interactive-reel').focus();await page.keyboard.press('ArrowRight');await expect(world.getByRole('tab',{name:'02 / Tương tác'})).toHaveAttribute('aria-selected','true');
 expect(requests).toEqual([]);
});

test('experiment drawer and future choices reveal supplied content with honest empty fields',async({page})=>{
 await page.goto('/work');await page.locator('.experiment-open').first().click();await expect(page.locator('.experiment-drawer')).toContainText('FutureVLA');
 await expect(page.locator('.experiment-notes')).toContainText('Chưa bổ sung');await expect(page.locator('.experiment-updated').first()).toContainText('Chưa bổ sung ngày');
 await page.locator('.experiment-drawer').getByRole('button',{name:'Đóng'}).click();await expect(page.locator('.experiment-drawer')).toHaveCount(0);
 await page.getByRole('tab',{name:'01 Vị trí mong muốn'}).click();await expect(page.locator('#future-panel')).toContainText('Chưa bổ sung');
 await page.getByRole('tab',{name:'02 Điều muốn đào sâu'}).click();await expect(page.locator('#future-panel')).toContainText('Computer Vision');
});

test('simple view persists and stops spatial pinning without changing Personal',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/work');
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
 await page.getByRole('button',{name:'Simple view',exact:true}).click();
 await expect(page.locator('.kinetic-cinema')).toHaveClass(/cinema-simple/);
 await expect(page.locator('.selected-stage-viewport')).toHaveCSS('position','relative');
 await expect(page.locator('.orbit-scroll,.type-wall,.manifesto-lines')).toHaveCount(0);
 await page.reload();await expect(page.locator('.kinetic-cinema')).toHaveClass(/cinema-simple/);
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
 await page.locator('.main-nav').getByRole('link',{name:'Cá nhân',exact:true}).click();
 await expect(page.locator('.life-chapter')).toHaveCount(4);await expect(page.locator('.theme-personal')).toBeVisible();
});

test('normal-motion project stage has direct controls, keyboard navigation and a real case-study link',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/work');
 const gallery=page.locator('.selected-project-gallery');await gallery.scrollIntoViewIfNeeded();
 await gallery.getByRole('button',{name:'Dự án tiếp theo'}).click();
 await expect(page.locator('.selected-stage-metadata:not([aria-hidden=true]) h3')).toHaveText('FutureVLA');
 await expect(page.locator('.selected-progress')).toHaveAttribute('aria-valuenow','2');
 await gallery.focus();await page.keyboard.press('ArrowLeft');
 await expect(page.locator('.selected-stage-metadata:not([aria-hidden=true]) h3')).toHaveText('MedTutor');
 await expect(page.locator('.selected-stage-viewport')).toHaveCSS('position','relative');
 await page.locator('.selected-stage-link').click();await expect(page).toHaveURL(/\/projects\/medtutor$/);await expect(page.locator('h1')).toHaveText('MedTutor.');
});

test('low-power fallback does not initialize a scroll scene',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>Object.defineProperty(navigator,'hardwareConcurrency',{get:()=>2}));
 await page.goto('/work');await expect(page.locator('.kinetic-cinema')).toHaveClass(/cinema-simple/);await expect(page.locator('.kinetic-cinema')).not.toHaveAttribute('data-active-scene',/.+/);
});

test('closing scene connects to real email and Personal',async({page,context})=>{
 await page.goto('/work');await expect(page.locator('.closing-email')).toHaveAttribute('href','mailto:phandat20052009@gmail.com');
 await context.grantPermissions(['clipboard-read','clipboard-write']);await page.locator('.work-closing').getByRole('button',{name:'Sao chép email'}).click();await expect(page.locator('.work-closing [role=status]')).toContainText('Đã sao chép');
 await page.locator('.personal-ending-link').click();await expect(page).toHaveURL(/\/personal$/);
});

test('touch project stage and reel change slides without capturing vertical gestures',async({page},info)=>{
 test.skip(info.project.name!=='mobile','Touch-specific check');
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/work');
 const rail=page.locator('.selected-stage-stack');await rail.scrollIntoViewIfNeeded();
 const client=await page.context().newCDPSession(page);
 async function swipe(locator,vertical=false){const box=await locator.boundingBox();const x1=box.x+Math.min(box.width*.78,280),x2=box.x+Math.max(30,box.width*.18);const y=Math.max(115,Math.min(600,box.y+100));await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y,id:1}]});for(const fraction of [.25,.5,.75,1])await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:vertical?x1+3:x1+(x2-x1)*fraction,y:vertical?y-100*fraction:y+3,id:1}]});await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
 await swipe(rail);await expect(page.locator('.selected-stage-metadata:not([aria-hidden=true]) h3')).toHaveText('FutureVLA');
 const reel=page.locator('.interactive-reel');await reel.scrollIntoViewIfNeeded();await swipe(reel);
 await expect(page.getByRole('tab',{name:'02 / Tương tác'})).toHaveAttribute('aria-selected','true');
 await swipe(reel,true);await expect(page.getByRole('tab',{name:'02 / Tương tác'})).toHaveAttribute('aria-selected','true');
});

test('normal-motion route revisits clean up scenes and preserve direct anchors',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'no-preference'});const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/work');
 for(let index=0;index<2;index++){
  await expect(page.locator('.kinetic-cinema')).toHaveClass(/cinema-motion/);
  if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
  await page.locator('.main-nav').getByRole('link',{name:'Đóng góp',exact:true}).click();
  await expect(page).toHaveURL(/#experience$/);
  expect(await page.locator('#experience').evaluate(node=>Math.abs(node.getBoundingClientRect().top)<160)).toBe(true);
  if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
  await page.locator('.main-nav').getByRole('link',{name:'Cá nhân',exact:true}).click();
  await expect(page.locator('.kinetic-cinema')).toHaveCount(0);
  await page.goBack();await expect(page.locator('.kinetic-cinema')).toHaveCount(1);
 }
 expect(errors).toEqual([]);
});
