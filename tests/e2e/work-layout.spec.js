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

test('four broad areas lead with responsibilities and projects stay optional',async({page})=>{
 await page.goto('/work');
 await expect(page.getByRole('tab')).toHaveCount(4);
 await expect(page.locator('.v4-project-index')).not.toHaveAttribute('open');
 await expect(page.getByRole('searchbox',{name:'Tìm dự án'})).toBeHidden();
 await expect(page.locator('.v4-filters,.v4-search-tools select,.v4-tool-list')).toHaveCount(0);
 for(const tab of await page.getByRole('tab').all()){
  await tab.click();
  await expect(page.getByRole('tabpanel').locator('.v4-cap-layer.is-active .capability-responsibilities li')).toHaveCount(3);
  await expect(page.getByRole('tabpanel')).toContainText('PHẦN VIỆC TÔI THỰC HIỆN');
 }
 await page.getByRole('button',{name:'Xem dự án liên quan'}).click();
 await expect(page.locator('.v4-project-index')).toHaveAttribute('open','');
 await expect(page.locator('.v4-count')).toHaveAttribute('data-work-filter','research');
 await page.locator('.v4-project-index>summary').focus();await page.keyboard.press('Enter');
 await expect(page.locator('.v4-project-index')).not.toHaveAttribute('open');
 await expect(page.locator('.v4-project-index>summary')).toBeFocused();
});
