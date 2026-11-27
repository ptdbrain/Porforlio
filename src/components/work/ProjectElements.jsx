export function ProjectMeta({project,t}) {
  const categories=Array.isArray(project.category)?project.category:[project.category];
  return <div className="project-meta"><span>{categories.join(' / ').toUpperCase()}</span><span>{t.repoYear} / {project.year}</span><span className={`project-status status-${project.status}`}>{t[project.status] || project.status}</span></div>;
}
