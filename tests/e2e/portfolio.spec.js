const {test,expect}=require('@playwright/test');
const AxeBuilder=require('@axe-core/playwright').default;
const data=require('../../src/content/portfolio.json');

async function openMenu(page){const menu=page.getByRole('button',{name:'Mở menu'});if(await menu.isVisible())await menu.click();}

test('home selects either journey, navigates without reload and supports browser Back',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Trọng Đạt');
  await page.evaluate(()=>window.__navigationMarker='same-document');
  await page.locator('.hero-actions').getByRole('link',{name:'Khám phá công việc'}).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator('h1')).toContainText('ĐIỀU THẬT');
  expect(await page.evaluate(()=>window.__navigationMarker)).toBe('same-document');
  await openMenu(page);await page.locator('.main-nav').getByRole('link',{name:'Cá nhân',exact:true}).click();
  await expect(page.locator('h1')).toContainText('ngoài màn hình');
  await page.goBack();await expect(page.locator('h1')).toContainText('ĐIỀU THẬT');
  await page.goBack();await expect(page.locator('h1')).toContainText('Trọng Đạt');
  expect(errors).toEqual([]);
});

test('both photo choices link to the correct journeys',async({page})=>{
  await page.goto('/');
  await page.locator('.story-choice-personal').click();
  await expect(page).toHaveURL(/\/personal$/);
  await expect(page.locator('.life-chapter')).toHaveCount(4);
  await page.goto('/');await page.locator('.story-choice-work').click();
  await expect(page.locator('.product-film,.research-motion,.interactive-world')).toHaveCount(3);
});

test('language switch updates content, metadata and persists across routes and reload',async({page})=>{
  await page.goto('/');await page.getByRole('button',{name:'Switch to English'}).click();
  await expect(page.locator('html')).toHaveAttribute('lang','en');
  await expect(page.locator('.hero-statement')).toContainText('intelligent systems');
  await page.locator('.hero-actions').getByRole('link',{name:'Explore my work'}).click();
  await expect(page.locator('h1')).toContainText('REAL THINGS');
  await page.reload();await expect(page.locator('h1')).toContainText('REAL THINGS');
  await expect(page).toHaveTitle(/Work.*Phan Trọng Đạt/);
  await page.getByRole('button',{name:'Chuyển sang tiếng Việt'}).click();
  await expect(page.locator('html')).toHaveAttribute('lang','vi');
});

test('project index combines category, stack and accent-insensitive search',async({page})=>{
  await page.goto('/work');const archive=page.locator('#archive');
  await expect(archive.locator('.cinema-index-entry')).toHaveCount(data.projects.length);
  await archive.getByRole('combobox',{name:'Danh mục'}).selectOption('research');
  await expect(archive.locator('.cinema-index-entry')).toHaveCount(2);
  await archive.getByRole('combobox',{name:'Stack'}).selectOption('MATLAB');
  await expect(archive.locator('.cinema-index-entry')).toHaveCount(1);
  await expect(archive.locator('h3')).toContainText('PSO-Optimize');
  await archive.getByRole('combobox',{name:'Stack'}).selectOption('FastAPI');
  await expect(archive.locator('.cinema-index-entry')).toHaveCount(0);
  await archive.getByRole('button',{name:'Xóa bộ lọc'}).click();
  await archive.getByRole('searchbox',{name:'Tìm dự án'}).fill('medtutor');
  await expect(archive.locator('.cinema-index-entry')).toHaveCount(1);
});

test('selected works replace the abstract skills menu with project evidence',async({page})=>{
  await page.goto('/work');
  await expect(page.locator('.type-wall,.mobile-skill-scenes,.skills-in-motion')).toHaveCount(0);
  await expect(page.locator('.selected-works')).toHaveCount(1);
  await expect(page.locator('.selected-stage-metadata:not([aria-hidden=true])')).toContainText('MedTutor');
  await page.getByRole('button',{name:'Xem FutureVLA',exact:true}).click();
  await expect(page.locator('.selected-stage-metadata:not([aria-hidden=true])')).toContainText('PyTorch');
  await expect(page.locator('.selected-stage-link')).toHaveAttribute('href','/projects/future-vla');
});

