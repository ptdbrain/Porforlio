import { localize as l } from '../../content/copy';
import { Arrow, ExternalLink, RouteLink, SectionTitle } from '../editorial/Shared';

export function BuildNotes({data,studio,language,t,s}) {
  return <section className="build-notes page-width section-space" id="inside-build"><SectionTitle eyebrow={s.insideLabel} title={s.inside}>{s.insideLead}</SectionTitle><div className="build-notes-grid">{studio.caseNotes.map((slug,index)=>{const project=data.projects.find(p=>p.slug===slug);return project&&<article className="build-note" key={slug} data-reveal><span className="eyebrow">NOTE / 0{index+1}</span><h3>{project.title}</h3><ol className="note-pipeline">{project.pipeline.map(node=><li key={node.title}>{node.title}</li>)}</ol><p>{l(project.implementation,language)}</p><details><summary>{t.limitations}</summary><p>{l(project.constraints,language)}</p></details><div className="inline-links"><RouteLink href={`/projects/${slug}#implementation`}>{s.readImplementation}<Arrow/></RouteLink><ExternalLink href={project.source}>README</ExternalLink></div></article>;})}</div></section>;
}
