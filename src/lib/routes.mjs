export function resolveRoute(pathname, projects) {
  let decoded;
  try { decoded = decodeURI(pathname); } catch { return { kind: 'not-found', path: pathname }; }
  const path = decoded.replace(/\/+$/, '') || '/';
  if (path === '/') return { kind: 'home', path };
  if (path === '/work' || path === '/personal' || path === '/contact') return { kind: path.slice(1), path };
  if (path.startsWith('/projects/')) {
    const project = projects.find(item => `/projects/${item.slug}` === path);
    if (project) return { kind: 'project', path, project };
  }
  return { kind: 'not-found', path };
}

export function routeMetadata(route, data, language = 'vi') {
  const en = language === 'en';
  const suffix = 'Phan Trọng Đạt · PTD.';
  const descriptions = {
    home: en ? 'One person. Two stories. Explore the work and personal journey of Phan Trong Dat: AI engineering, computer vision and RAG/LLM.' : 'Một con người, hai câu chuyện. Khám phá công việc và hành trình cá nhân của Phan Trọng Đạt: AI Engineering, Computer Vision và RAG/LLM.',
    work: en ? 'Projects, engineering case studies, research and professional training by Phan Trong Dat.' : 'Dự án, case study kỹ thuật, nghiên cứu và đào tạo chuyên môn của Phan Trọng Đạt.',
    personal: en ? 'The personal story of Phan Trong Dat: education, milestones, interests and the chapters ahead.' : 'Câu chuyện cá nhân của Phan Trọng Đạt: học tập, cột mốc, sở thích và những chương tiếp theo.',
    contact: en ? 'Connect with Phan Trong Dat through email, GitHub and LinkedIn.' : 'Kết nối với Phan Trọng Đạt qua email, GitHub và LinkedIn.',
    'not-found': en ? 'Page not found.' : 'Không tìm thấy trang.',
  };
  const titles = {home: en ? 'One Person. Two Stories.' : 'Một con người. Hai câu chuyện.', work: 'Work', personal: 'Personal', contact: en ? 'Contact' : 'Liên hệ', 'not-found': '404'};
  return {
    title: `${route.project?.title || titles[route.kind]} | ${suffix}`,
    description: route.project ? route.project.description[language] : descriptions[route.kind],
    image: route.project?.media.cover || data.assets.hero.src || '',
    type: route.kind === 'project' ? 'article' : 'website',
    path: route.path,
  };
}
