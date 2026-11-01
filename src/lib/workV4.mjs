import { capabilities, priorityProjects } from '../content/workV4.mjs';
import { filterProjects } from './studio.mjs';

export const workReturnKey = 'ptd-work-v4-return';
export const initialWorkView = { capability:'rag', filter:'all', query:'', technology:'', expanded:false };

export function normalizeWorkView(value, projects) {
  const validId = id => capabilities.some(cap => cap.id === id);
  const view = value && typeof value === 'object' ? value : {};
  return {
    capability:validId(view.capability) ? view.capability : 'rag',
    filter:view.filter === 'all' || validId(view.filter) ? view.filter : 'all',
    query:typeof view.query === 'string' ? view.query.slice(0, 250) : '',
    technology:projects.some(project => project.stack.includes(view.technology)) ? view.technology : '',
    expanded:view.expanded === true,
  };
}

export function workProjects(projects, view) {
  const cap = capabilities.find(item => item.id === view.filter);
  return filterProjects(projects, {query:view.query, technology:view.technology})
    .filter(project => !cap || cap.projects.includes(project.slug))
    .sort((a, b) => {
      const rank = project => priorityProjects.includes(project.slug) ? priorityProjects.indexOf(project.slug) : priorityProjects.length;
      return rank(a) - rank(b);
    });
}
