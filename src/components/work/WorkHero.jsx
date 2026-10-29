import { Arrow, CvLink, RouteLink } from '../editorial/Shared';
import { localize as l } from '../../content/copy';
import { BuildPhoto } from './ProjectElements';

export function WorkHero({data,studio,language,t,s}) {
  const featured=studio.featured.map(item=>data.projects.find(p=>p.slug===item.slug)).filter(Boolean);
  return <section className="studio-hero page-width" aria-labelledby="studio-title">
    <div className="studio-hero-top"><span className="eyebrow">01 / THE BUILD STUDIO</span><span className="eyebrow">{s.heroLabel}</span></div>
    <h1 id="studio-title">{s.heroLines.map((line,index)=><span className="studio-headline-mask" key={line}><span style={{'--line-delay':`${index*100}ms`}}>{line}</span></span>)}</h1>
    <div className="studio-hero-bottom"><div className="hero-actions"><a href="#archive" className="button button-accent">{t.projects}<Arrow /></a><CvLink identity={data.identity} t={t} /></div><p className="studio-focus"><span className="eyebrow">{s.currentFocus}</span>{l(studio.focus,language)}</p></div>
    {studio.availabilityUpdatedAt && l(data.identity.availability,language) && <p className="studio-availability">{s.openTo}: {l(data.identity.availability,language)} / {studio.availabilityUpdatedAt}</p>}
    <div className="studio-visual-strip">{featured.map((project,index)=><RouteLink className="studio-preview" href={`/projects/${project.slug}`} key={project.slug} style={{'--line-delay':`${index*100+150}ms`}} aria-label={`${t.caseStudy}: ${project.title}`}><BuildPhoto project={project} language={language} t={t} priority={index===0}/><span className="strip-caption"><strong>{project.title}</strong><span>{[project.category].flat().join(' / ').toUpperCase()} ↗</span></span></RouteLink>)}</div>
    <a href="#capabilities" className="studio-scroll"><span aria-hidden="true">↓</span>{s.inspect}</a>
  </section>;
}
