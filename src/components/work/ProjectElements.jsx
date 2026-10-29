import { localize as l } from '../../content/copy';
import { Arrow, ExternalLink, Photo, RouteLink } from '../editorial/Shared';

export function ProjectMeta({project,t}) {
  const categories=Array.isArray(project.category)?project.category:[project.category];
  return <div className="project-meta"><span>{categories.join(' / ').toUpperCase()}</span><span>{t.repoYear} / {project.year}</span><span className={`project-status status-${project.status}`}>{t[project.status] || project.status}</span></div>;
}
export function ProjectFacts({project,outcome,language,t,s}) {
  return <dl className="build-facts"><div><dt>{s.problem}</dt><dd>{l(project.description,language)}</dd></div><div><dt>{t.role}</dt><dd>{l(project.role,language)||'—'}</dd></div><div><dt>{s.outcome}</dt><dd>{l(outcome || project.result,language)}</dd></div></dl>;
}
export function ProjectLinks({project,t,architecture=false,s}) {
  return <div className="build-links"><RouteLink className="button button-accent" href={`/projects/${project.slug}${architecture?'#architecture':''}`}>{architecture?s.viewArchitecture:t.caseStudy}<Arrow /></RouteLink>{project.links.demo && <ExternalLink href={project.links.demo}>{t.liveDemo}</ExternalLink>}{project.links.github&&<ExternalLink href={project.links.github}>{t.sourceCode}</ExternalLink>}</div>;
}
export function BuildPhoto({project,language,t,...props}) {
  return <Photo asset={{src:project.media.cover,alt:project.media.alt}} label={`${project.title} / ${t.cover}`} code={project.slug.toUpperCase()} language={language} t={t} interactive={false} {...props} />;
}
