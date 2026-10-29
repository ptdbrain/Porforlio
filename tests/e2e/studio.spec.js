const {test,expect}=require('@playwright/test');

test('capability bento opens evidence and highlights related builds without moving the page',async({page})=>{
  await page.goto('/work');
  const trigger=page.getByRole('button',{name:/NLP \/ LLM Systems/});
  await trigger.scrollIntoViewIfNeeded();const top=await page.evaluate(()=>scrollY);
  await trigger.click();await expect(trigger).toHaveAttribute('aria-expanded','true');
  const panel=page.locator('#capability-retrieval');
  await expect(panel.getByRole('link',{name:'MedTutor'})).toHaveAttribute('href','/projects/medtutor#implementation');
  await expect(panel.getByRole('link',{name:'LabGuard'})).toBeVisible();
  await expect(page.locator('[data-featured-format="flagship"]')).toHaveAttribute('data-capability-match','true');
  expect(Math.abs(await page.evaluate(()=>scrollY)-top)).toBeLessThan(5);
  await trigger.click();await expect(panel).toBeHidden();
});

test('featured layouts are distinct and blueprint nodes update their technical drawer',async({page})=>{
  await page.goto('/work');
  for(const format of ['flagship','blueprint','reel'])await expect(page.locator(`[data-featured-format="${format}"]`)).toHaveCount(1);
  await page.locator('.blueprint-nodes').getByRole('button',{name:/Events/}).click();
  await expect(page.locator('.blueprint-drawer')).toContainText('Schema · event queue');
  await expect(page.locator('.blueprint-node-wrap').nth(2).locator('button')).toHaveAttribute('aria-expanded','true');
  await page.locator('.featured-blueprint').getByRole('link',{name:'Xem kiến trúc đầy đủ'}).click();
  await expect(page).toHaveURL(/\/projects\/parking-ai#architecture$/);
});

test('demo reel tabs, previous/next and arrow keys change actual content without autoplay',async({page})=>{
  await page.goto('/work');
  const reel=page.locator('.featured-reel');
  await reel.getByRole('tab',{name:'03 Kết quả'}).click();
  await expect(reel.getByRole('tabpanel')).toContainText('Prototype hỗ trợ nhiều provider');
  await reel.getByRole('button',{name:'Khung tiếp theo'}).click();
  await expect(reel.getByRole('tab',{name:'04 Công nghệ'})).toHaveAttribute('aria-selected','true');
  await reel.getByRole('button',{name:'Khung trước'}).click();
  await expect(reel.getByRole('tab',{name:'03 Kết quả'})).toHaveAttribute('aria-selected','true');
  await reel.getByRole('tab',{name:'03 Kết quả'}).focus();await page.keyboard.press('Home');
  await expect(reel.getByRole('tab',{name:'01 Tổng quan'})).toHaveAttribute('aria-selected','true');
  await reel.getByRole('tab',{name:'01 Tổng quan'}).focus();await page.keyboard.press('ArrowRight');
  await expect(reel.getByRole('tab',{name:'02 Tương tác'})).toHaveAttribute('aria-selected','true');
  await reel.locator('.reel-stage').focus();await page.keyboard.press('ArrowRight');
  await expect(reel.getByRole('tab',{name:'03 Kết quả'})).toHaveAttribute('aria-selected','true');
  await page.waitForTimeout(600);await expect(reel.getByRole('tab',{name:'03 Kết quả'})).toHaveAttribute('aria-selected','true');
});

test('demo reel supports a horizontal touch gesture and preserves vertical scrolling',async({page},info)=>{
  test.skip(info.project.name!=='mobile','Touch-specific check');
  await page.goto('/work');const stage=page.locator('.reel-stage');await stage.scrollIntoViewIfNeeded();
  const box=await stage.boundingBox();
  const client=await page.context().newCDPSession(page);
  const y=Math.max(110,box.y+Math.min(120,box.height/3));
  const x1=box.x+box.width*.8,x2=box.x+box.width*.2;
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y,id:1}]});
  for(const fraction of [.25,.5,.75,1])await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1+(x2-x1)*fraction,y:y+5,id:1}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await expect(page.getByRole('tab',{name:'02 Tương tác'})).toHaveAttribute('aria-selected','true');
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y,id:1}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1+5,y:y+70,id:1}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await expect(page.getByRole('tab',{name:'02 Tương tác'})).toHaveAttribute('aria-selected','true');
});

test('contribution dossiers expand truthfully and lab notes reveal without invented dates',async({page})=>{
  await page.goto('/work');const dossier=page.locator('.experience-dossier').first();
  await dossier.locator('summary').click();await expect(dossier).toHaveAttribute('open','');
  await expect(dossier.locator('.dossier-body')).toContainText('Product Owner');
  await expect(dossier.locator('.dossier-body a').first()).toHaveAttribute('href','/projects/labguard');
  await expect(dossier.locator('.dossier-type')).toHaveText('Nhóm dự án');
  await expect(page.locator('.lab-board>.lab-column')).toHaveCount(3);
  const entry=page.locator('.lab-entry').first();await entry.locator('summary').click();
  await expect(entry.locator('details')).toHaveAttribute('open','');
  await expect(page.locator('.lab-entry time')).toHaveCount(0);
  await expect(page.locator('.mission-availability')).toHaveCount(0);
  await page.locator('.meet-the-person').click();await expect(page).toHaveURL(/\/personal$/);
});

test('work hero projects CTA opens the library in one action',async({page})=>{
  await page.goto('/work');await page.locator('.studio-hero .hero-actions').getByRole('link',{name:'Dự án'}).click();
  await expect(page).toHaveURL(/#archive$/);
  expect(await page.locator('#archive').evaluate(node=>Math.abs(node.getBoundingClientRect().top)<150)).toBe(true);
});
