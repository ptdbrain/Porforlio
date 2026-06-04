import data from './portfolioData.json';

export const { categoryOptions, contactConfig, portfolioContent, projects } = data;

export function getProjectsByCategory(category) {
  if (category === 'all') return projects;
  return projects.filter((project) => project.categories.includes(category));
}

export function getVisibleContactLinks(config = contactConfig) {
  return Object.entries(config)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => ({ key, value }));
}
