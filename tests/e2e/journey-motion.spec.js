const {test,expect}=require('@playwright/test');

test.beforeEach(async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.addInitScript(()=>{
    localStorage.setItem('ptd-motion','full');
    sessionStorage.setItem('ptd-neural-intro-v2-seen','1');
  });
});

async function aligned(marker,target,vertical=true){
  await expect(marker).toBeVisible();
  await expect.poll(async()=>{
    const a=await marker.boundingBox(),b=await target.boundingBox();
    return Math.abs(vertical?a.y-b.y:a.x-b.x);
  }).toBeLessThan(2);
}

test('selection rail tracks keyboard tabs, translated labels and viewport changes',async({page})=>{
  await page.goto('/work');
  const tabs=page.getByRole('tablist'),marker=tabs.locator('.motion-indicator');
  await tabs.scrollIntoViewIfNeeded();
  await aligned(marker,tabs.getByRole('tab',{selected:true}));
  await tabs.getByRole('tab',{selected:true}).focus();
  await page.keyboard.press('End');
  await aligned(marker,tabs.getByRole('tab').last());
  await expect(tabs.getByRole('tab').last()).toBeFocused();
  await page.getByRole('button',{name:'Switch to English'}).click();
  await aligned(marker,tabs.getByRole('tab',{selected:true}));
  await page.setViewportSize({width:820,height:900});
  await aligned(marker,tabs.getByRole('tab',{selected:true}));
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(marker).toHaveCSS('transition-duration','0s');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('header and case reading indicators remain aligned without intercepting input',async({page,isMobile})=>{
  await page.goto('/personal');
  if(isMobile)await page.getByRole('button',{name:'Mở menu'}).click();
  const nav=page.locator('.main-nav');
  await aligned(nav.locator('.motion-indicator'),nav.locator('a[aria-current]'),isMobile);
  await expect(nav.locator('.motion-indicator')).toHaveCSS('pointer-events','none');
  await page.goto('/projects/medtutor');
  if(!isMobile){
    await page.locator('#architecture').scrollIntoViewIfNeeded();
    const toc=page.locator('.case-toc');
    await expect(toc.locator('a[aria-current]')).toHaveAttribute('href','#architecture');
    await aligned(toc.locator('.motion-indicator'),toc.locator('a[aria-current]'));
  }
});

test('changing motion preference during a pending snapshot still commits the route',async({page})=>{
  await page.addInitScript(()=>{
    const original=document.startViewTransition.bind(document);
    window.releaseRoute=null;
    document.startViewTransition=callback=>original(async()=>{
      await new Promise(resolve=>window.releaseRoute=resolve);
      callback();
    });
  });
  await page.goto('/');
  await page.evaluate(()=>document.querySelector('.main-nav a[href="/work"]').click());
  await expect.poll(()=>page.evaluate(()=>Boolean(window.releaseRoute))).toBe(true);
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('html')).toHaveAttribute('data-motion','simple');
  await page.evaluate(()=>window.releaseRoute());
  await expect(page.locator('.work-v4 h1')).toBeVisible();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator('html')).not.toHaveAttribute('data-route-motion');
  await expect(page.locator('main')).toHaveCSS('transform','none');
});

test('snapshot failure completes navigation through the animated fallback',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{
    document.startViewTransition=callback=>{
      const done=new Promise(resolve=>setTimeout(()=>{callback();resolve();},20));
      return {ready:Promise.reject(new Error('snapshot unavailable')),updateCallbackDone:done,finished:Promise.reject(new Error('transition interrupted')),skipTransition(){}};
    };
  });
  await page.goto('/');
  await page.evaluate(()=>document.querySelector('.main-nav a[href="/personal"]').click());
  await expect(page.locator('.personal-hero h1')).toBeVisible();
  await expect(page.locator('html')).not.toHaveAttribute('data-route-motion');
  await expect(page.locator('main')).toHaveCSS('transform','none');
  expect(errors).toEqual([]);
});

test('keyboard focus reveals all containing sections immediately',async({page})=>{
  await page.goto('/');
  await page.evaluate(()=>{
    const contact=document.querySelector('#contact');
    contact.classList.remove('is-revealed');
    contact.querySelector('a[href^="mailto"]').focus({preventScroll:true});
  });
  await expect(page.locator('#contact')).toHaveClass(/is-revealed/);
  await expect(page.locator('a[href^="mailto"]')).toBeFocused();
  await expect(page.locator('#contact')).toHaveCSS('opacity','1');
});

test('a two-finger photo gesture never becomes a gallery swipe',async({page})=>{
  await page.goto('/personal');
  await page.locator('.sport-gallery .photo-button').first().click();
  const dialog=page.getByRole('dialog'),stage=dialog.locator('.gallery-stage');
  const counter=dialog.locator('.gallery-controls [role=status]'),initial=await counter.textContent();
  await stage.dispatchEvent('pointerdown',{pointerType:'touch',pointerId:1,clientX:260,clientY:200});
  await stage.dispatchEvent('pointerdown',{pointerType:'touch',pointerId:2,clientX:100,clientY:205});
  await stage.dispatchEvent('pointerup',{pointerType:'touch',pointerId:2,clientX:220,clientY:205});
  await stage.dispatchEvent('pointerup',{pointerType:'touch',pointerId:1,clientX:100,clientY:200});
  await expect(counter).toHaveText(initial);
  await stage.dispatchEvent('pointerdown',{pointerType:'touch',pointerId:3,clientX:240,clientY:200});
  await stage.dispatchEvent('pointerup',{pointerType:'touch',pointerId:3,clientX:90,clientY:205});
  await expect(counter).not.toHaveText(initial);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(page.locator('.sport-gallery .photo-button').first()).toBeFocused();
});
