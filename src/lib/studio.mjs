export const foldSearch = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
export function filterProjects(projects, {category='all',technology='',query=''}={}) {
  const terms=foldSearch(query).trim().split(/\s+/).filter(Boolean);
  return projects.filter(project => {
    const categories=Array.isArray(project.category)?project.category:[project.category];
    const text=foldSearch([project.title,...Object.values(project.description),...Object.values(project.problem),...Object.values(project.role),...project.stack].join(' '));
    return (category==='all'||categories.includes(category)) && (!technology||project.stack.includes(technology)) && terms.every(term=>text.includes(term));
  });
}
export function getCategories(projects) {return [...new Set(projects.flatMap(p=>Array.isArray(p.category)?p.category:[p.category]))];}
export function capabilityProjects(capability,projects) {return projects.filter(project=>capability.projects.includes(project.slug));}
