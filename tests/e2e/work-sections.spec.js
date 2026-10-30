const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;

test('process has four concise steps, a real continuous path and no large slogan rows',async({page},info)=>{
 await page.goto('/work');
 await expect(page.locator('.kinetic-manifesto,.manifesto-lines,.type-wall,.mobile-skill-scenes,.project-universe')).toHaveCount(0);
 const flow=page.locator('.idea-process');await expect(flow.locator('.process-step')).toHaveCount(4);
 await expect(flow.locator('h2')).toHaveText('Một ý tưởng chỉ là khởi đầu.');
 await expect(flow.locator('.process-description')).toHaveCount(4);
 if(info.project.name==='desktop')expect(await flow.evaluate(node=>node.getBoundingClientRect().height/innerHeight)).toBeLessThanOrEqual(1.5);
 else await expect(flow.locator('.process-path-mobile')).toBeVisible();
 await expect(page.locator('#selected-work')).toHaveCount(1);
 await expect(page.locator('.orbit-scroll')).toHaveCount(0);
});

test('process disclosure is accessible with focus, tap and Escape and cites real repository content',async({page})=>{
 await page.goto('/work');const button=page.locator('.process-step-button').nth(1);
 await button.focus();await expect(button).toHaveAttribute('aria-expanded','true');
 const example=page.locator('#process-storylet-experiment');await expect(example).toBeVisible();await expect(example).toContainText('PSO-Optimize');
 await expect(example.getByRole('link',{name:'Đọc nguồn'})).toHaveAttribute('href',require('../../src/content/portfolio.json').projects.find(p=>p.slug==='pso-optimize').source);
 await page.keyboard.press('Escape');await expect(example).toBeHidden();
 await page.locator('.process-step-button').nth(2).click();await expect(page.locator('#process-storylet-build')).toBeVisible();
 await expect(page.locator('#process-storylet-build')).toContainText('ParkingAI');
 const results=await new AxeBuilder({page}).include('.idea-process').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations).toEqual([]);
});

test('selected stage keeps metadata, progress and CTA synchronized and never changes from scrolling alone',async({page})=>{
 await page.goto('/work');const gallery=page.locator('.selected-project-gallery');
 await gallery.getByRole('button',{name:'Dự án tiếp theo'}).click();
 await expect(page.locator('.selected-counter')).toHaveText('02 / 03');
 await expect(page.locator('.selected-stage-metadata:not([aria-hidden=true]) h3')).toHaveText('FutureVLA');
 await expect(page.locator('.selected-progress')).toHaveAttribute('aria-valuenow','2');
 await expect(page.locator('.selected-announcement')).toContainText('FutureVLA');
 await expect(page.locator('.selected-stage-link')).toHaveAttribute('href','/projects/future-vla');
 await page.mouse.wheel(0,240);await expect(page.locator('.selected-counter')).toHaveText('02 / 03');
 await gallery.getByRole('button',{name:'Dự án trước'}).click();await expect(page.locator('.selected-counter')).toHaveText('01 / 03');
 await gallery.focus();await page.keyboard.press('End');await expect(page.locator('.selected-counter')).toHaveText('03 / 03');
 await page.keyboard.press('Home');await expect(page.locator('.selected-counter')).toHaveText('01 / 03');
 await page.getByRole('link',{name:'Xem tất cả dự án'}).click();await expect(page).toHaveURL(/\/work#archive$/);
});

test('normal motion reveals once and simple mode keeps the process path static',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/work');
 const flow=page.locator('.idea-process');await flow.scrollIntoViewIfNeeded();
 await expect(flow).toHaveClass(/is-entered/);
 await page.waitForTimeout(1500);
 await expect(flow.locator('.process-step').first()).toHaveCSS('opacity','1');
 const visiblePath=flow.locator(info.project.name==='mobile'?'.process-path-mobile .process-path-draw':'.process-path-desktop .process-path-draw');
 await expect(visiblePath).toHaveCSS('stroke-dashoffset','0px');
 await page.locator('.selected-works').scrollIntoViewIfNeeded();await flow.scrollIntoViewIfNeeded();
 await expect(flow).toHaveClass(/is-entered/);
 if(info.project.name==='mobile')await page.getByRole('button',{name:'Mở menu'}).click();
 await page.getByRole('button',{name:'Simple view',exact:true}).click();
 await expect(flow.locator('.process-step').first()).toBeVisible();
 await expect(flow.locator('.process-signal').first()).toBeHidden();
});
