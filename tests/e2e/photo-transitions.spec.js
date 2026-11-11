const {test,expect}=require('@playwright/test');
const data=require('../../src/content/portfolio.json');
const sport=data.sports[0];
const blockedImage=sport.gallery[1].src;

test.beforeEach(async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.addInitScript(()=>localStorage.setItem('ptd-motion','full'));
});
async function openGallery(page){await page.goto('/personal');await page.locator('.sport-gallery .photo-button').first().click();await expect(page.getByRole('dialog')).toBeVisible();return page.getByRole('dialog');}

test('gallery keeps its image frame stable through six decoded image transitions',async({page})=>{
 const dialog=await openGallery(page),stage=dialog.locator('.gallery-stage');
 const size=await stage.evaluate(node=>({w:node.offsetWidth,h:node.offsetHeight}));
 for(const effect of ['slide','book','iris','curtain','zoom','tilt']){
  await dialog.getByRole('button',{name:'Ảnh tiếp theo'}).click();
  await expect(stage).toHaveAttribute('data-transition',effect);
  await expect(stage).toHaveAttribute('aria-busy','false');
  expect(await dialog.locator('.gallery-layer-current img').evaluate(node=>node.complete&&node.naturalWidth>0)).toBe(true);
  expect(await stage.evaluate(node=>({w:node.offsetWidth,h:node.offsetHeight}))).toEqual(size);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
 await page.keyboard.press('Escape');await expect(dialog).toHaveCount(0);
 await expect(page.locator('.sport-gallery .photo-button').first()).toBeFocused();
});

test('a slow image never replaces a more recent selection',async({page})=>{
 let held;await page.route(`**${blockedImage}`,route=>{held=route;});
 const dialog=await openGallery(page),current=dialog.locator('.gallery-layer-current img');
 const original=await current.getAttribute('src');
 await dialog.getByRole('button',{name:'Ảnh tiếp theo'}).click();
 await expect.poll(()=>Boolean(held)).toBe(true);
 await expect(current).toHaveAttribute('src',original);
 await expect(dialog.locator('.gallery-stage')).toHaveAttribute('aria-busy','true');
 await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowLeft');
 await expect(dialog.locator('.gallery-controls [role=status]')).toHaveText('1 / 3');
 await expect(current).toHaveAttribute('src',sport.image.src);
 const response=page.waitForResponse(url=>url.url().endsWith(blockedImage));await held.continue();await response;
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
 await expect(current).toHaveAttribute('src',sport.image.src);
});

test('failed images preserve the visible photo and navigation recovers',async({page})=>{
 await page.route(`**${blockedImage}`,route=>route.abort());
 const dialog=await openGallery(page),original=await dialog.locator('.gallery-layer-current img').getAttribute('src');
 await dialog.getByRole('button',{name:'Ảnh tiếp theo'}).click();
 await expect(dialog.getByRole('status').filter({hasText:'Không tải được ảnh'})).toBeVisible();
 await expect(dialog.locator('.gallery-layer-current img')).toHaveAttribute('src',original);
 await expect(dialog.locator('.gallery-stage')).toHaveAttribute('aria-busy','false');
 await dialog.getByRole('button',{name:'Ảnh trước'}).click();
 await expect(dialog.locator('.gallery-controls [role=status]')).toHaveText('1 / 3');
});

test('touch gestures and reduced motion retain control of gallery navigation',async({page})=>{
 const dialog=await openGallery(page),stage=dialog.locator('.gallery-stage');
 await stage.dispatchEvent('pointerdown',{pointerType:'touch',isPrimary:true,clientX:240,clientY:200});
 await stage.dispatchEvent('pointerup',{pointerType:'touch',isPrimary:true,clientX:100,clientY:205});
 await expect(dialog.locator('.gallery-controls [role=status]')).toHaveText('3 / 3');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.keyboard.press('ArrowRight');
 await expect(dialog.locator('.gallery-controls [role=status]')).toHaveText('1 / 3');
 await expect(stage.locator('.gallery-layer-previous')).toHaveCount(0);
 expect(await stage.evaluate(node=>node.getAnimations({subtree:true}).filter(animation=>animation.playState==='running').length)).toBe(0);
});
