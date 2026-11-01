const {test,expect}=require('@playwright/test');

test('intro skips with keyboard, crossfades into Home and only plays once',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');
 const dialog=page.getByRole('dialog',{name:'Video giới thiệu portfolio'});
 await expect(dialog).toBeVisible();
 await expect(page.locator('.neural-intro-video')).toHaveJSProperty('muted',true);
 await expect(dialog.getByRole('button',{name:'Bỏ qua'})).toBeFocused();
 await page.keyboard.press('Tab');await expect(dialog.getByRole('button',{name:'Bật âm thanh'})).toBeFocused();
 await page.keyboard.press('Escape');
 await expect(page.locator('.portfolio')).toHaveClass(/intro-revealed/);
 await expect(dialog).toBeHidden();await expect(page.locator('#main-content')).toBeFocused();
 await expect(page.locator('.portfolio')).not.toHaveAttribute('inert');
 await page.reload();await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('a stalled video cannot leave the visitor on a loading gate',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 let held;await page.route('**/neural-intro.mp4',route=>{held=route;});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.getByRole('dialog')).toBeVisible();
 await expect(page.getByRole('dialog')).toBeHidden({timeout:7000});
 await expect(page.locator('.portfolio')).not.toHaveAttribute('inert');
 await expect(page.locator('body')).not.toHaveCSS('overflow','hidden');
 await held?.abort();
});

test('the video completes naturally and releases the page',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');
 await expect(page.getByRole('dialog')).toBeVisible();
 const video=page.locator('.neural-intro-video');
 await expect(page.locator('.neural-intro')).toHaveAttribute('data-exit','natural',{timeout:10000});
 await expect(video).toHaveJSProperty('paused',false);
 await expect(page.locator('.portfolio')).toHaveCSS('opacity','1');
 await expect(page.locator('.hero-copy h1')).toHaveCSS('animation-name','none');
 const initialTime=await video.evaluate(node=>node.currentTime);
 const initialWidth=await page.locator('.home-hero').evaluate(node=>node.getBoundingClientRect().width);
 await page.waitForTimeout(200);
 expect(await video.evaluate(node=>node.currentTime)).toBeGreaterThan(initialTime);
 expect(await video.evaluate(node=>node.volume)).toBeLessThan(1);
 await expect(page.getByRole('dialog')).toBeHidden({timeout:12000});
 await expect(page.locator('.portfolio')).not.toHaveAttribute('inert');
 await expect(page.locator('#home-title')).toBeVisible();
 await expect(page.locator('.hero-copy h1')).toHaveCSS('animation-name','none');
 expect(await page.locator('.home-hero').evaluate(node=>node.getBoundingClientRect().width)).toBeCloseTo(initialWidth,0);
 expect(errors).toEqual([]);
});

test('a failed app script leaves the prerendered home readable',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.route('**/assets/*.js',route=>route.abort());
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.portfolio')).toHaveCSS('opacity','1',{timeout:5000});
 await expect(page.locator('h1')).toContainText('Trọng Đạt');
});

test('reduced motion and direct home fragments bypass the intro video request',async({page})=>{
 const requests=[];page.on('request',r=>{if(r.url().endsWith('neural-intro.mp4'))requests.push(r.url());});
 await page.goto('/');await expect(page.getByRole('dialog')).toHaveCount(0);
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/#two-stories');
 await expect(page.getByRole('dialog')).toHaveCount(0);
 await expect.poll(()=>page.locator('#two-stories').evaluate(n=>Math.abs(n.getBoundingClientRect().top))).toBeLessThan(150);
 expect(requests).toEqual([]);
});

test('a saved Simple view preference applies to Home and bypasses video',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>localStorage.setItem('ptd-motion','simple'));
 await page.goto('/');await expect(page.getByRole('dialog')).toHaveCount(0);
 await expect(page.locator('html')).toHaveAttribute('data-motion','simple');
 await expect(page.locator('.intro-in').first()).toHaveCSS('animation-name','none');
 await page.locator('.hero-actions').getByRole('link',{name:'Tìm hiểu về tôi'}).click();
 await expect(page.locator('.portfolio')).toHaveClass(/is-simple/);
});

