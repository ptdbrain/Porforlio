import { useState } from 'react';
import { localize as l } from '../../content/copy';
import { Arrow, Contact, EmptyText, ExternalLink, Photo, RouteLink, SectionTitle } from './Shared';
import { ProjectMeta } from './Work';

function Architecture({ project, language, t }) {
  const [active,setActive] = useState(0);
  return <div className="architecture-diagram"><p>{t.technicalNotes}</p><div className="architecture-nodes">{project.pipeline.map((node,index) => <button key={index} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index+1}</span><strong>{node.title}</strong><i aria-hidden="true">→</i></button>)}</div><p className="architecture-detail" aria-live="polite">{l(project.pipeline[active].detail,language)}</p></div>;
}

export function CaseStudy({ project, data, language, t }) {
  const next = data.projects[(data.projects.findIndex(p => p.slug === project.slug)+1)%data.projects.length];
  const sections=[['problem',t.problem],['contribution',t.contribution],['architecture',t.architecture],['implementation',t.implementation],['results',t.results],['lessons',t.lessons],['links',t.links]];
  return <>
    <section className="case-hero page-width"><RouteLink href="/work#selected-work" className="back-link">← {t.backWork}</RouteLink><ProjectMeta project={project} language={language} t={t} /><h1 className="intro-in">{project.title}<span className="accent-dot">.</span></h1><p className="case-subtitle intro-in">{l(project.subtitle,language)}</p><div className="case-meta-grid"><div><span className="eyebrow">{t.role}</span><p>{l(project.role,language) || '—'}</p></div><div><span className="eyebrow">{t.periodPending}</span><p>{project.period || '—'}</p></div><div><span className="eyebrow">STACK</span><p>{project.stack.join(' / ')}</p></div></div><Photo asset={{src:project.media.cover,alt:project.media.alt}} label={`${project.title} / ${t.cover}`} code="PROJECT OVERVIEW" language={language} t={t} className="case-cover" priority /></section>
    <div className="case-layout page-width"><nav className="case-toc" aria-label={t.caseStudy}>{sections.map(([id,label],index) => <a href={`#${id}`} key={id}><span>0{index+1}</span>{label}</a>)}</nav><div className="case-content">
      <section id="problem" data-reveal><span className="eyebrow">01 / CONTEXT</span><h2>{t.problem}</h2><p className="case-body-lead">{l(project.problem,language)}</p></section>
      <section id="contribution" data-reveal><span className="eyebrow">02 / CONTRIBUTION</span><h2>{t.contribution}</h2>{l(project.role,language) && <p>{l(project.role,language)}</p>}<EmptyText value={project.personalContribution} language={language} label={t.contributionPending} /></section>
      <section id="architecture" data-reveal><span className="eyebrow">03 / SYSTEM DESIGN</span><h2>{t.architecture}</h2><Architecture project={project} language={language} t={t} /></section>
      <section id="implementation" data-reveal><span className="eyebrow">04 / BUILD</span><h2>{t.implementation}</h2><p>{l(project.implementation,language)}</p><ul className="tags">{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul></section>
      <section id="results" data-reveal><span className="eyebrow">05 / EVIDENCE</span><h2>{t.results}</h2><p>{l(project.result,language)}</p>{project.metrics.length ? <div className="metric-grid">{project.metrics.map((metric,index) => <div key={index}><strong>{metric.value}</strong><span>{l(metric.label,language)}</span>{metric.context && <p>{l(metric.context,language)}</p>}</div>)}</div> : <EmptyText language={language} label={t.resultsPending} />}{project.media.gallery.length > 0 && <div className="case-gallery">{project.media.gallery.map((asset,index) => <Photo key={index} asset={asset} label={project.title} language={language} t={t} />)}</div>}{project.media.video && <video controls preload="none" poster={project.media.cover || undefined} aria-label={`${project.title} / ${t.video}`}><source src={project.media.video} /><a href={project.media.video}>{t.video}</a></video>}<aside className="project-limitation"><h3>{t.limitations}</h3><p>{l(project.constraints,language)}</p></aside></section>
      <section id="lessons" data-reveal><span className="eyebrow">06 / REFLECTION</span><h2>{t.lessons}</h2><EmptyText value={project.lessons} language={language} label={t.lessonsPending} /></section>
      <section id="links" data-reveal><span className="eyebrow">07 / EXPLORE</span><h2>{t.links}</h2><div className="case-links"><ExternalLink className="button button-accent" href={project.links.github}>{t.sourceCode}</ExternalLink>{project.links.demo && <ExternalLink className="button button-outline" href={project.links.demo}>{t.liveDemo}</ExternalLink>}{project.links.report && <ExternalLink className="button button-outline" href={project.links.report}>{t.report}</ExternalLink>}</div><p className="case-source">{t.sourceLabel}: <ExternalLink href={project.source}>GitHub README</ExternalLink></p></section>
    </div></div>
    <div className="page-width"><RouteLink className="next-project" href={`/projects/${next.slug}`}><span className="eyebrow">{t.nextProject}</span><strong>{next.title}</strong><Arrow /></RouteLink><Contact data={data} language={language} t={t} branch="work" /></div>
  </>;
}
