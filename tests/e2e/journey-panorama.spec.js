const {test,expect}=require('@playwright/test');

test.beforeEach(async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
});
async function phase(page,index,value){
 const cinema=page.locator('.journey-cinema').nth(index);
 await cinema.evaluate((node,value)=>{
  const mobile=innerWidth<=760,top=mobile?120:146;
  const start=innerHeight*.88,end=top+40;
  const target=start-(start-end)*value;
  scrollTo({top:node.getBoundingClientRect().top+scrollY-target,behavior:'instant'});
 },value);
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 await expect.poll(()=>cinema.locator('.journey-photo-flight').evaluate(node=>node.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
}

test('compact chapter cards keep desktop crossovers and avoid a mobile poster gate',async({page,isMobile})=>{
 await page.goto('/personal');await page.evaluate(()=>document.fonts.ready);
 await expect(page.locator('.journey-panorama')).toHaveCSS('display','block');
 for(const index of[0,1]){
  const board=page.locator('.journey-board').nth(index),photo=board.locator('.journey-photo-flight'),title=board.locator('.journey-title-flight');
  const size=await page.locator('[data-chapter]').nth(index).evaluate(node=>node.offsetHeight);
  await phase(page,index,.02);
  const p0=await photo.boundingBox(),t0=await title.boundingBox(),b=await board.boundingBox();
  await phase(page,index,.98);
  const p1=await photo.boundingBox(),t1=await title.boundingBox();
  if(isMobile){
   expect(p1.width).toBeLessThan(b.width*.4);
   await expect(board).toHaveCSS('position','relative');
   expect(await board.locator('..').evaluate(node=>node.offsetHeight)).toBeLessThan(b.height+4);
  }else{
   expect(Math.abs(p1.x-p0.x)).toBeGreaterThan(b.width*.38);
   expect(Math.abs(t1.x-t0.x)).toBeGreaterThan(b.width*.24);
   expect(Math.sign(p1.x-p0.x)).toBe(index===0?1:-1);
   expect(Math.sign(t1.x-t0.x)).toBe(index===0?-1:1);
  }
  expect(await page.locator('[data-chapter]').nth(index).evaluate(node=>node.offsetHeight)).toBe(size);
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('chapter anchors and static mode keep the full story reachable',async({page})=>{
 await page.goto('/personal#life-timeline');
 for(const id of['university','secondary','high-school']){
  await page.locator(`.timeline-markers a[href="#chapter-${id}"]`).click();
  await expect(page.locator('.life-chapter.is-active')).toHaveAttribute('id',`chapter-${id}`);
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.journey-panorama')).not.toHaveClass(/journey-cinematic/);
 for(const board of await page.locator('.journey-board').all())await expect(board).toHaveCSS('position','relative');
 for(const image of await page.locator('.journey-board .photo img').all()){
  await image.scrollIntoViewIfNeeded();await expect(image).toBeVisible();
 }
 await expect(page.locator('#chapter-high-school')).toContainText('THPT Chuyên Vĩnh Phúc');
 await expect(page.locator('#chapter-high-school a[href*="odaychuyenvinhphuc"]')).toHaveCount(1);
});

test('main photo gallery is usable on desktop and mobile and preserves focus',async({page})=>{
 await page.goto('/personal');await phase(page,1,.5);
 const trigger=page.locator('#chapter-high-school .journey-board .photo-button');
 await trigger.focus();await expect(page.locator('#chapter-high-school .journey-photo-flight')).toHaveCSS('z-index','5');
 await trigger.click();await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(trigger).toBeFocused();
});

test('the wide photo strip yields to keyboard and manual horizontal browsing',async({page})=>{
 await page.goto('/personal');
 const gallery=page.locator('#chapter-high-school .journey-gallery-window');
 await gallery.scrollIntoViewIfNeeded();await gallery.focus();
 await expect(gallery).toHaveAttribute('data-manual','true');
 const end=await gallery.evaluate(node=>{node.scrollLeft=node.scrollWidth-node.clientWidth;return node.scrollWidth-node.clientWidth;});
 expect(end).toBeGreaterThanOrEqual(0);
 await expect.poll(()=>gallery.evaluate(node=>node.scrollLeft)).toBeCloseTo(end,0);
 await page.evaluate(()=>scrollBy({top:100,behavior:'instant'}));
 await expect.poll(()=>gallery.evaluate(node=>node.scrollLeft)).toBeCloseTo(end,0);
 await gallery.locator('.photo-button').last().focus();
 await expect(gallery.locator('.photo-button').last()).toBeFocused();
});

test('school and story are visible with a smaller image before completing the transition',async({page,isMobile})=>{
 await page.goto('/personal');await page.evaluate(()=>document.fonts.ready);
 for(const index of[0,1,2]){
  await page.locator('.journey-cinema').nth(index).evaluate(node=>scrollTo({top:node.getBoundingClientRect().top+scrollY-(innerWidth<=760?136:162),behavior:'instant'}));
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  const card=page.locator('.journey-board').nth(index),cinema=page.locator('.journey-cinema').nth(index);
  await expect(card.locator('.chapter-school')).toBeVisible();
  await expect(card.locator('.journey-story')).toBeVisible();
  const sizes=await card.evaluate(node=>{
   const board=node.getBoundingClientRect(),story=node.querySelector('.journey-story').getBoundingClientRect(),photo=node.querySelector('.journey-photo-flight').getBoundingClientRect();
   return {height:board.height,width:board.width,top:board.top,bottom:board.bottom,storyBottom:story.bottom,storyTop:story.top,photoWidth:photo.width};
  });
  expect(sizes.photoWidth).toBeLessThan(sizes.width*.4);
  expect(sizes.storyBottom).toBeLessThanOrEqual(sizes.bottom+1);
  expect(sizes.storyTop).toBeGreaterThanOrEqual(sizes.top);
  expect(sizes.bottom).toBeLessThanOrEqual((await page.viewportSize()).height+1);
  const extra=await cinema.evaluate(node=>node.offsetHeight-node.querySelector('.journey-board').offsetHeight);
  expect(extra).toBeLessThanOrEqual(2);
 }
});