test('mobile navigation restores focus on Escape and dismisses on outside interaction',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/work');
 const toggle=page.getByRole('button',{name:'Mở menu'});
 await toggle.click();await expect(page.locator('.main-nav a').first()).toBeFocused();
 await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(toggle).toBeFocused();
 await toggle.click();await page.mouse.click(10,750);
 await expect(toggle).toHaveAttribute('aria-expanded','false');
});

test('Back restores a scrolled Personal fragment rather than jumping to its start',async({page})=>{
 await page.goto('/personal#chapter-university');await page.evaluate(()=>document.fonts.ready);
 await expect.poll(()=>page.locator('#chapter-university').evaluate(n=>n.getBoundingClientRect().top)).toBeLessThan(150);
 await page.evaluate(()=>window.scrollBy({top:350,behavior:'instant'}));await page.waitForTimeout(250);
 const scroll=await page.evaluate(()=>scrollY);
 const menu=page.getByRole('button',{name:'Mở menu'});if(await menu.isVisible())await menu.click();
 await page.locator('.main-nav').getByRole('link',{name:'Công việc',exact:true}).click();
 await page.goBack();await expect(page).toHaveURL(/personal#chapter-university$/);
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeCloseTo(scroll,-1);
});

test('a sequence of case studies retains the originating Work filter',async({page})=>{
 await page.goto('/work');await page.locator('.v4-filters').getByRole('button',{name:'Computer Vision',exact:true}).click();
 await page.locator('[data-work-project="advertest"]').click();
 await page.locator('.next-project').click();await expect(page).toHaveURL(/projects\/medtutor$/);
 await page.locator('.back-link').click();
 await expect(page.locator('.v4-filters').getByRole('button',{name:'Computer Vision',exact:true})).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('[data-work-project="advertest"]')).toBeFocused();
});

test('achievement dialogs contain focus and restore the originating button',async({page})=>{
 await page.goto('/personal');const button=page.locator('.achievement-card .text-link').first();await button.click();
 const dialog=page.getByRole('dialog',{name:'LLMFeed · EMNLP 2026 Main Conference'});
 await expect(dialog).toBeVisible();await expect(page.locator('.portfolio')).toHaveAttribute('inert','');
 const close=dialog.getByRole('button',{name:'Đóng',exact:true});await expect(close).toBeFocused();
 await page.keyboard.press('Shift+Tab');await expect(dialog.getByRole('link',{name:'Xem minh chứng'})).toBeFocused();
 await page.keyboard.press('Tab');await expect(close).toBeFocused();
 await page.keyboard.press('Escape');await expect(dialog).toBeHidden();await expect(button).toBeFocused();
 await expect(page.locator('.portfolio')).not.toHaveAttribute('inert');
});

test('direct contact exposes a page heading and the case architecture announces selection',async({page})=>{
 await page.goto('/contact');await expect(page.locator('h1')).toHaveText('Cùng tạo nên điều có ý nghĩa.');
 await page.goto('/projects/medtutor');const node=page.getByRole('button',{name:'02 Retrieve'});await node.click();
 await expect(node).toHaveAttribute('aria-pressed','true');await expect(page.locator('#case-architecture-detail')).toContainText('Dense + BM25');
});

test('case-study table of contents moves keyboard focus to the chosen section',async({page})=>{
 await page.goto('/projects/medtutor');
 const link=page.locator('.case-toc').getByRole('link',{name:/Triển khai/});
 await link.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#implementation')).toBeFocused();
 await expect.poll(()=>page.locator('#implementation').evaluate(node=>node.getBoundingClientRect().top)).toBeLessThan(150);
});