test('case study is directly addressable and its architecture is interactive',async({page})=>{
  await page.goto('/projects/medtutor');
  await expect(page.locator('h1')).toHaveText('MedTutor.');
  for(const id of ['problem','contribution','architecture','implementation','results','lessons','links'])await expect(page.locator(`#${id}`)).toBeAttached();
  await page.getByRole('button',{name:'03 Retrieve'}).click();
  await expect(page.locator('.architecture-detail')).toContainText('Dense + BM25');
  await expect(page.locator('.case-source a')).toHaveAttribute('href',/github.com\/ptdbrain\/med-bot/);
  await page.reload();await expect(page).toHaveTitle(/MedTutor/);
  await page.locator('.back-link').click();await expect(page).toHaveURL(/\/work#selected-work$/);
});

test('missing content stays intentional and contact links are actionable',async({page,context})=>{
  await page.goto('/personal');await expect(page.locator('.personal-bio')).toContainText('sẽ được bổ sung');
  expect(await page.locator('img[src=""]').count()).toBe(0);
  await expect(page.locator('.training-card')).toContainText('Đã hoàn thành');
  await page.goto('/contact');
  await expect(page.getByRole('link',{name:'LinkedIn'})).toHaveAttribute('href',data.identity.linkedin);
  await expect(page.locator('.email-link')).toHaveAttribute('href',`mailto:${data.identity.email}`);
  await expect(page.locator('.text-cv')).toHaveAttribute('aria-disabled','true');
  await context.grantPermissions(['clipboard-read','clipboard-write']);
  await page.getByRole('button',{name:'Sao chép email'}).click();
  await expect(page.getByRole('button',{name:'Đã sao chép'})).toBeVisible();
  expect(await page.evaluate(()=>navigator.clipboard.readText())).toBe(data.identity.email);
});

test('personal retains the photo timeline while work has independent non-sticky showcases',async({page},info)=>{
  test.skip(info.project.name==='mobile','Personal uses an ordinary vertical layout on mobile.');
  await page.goto('/personal');await page.locator('#chapter-university').scrollIntoViewIfNeeded();
  await expect(page.locator('.timeline-caption')).toContainText('Đại học');
  await page.goto('/work');
  await expect(page.locator('.selected-showcase,.showcase-sticky,.skill-evidence')).toHaveCount(0);
  expect(await page.locator('main').evaluate(root=>[...root.querySelectorAll('*')].filter(node=>getComputedStyle(node).position==='sticky').length)).toBe(0);
});

for(const route of ['/','/work','/personal','/projects/parking-ai','/contact']){
  test(`no horizontal overflow or serious accessibility violations at ${route}`,async({page})=>{
    await page.goto(route);await page.evaluate(()=>document.fonts.ready);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
    const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  });
}

test('prerendered case studies have correct HTML and OG metadata before JavaScript',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,reducedMotion:'reduce'});const page=await context.newPage();
  await page.goto('http://127.0.0.1:4174/projects/parking-ai');
  await expect(page.locator('h1')).toHaveText('ParkingAI.');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content',/ParkingAI/);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content','article');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',/\/projects\/parking-ai$/);
  await page.getByRole('link',{name:/Trở lại Work/}).click();await expect(page.locator('h1')).toContainText('ĐIỀU THẬT');await context.close();
});

test('all project links and static pages resolve without a client-only fallback',async({request})=>{
  for(const project of data.projects){const response=await request.get(`/projects/${project.slug}`);expect(response.ok()).toBe(true);expect(await response.text()).toContain(`<title>${project.title}`);}
  expect((await request.get('/sitemap.xml')).ok()).toBe(true);expect((await request.get('/robots.txt')).ok()).toBe(true);
  const response=await request.get('/404.html');expect(await response.text()).toContain('noindex, follow');
});

test('unknown route renders an accessible not-found page and can return home',async({page})=>{
  await page.goto('/a-page-that-does-not-exist');await expect(page.locator('h1')).toContainText('chưa có trong câu chuyện');
  await page.getByRole('link',{name:'Về trang chủ'}).click();await expect(page.locator('h1')).toContainText('Trọng Đạt');
});
