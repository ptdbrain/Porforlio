import data from './portfolioData.json';

export const { categoryOptions, contactConfig, portfolioContent, projects } = data;

export function getProjectsByCategory(category) {
  if (category === 'all') return projects;
  return projects.filter((project) => project.categories.includes(category));
}

export function getVisibleContactLinks(config = contactConfig) {
  return config.filter((item) => item.featured || Boolean(item.href));
}
