const {test,expect}=require('@playwright/test');

test.beforeEach(async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
});
async function chapter(page,index,offset=.3){
 await page.locator('[data-chapter]').nth(index).evaluate((node,offset)=>scrollTo({top:node.getBoundingClientRect().top+scrollY-innerHeight*offset,behavior:'instant'}),offset);
 await expect(page.locator('.life-chapter.is-active')).toHaveAttribute('data-chapter',String(index));
}

test('three distinct scenes stay coherent during forward, reverse and rapid chapter changes',async({page,isMobile})=>{
 const errors=[];page.on('pageerror',error=>errors.push(error.message));await page.goto('/personal');
 await expect(page.locator('.journey-timeline')).toHaveClass(/journey-motion/);
 const dimensions=await page.locator('[data-chapter]').evaluateAll(nodes=>nodes.map(n=>n.offsetHeight));
 for(const index of [0,1,2,1,0,2]){
  await chapter(page,index);
  await expect(page.locator('.timeline-photo-layer[aria-hidden=false]')).toHaveCount(1);
  await expect(page.locator('.timeline-photo-layer[inert]')).toHaveCount(2);
  const scene=isMobile?page.locator('.life-chapter.is-active .mobile-chapter-photo .journey-scene'):page.locator('.timeline-photo-layer.is-active .journey-scene');
  await expect(scene).toHaveAttribute('data-scene-effect',['assemble','aperture','portal'][index]);
  await expect(scene.locator('.journey-frame .photo img')).toBeVisible();
 }
 expect(await page.locator('[data-chapter]').evaluateAll(nodes=>nodes.map(n=>n.offsetHeight))).toEqual(dimensions);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 expect(errors).toEqual([]);
});

test('chapter progress and photo camera respond to native scroll then stop offscreen',async({page,isMobile})=>{
 await page.goto('/personal');await chapter(page,1);
 const progress=()=>page.locator('#chapter-high-school .journey-chapter-progress>i').evaluate(node=>new DOMMatrix(getComputedStyle(node).transform).a);
 const before=await progress();await page.evaluate(()=>scrollBy({top:180,behavior:'instant'}));
 await expect.poll(progress).toBeGreaterThan(before);
 const camera=page.locator(isMobile?'#chapter-high-school .journey-camera':'.timeline-photo-layer.is-active .journey-camera');
 await expect(camera).not.toHaveCSS('transform','none');
 await page.locator('#life-beyond-code').scrollIntoViewIfNeeded();
 await expect(page.locator('.journey-timeline')).not.toHaveClass(/is-journey-in-view/);
 expect(await page.locator('.journey-stage-axis').evaluate(node=>getComputedStyle(node,'::after').animationName)).toBe('none');
});

test('chapter milestones reveal with keyboard focus and reduced motion keeps every chapter readable',async({page})=>{
 await page.goto('/personal');await chapter(page,1);
 const link=page.locator('#chapter-high-school a[href*="odaychuyenvinhphuc"]');
 await link.focus();await expect(link).toBeFocused();
 await expect(link.locator('..')).toHaveClass(/is-journey-visible/);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.journey-timeline')).not.toHaveClass(/journey-motion/);
 for(const index of [2,0,1])await chapter(page,index);
 for(const node of await page.locator('[data-journey-reveal]').all()){
  await expect(node).toHaveCSS('opacity','1');await expect(node).toHaveCSS('transform','none');
 }
 await expect(page.locator('.journey-shards').first()).toBeHidden();
 await page.emulateMedia({reducedMotion:'no-preference'});
 await expect(page.locator('.journey-timeline')).toHaveClass(/journey-motion/);
});

test('mobile scene photos open the real chapter album and return focus',async({page,isMobile})=>{
 test.skip(!isMobile,'The inline scene is the mobile image control.');
 await page.goto('/personal');await chapter(page,1);
 const trigger=page.locator('#chapter-high-school .mobile-chapter-photo .photo-button');
 await trigger.click();const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 await expect(dialog.locator('.gallery-controls [role=status]')).toHaveText('1 / 4');
 await page.keyboard.press('ArrowRight');await expect(dialog.locator('.gallery-controls [role=status]')).toHaveText('2 / 4');
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);await expect(trigger).toBeFocused();
});
