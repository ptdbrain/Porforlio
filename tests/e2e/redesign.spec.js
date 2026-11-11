const {test,expect}=require('@playwright/test');
const data=require('../../src/content/portfolio.json');

test('Home retains proof before story choices after dismissing the restored intro',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
 const video=[];page.on('request',request=>{if(request.url().endsWith('.mp4'))video.push(request.url());});
 await page.goto('/');await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
 await expect(page.locator('.highlight-card')).toHaveCount(3);
 expect(await page.locator('#highlights').evaluate(node=>Boolean(node.compareDocumentPosition(document.querySelector('#two-stories'))&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
 await expect(page.locator('.hero-secondary a').first()).toHaveAttribute('href',data.identity.cv);
 await page.locator('.highlight-card[href="/projects/dpotm"]').click();
 await expect(page.locator('h1')).toContainText('LLMFeed');
 await expect(page.locator('#links a[href*="aclanthology.org"]').first()).toHaveAttribute('href',/aclanthology.org/);
 expect(video.length).toBeGreaterThan(0);
});

test('Work presents featured evidence before experience and capabilities',async({page})=>{
 await page.goto('/work');
 const order=await page.locator('.work-v4>section').evaluateAll(nodes=>nodes.map(node=>node.id));
 expect(order.indexOf('featured')).toBeLessThan(order.indexOf('experience'));
 expect(order.indexOf('experience')).toBeLessThan(order.indexOf('capabilities'));
 await expect(page.locator('.featured-study')).toHaveCount(4);
 await expect(page.locator('.featured-role')).toHaveCount(4);
 for(const image of await page.locator('.featured-study img').all()){
  await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(node=>node.complete&&node.naturalWidth>0)).toBe(true);
 }
 await page.locator('#archive').scrollIntoViewIfNeeded();await page.getByRole('button',{name:/Xem toàn bộ/}).click();
 await expect(page.locator('.v4-project-card')).toHaveCount(23);
});

test('Personal omits empty chapters and archive gallery supports keyboard and focus return',async({page})=>{
 await page.goto('/personal');
 await expect(page.locator('#chapter-present,.present-section,.future-photo,.hobby-grid,.empty-text,.photo-empty')).toHaveCount(0);
 await expect(page.locator('.defining-moments .achievement-card')).toHaveCount(4);
 const archive=page.locator('.milestone-archive');await expect(archive).not.toHaveAttribute('open');
 await archive.locator('summary').focus();await page.keyboard.press('Enter');await expect(archive).toHaveAttribute('open','');
 await expect(page.locator('.training-card')).toContainText('Đã hoàn thành');
 const trigger=page.locator('.sport-gallery .photo-button').first();await trigger.click();
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 await expect(dialog.locator('.gallery-controls [role=status]')).toHaveText('2 / 3');
 await page.keyboard.press('ArrowRight');await expect(dialog.locator('.gallery-controls [role=status]')).toHaveText('3 / 3');
 await page.keyboard.press('ArrowLeft');await expect(dialog.locator('.gallery-controls [role=status]')).toHaveText('2 / 3');
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(trigger).toBeFocused();
});

test('case study has meaningful overview and routes keep real PNG previews',async({page,request})=>{
 await page.goto('/projects/medtutor');await expect(page.locator('.case-glance>div')).toHaveCount(3);
 await expect(page.locator('#lessons,.empty-text,.photo-empty')).toHaveCount(0);
 const nav=page.locator('.case-toc');await expect(nav.locator('a')).toHaveCount(6);
 await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content','https://ptdbrain.vercel.app/og/medtutor.png');
 const response=await request.get('/og/medtutor.png');expect(response.ok()).toBe(true);expect(response.headers()['content-type']).toContain('image/png');
 await expect(page.locator('.next-project .project-visual img')).toHaveAttribute('src',/project-maps/);
});

test('shared project media transition completes without duplicate snapshot names',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>{localStorage.setItem('ptd-motion','full');window.sharedErrors=[];const original=document.startViewTransition?.bind(document);if(original)document.startViewTransition=callback=>{const transition=original(callback);transition.ready.catch(error=>{if(error.name!=='AbortError')sharedErrors.push(error.message)});return transition;};});
 await page.goto('/work');await page.locator('.featured-study[href="/projects/medtutor"]').click();
 await expect(page.locator('h1')).toHaveText('MedTutor.');
 await expect(page.locator('html')).not.toHaveAttribute('data-route-motion');
 expect(await page.evaluate(()=>sharedErrors)).toEqual([]);
 await page.goBack();await expect(page.locator('.featured-study')).toHaveCount(4);await expect(page.locator('[data-work-featured="medtutor"]')).toBeFocused();
});

test('reading progress follows native scrolling and resets on navigation',async({page})=>{
 await page.goto('/work');await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight/2,behavior:'instant'}));
 await expect.poll(()=>page.locator('.reading-progress').evaluate(node=>new DOMMatrix(getComputedStyle(node).transform).a)).toBeGreaterThan(.4);
 await page.goto('/personal');await expect.poll(()=>page.locator('.reading-progress').evaluate(node=>new DOMMatrix(getComputedStyle(node).transform).a)).toBeLessThan(.01);
});
