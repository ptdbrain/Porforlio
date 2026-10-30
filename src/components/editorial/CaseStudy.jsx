import { useState } from 'react';
import { localize as l } from '../../content/copy';
import { Arrow, Contact, EmptyText, ExternalLink, Photo, RouteLink, SectionTitle } from './Shared';
import { ProjectMeta } from '../work/ProjectElements';
import { studioCopy } from '../../content/studioCopy';
import cinema from '../../content/cinema.json';
import { cinemaCopy } from '../../content/cinemaCopy';
import { CinemaFrame } from '../cinema/CinemaFrame';

function Architecture({ project, language, t }) {
  const [active,setActive] = useState(0);
  return <div className="architecture-diagram"><p>{t.technicalNotes}</p><div className="architecture-nodes">{project.pipeline.map((node,index) => <button key={index} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index+1}</span><strong>{node.title}</strong><i aria-hidden="true">→</i></button>)}</div><p className="architecture-detail" aria-live="polite">{l(project.pipeline[active].detail,language)}</p></div>;
}

export function CaseStudy({ project, data, language, t }) {
  const s = studioCopy[language];
  const hasDecisions = project.technicalDecisions?.length > 0;
  const hasFailures = Boolean(l(project.failedExperiments,language));
  const next = data.projects[(data.projects.findIndex(p => p.slug === project.slug)+1)%data.projects.length];
  const overview=language==='vi'?'Giới thiệu dự án':'Project overview';
  const sections=[['overview',overview],['problem',t.problem],['contribution',t.contribution],['architecture',t.architecture],['implementation',t.implementation],...(hasDecisions?[['decisions',s.decisions]]:[]),['results',t.results],...(hasFailures?[['failures',s.failures]]:[]),['lessons',t.lessons],['links',t.links]];
  const format=cinema.featured.find(item=>item.slug===project.slug)?.format||'article';
  return <div className={`cinema-case case-${format}`}>
    <section className="case-hero page-width"><RouteLink href="/work#selected-work" className="back-link">← {t.backWork}</RouteLink><ProjectMeta project={project} language={language} t={t} /><h1 className="intro-in">{project.title}<span className="accent-dot">.</span></h1><p className="case-subtitle intro-in">{l(project.subtitle,language)}</p><div className="case-meta-grid"><div><span className="eyebrow">{t.role}</span><p>{l(project.role,language) || '—'}</p></div><div><span className="eyebrow">{t.periodPending}</span><p>{project.period || '—'}</p></div><div><span className="eyebrow">STACK</span><p>{project.stack.join(' / ')}</p></div></div><div className="case-cover"><CinemaFrame project={project} language={language} c={cinemaCopy[language]} priority/></div></section>
    <div className="case-layout page-width"><nav className="case-toc" aria-label={t.caseStudy}>{sections.map(([id,label],index) => <a href={`#${id}`} key={id}><span>0{index+1}</span>{label}</a>)}</nav><div className="case-content">
      <section id="overview" data-reveal><span className="eyebrow">PROJECT OVERVIEW</span><h2>{overview}</h2><p className="case-body-lead">{l(project.description,language)}</p></section>
      <section id="problem" data-reveal><span className="eyebrow">01 / CONTEXT</span><h2>{t.problem}</h2><p className="case-body-lead">{l(project.problem,language)}</p></section>
      <section id="contribution" data-reveal><span className="eyebrow">02 / CONTRIBUTION</span><h2>{t.contribution}</h2>{l(project.role,language) && <p>{l(project.role,language)}</p>}<EmptyText value={project.personalContribution} language={language} label={t.contributionPending} /></section>
      <section id="architecture" data-reveal><span className="eyebrow">03 / SYSTEM DESIGN</span><h2>{t.architecture}</h2><Architecture project={project} language={language} t={t} /></section>
      <section id="implementation" data-reveal><span className="eyebrow">04 / BUILD</span><h2>{t.implementation}</h2><p>{l(project.implementation,language)}</p><ul className="tags">{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul>{project.media.gallery.length > 0 && <div className="case-gallery">{project.media.gallery.map((asset,index) => <Photo key={index} asset={asset} label={project.title} language={language} t={t} />)}</div>}</section>
      {hasDecisions && <section id="decisions" data-reveal><span className="eyebrow">TECHNICAL CHOICES</span><h2>{s.decisions}</h2><div className="technical-decisions">{project.technicalDecisions.map((decision,index) => <article key={index}><h3>{l(decision.title,language)}</h3>{[['why',s.why],['alternatives',s.alternatives],['tradeoffs',s.tradeoffs]].map(([key,label]) => l(decision[key],language) && <div key={key}><h4>{label}</h4><p>{l(decision[key],language)}</p></div>)}</article>)}</div></section>}
      <section id="results" data-reveal><span className="eyebrow">05 / EVIDENCE</span><h2>{t.results}</h2><p>{l(project.result,language)}</p>{project.metrics.length ? <div className="metric-grid">{project.metrics.map((metric,index) => <div key={index}><strong>{metric.value}</strong><span>{l(metric.label,language)}</span>{metric.context && <p>{l(metric.context,language)}</p>}</div>)}</div> : <EmptyText language={language} label={t.resultsPending} />}{project.media.video && <video controls preload="none" poster={project.media.cover || undefined} aria-label={`${project.title} / ${t.video}`}><source src={project.media.video} /><a href={project.media.video}>{t.video}</a></video>}<aside className="project-limitation"><h3>{t.limitations}</h3><p>{l(project.constraints,language)}</p></aside></section>
      {hasFailures && <section id="failures" data-reveal><h2>{s.failures}</h2><p>{l(project.failedExperiments,language)}</p></section>}
      <section id="lessons" data-reveal><span className="eyebrow">06 / REFLECTION</span><h2>{t.lessons}</h2><EmptyText value={project.lessons} language={language} label={t.lessonsPending} />{l(project.nextSteps,language) && <><h3>{s.nextSteps}</h3><p>{l(project.nextSteps,language)}</p></>}</section>
      <section id="links" data-reveal><span className="eyebrow">07 / EXPLORE</span><h2>{t.links}</h2><div className="case-links">{project.links.github&&<ExternalLink className="button button-accent" href={project.links.github}>{t.sourceCode}</ExternalLink>}{project.links.demo && <ExternalLink className="button button-outline" href={project.links.demo}>{t.liveDemo}</ExternalLink>}{project.links.report && <ExternalLink className="button button-outline" href={project.links.report}>{t.report}</ExternalLink>}</div><div className="case-sources"><h3>{t.sourceLabel}</h3><ul>{(project.sources?.length?project.sources:[{label:'GitHub',href:project.source}]).map(source=><li key={source.href}><ExternalLink href={source.href}>{source.label}</ExternalLink></li>)}</ul>{project.repositoryReview?.checkedAt&&<p>{language==='vi'?'Đối chiếu nội dung':'Content reviewed'}: {project.repositoryReview.checkedAt}{project.repositoryReview.access==='local-checkout'&&(language==='vi'?' · Mã PRISM được đọc từ checkout local; repo công khai chưa truy cập được.':' · PRISM code reviewed from a local checkout; its public repository was inaccessible.')}</p>}</div></section>
    </div></div>
    <div className="page-width"><RouteLink className="next-project" href={`/projects/${next.slug}`}><span className="eyebrow">{t.nextProject}</span><strong>{next.title}</strong><Arrow /></RouteLink><Contact data={data} language={language} t={t} branch="work" /></div>
  </div>;
}
