const {test,expect}=require('@playwright/test');

test('featured cards show one project name and a readable flow without title posters',async({page})=>{
 await page.goto('/work');
 const cards=page.locator('.featured-study');
 await expect(cards).toHaveCount(4);
 const titles=['LLMFeed','AdverTest','MedTutor','ParkingAI'];
 for(let i=0;i<titles.length;i++){
  const card=cards.nth(i);await expect(card.getByRole('heading',{level:3})).toHaveText(titles[i]);
  expect((await card.innerText()).split(titles[i]).length-1).toBe(1);
  await expect(card.locator('.project-flow-nodes>li')).toHaveCount(4);
  await expect(card.locator('.project-visual img')).toHaveCount(0);
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

test('vertical capability navigation supports Up/Down and keeps the selected output accessible',async({page})=>{
 await page.goto('/work#capabilities');
 await expect(page.getByRole('tablist',{name:'Nhóm năng lực'})).toHaveAttribute('aria-orientation','vertical');
 await page.getByRole('tab',{name:'RAG & LLM'}).focus();await page.keyboard.press('ArrowDown');
 await expect(page.getByRole('tab',{name:'Computer Vision'})).toBeFocused();
 await expect(page.getByRole('tabpanel')).toContainText('YOLO');
 await page.keyboard.press('ArrowDown');await expect(page.getByRole('tab',{name:'Backend & dữ liệu'})).toBeFocused();
 await expect(page.getByRole('tabpanel')).toContainText('PostgreSQL');
 await page.keyboard.press('ArrowUp');await expect(page.getByRole('tab',{name:'Computer Vision'})).toBeFocused();
 await expect(page.locator('.v4-cap-layer:not(.is-active)[inert]')).toHaveCount(3);
 await expect(page.getByRole('tabpanel').getByRole('button')).toHaveCount(1);
});
