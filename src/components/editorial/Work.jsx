import { useEffect, useRef, useState } from 'react';
import { localize as l } from '../../content/copy';
import { Arrow, Contact, CvLink, EmptyText, ExternalLink, Photo, RouteLink, SectionTitle, Training } from './Shared';

export function ProjectMeta({ project, language, t }) {
  return <div className="project-meta"><span>{project.category.toUpperCase()}</span><span>{t.repoYear} / {project.year}</span><span className={`project-status status-${project.status}`}>{t[project.status]}</span></div>;
}

function ProjectCard({ project, language, t, index, featured = false }) {
  return <article className={`project-card-editorial ${featured ? 'featured-project' : ''}`} data-reveal>
    <RouteLink href={`/projects/${project.slug}`} className="project-image-link" aria-label={`${t.caseStudy}: ${project.title}`}><Photo asset={{src: project.media.cover, alt: project.media.alt}} label={`${project.title} / ${t.cover}`} code={`PROJECT / ${String(index + 1).padStart(2,'0')}`} language={language} t={t} interactive={false} />{project.media.gallery[0]?.src && <img className="project-hover-image" src={project.media.gallery[0].src} alt="" loading="lazy" />}</RouteLink>
    <div className="project-card-copy"><ProjectMeta project={project} language={language} t={t} /><div className="project-title-row"><h3><RouteLink href={`/projects/${project.slug}`}>{project.title}</RouteLink></h3><RouteLink href={`/projects/${project.slug}`} className="round-link" aria-label={`${t.caseStudy}: ${project.title}`}><Arrow /></RouteLink></div>
    <p>{l(project.description,language)}</p>{featured && <p className="project-role">{t.role}: {l(project.role,language) || '—'}</p>}
    <ul className="tags" aria-label="Technologies">{project.stack.slice(0,featured ? 7 : 4).map(tool => <li key={tool}>{tool}</li>)}</ul>
    {featured && <div className="project-card-links"><RouteLink href={`/projects/${project.slug}`} className="text-link">{t.caseStudy}<Arrow /></RouteLink><ExternalLink href={project.links.github}>{t.sourceCode}</ExternalLink>{project.links.demo && <ExternalLink href={project.links.demo}>{t.liveDemo}</ExternalLink>}</div>}</div>
  </article>;
}

function SelectedShowcase({ projects, language, t }) {
  const [active, setActive] = useState(0);
  const root = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActive(Number(visible[0].target.dataset.featured));
    }, {rootMargin:'-20% 0px -35% 0px',threshold:[0,.2,.5]});
    root.current.querySelectorAll('[data-featured]').forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <div className="selected-showcase" ref={root}>
    <div className="showcase-sticky"><div className="showcase-image-stack">{projects.map((project,index) => <div className={`showcase-image-layer ${active === index ? 'is-active' : ''}`} aria-hidden={active !== index} inert={active !== index ? '' : undefined} key={project.slug}><RouteLink href={`/projects/${project.slug}`} aria-label={`${t.caseStudy}: ${project.title}`}><Photo asset={{src:project.media.cover,alt:project.media.alt}} label={`${project.title} / ${t.cover}`} code={`SELECTED WORK / 0${index + 1}`} language={language} t={t} interactive={false} /></RouteLink></div>)}</div><div className="showcase-caption"><span>0{active + 1} / 0{projects.length}</span><strong>{projects[active].title}</strong><span aria-hidden="true">↗</span></div></div>
    <div className="showcase-stories">{projects.map((project,index) => <article data-featured={index} className={`showcase-story ${active === index ? 'is-active' : ''}`} key={project.slug}><span className="eyebrow">SELECTED WORK / 0{index + 1}</span><div className="showcase-mobile-photo"><RouteLink href={`/projects/${project.slug}`}><Photo asset={{src:project.media.cover,alt:project.media.alt}} label={`${project.title} / ${t.cover}`} code={`0${index + 1}`} language={language} t={t} interactive={false} /></RouteLink></div><div className="project-card-copy"><ProjectMeta project={project} language={language} t={t} /><h3><RouteLink href={`/projects/${project.slug}`}>{project.title}</RouteLink></h3><p className="showcase-subtitle">{l(project.subtitle,language)}</p><p>{l(project.description,language)}</p><p className="project-role">{t.role}: {l(project.role,language) || '—'}</p><ul className="tags">{project.stack.map(tool => <li key={tool}>{tool}</li>)}</ul><div className="project-card-links"><RouteLink href={`/projects/${project.slug}`} className="text-link">{t.caseStudy}<Arrow /></RouteLink><ExternalLink href={project.links.github}>{t.sourceCode}</ExternalLink></div></div></article>)}</div>
  </div>;
}

export function ProjectArchive({ projects, language, t }) {
  const [category, setCategory] = useState('all');
  const [technology,setTechnology] = useState('');
  const categories = [['all',t.all],['ai',t.ai],['data',t.data],['software',t.software],['research',t.researchFilter]];
  const visible = projects.filter(project => (category === 'all' || project.category === category) && (!technology || project.stack.includes(technology)));
  return <section className="project-archive page-width section-space" id="archive">
    <SectionTitle eyebrow={t.projectArchiveEye} title={t.projectArchive} />
    <div className="archive-controls"><div className="filter-list" aria-label={t.projectArchive}>{categories.map(([id,label]) => <button key={id} aria-pressed={category === id} onClick={() => setCategory(id)}>{label}</button>)}</div><label className="technology-select"><span>Stack</span><select value={technology} onChange={(event) => setTechnology(event.target.value)} aria-label="Technology"><option value="">{t.all}</option>{[...new Set(projects.flatMap(p => p.stack))].sort().map(tool => <option key={tool} value={tool}>{tool}</option>)}</select></label></div>
    <p className="filter-summary" role="status">{visible.length} {t.projectCount}{technology && ` / ${technology}`}</p>
    <div className="project-archive-grid">{visible.map((project,index) => <ProjectCard project={project} index={index} language={language} t={t} key={project.slug} />)}</div>
    {!visible.length && <div className="empty-archive"><p>{t.noProjects}</p><button className="text-link" onClick={() => {setCategory('all');setTechnology('');}}>{t.clearFilter}<Arrow /></button></div>}
  </section>;
}

function Skills({ data, language, t }) {
  const [technology,setTechnology] = useState(data.skills[0].tools[0]);
  const [step,setStep] = useState(0);
  const matches = data.projects.filter(project => project.stack.includes(technology));
  return <section className="skills-section section-space"><div className="page-width"><SectionTitle eyebrow={t.skillsEyebrow} title={t.skillsTitle}>{t.skillsBody}</SectionTitle><div className="skills-layout"><div className="skill-groups">{data.skills.map(group => <div className="skill-group" key={l(group.title,language)} data-reveal><h3>{l(group.title,language)}</h3><div className="skill-tools">{group.tools.map(tool => <button key={tool} aria-pressed={technology === tool} onClick={() => setTechnology(tool)}>{tool}<span aria-hidden="true">↗</span></button>)}</div></div>)}</div><aside className="skill-evidence" aria-live="polite"><span className="eyebrow">{t.skillEvidence}</span><h3>{technology}</h3>{matches.length ? matches.map(project => <RouteLink key={project.slug} href={`/projects/${project.slug}`}>{project.title}<Arrow /></RouteLink>) : <p>{t.noProjects}</p>}</aside></div>
    <div className="approach-section" data-reveal><h3 className="subsection-heading">{t.approach}</h3><div className="approach-steps" role="tablist" aria-label={t.approach}>{data.approach.map((item,index) => <button role="tab" id={`approach-tab-${index}`} aria-controls="approach-example" aria-selected={step === index} tabIndex={step === index ? 0 : -1} onClick={() => setStep(index)} onKeyDown={(event) => {
      if (['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) {event.preventDefault();const next = event.key === 'Home' ? 0 : event.key === 'End' ? data.approach.length-1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + data.approach.length) % data.approach.length;setStep(next);document.getElementById(`approach-tab-${next}`).focus();}
    }} key={index}><span>0{index + 1}</span><strong>{l(item.title,language)}</strong></button>)}</div><div id="approach-example" role="tabpanel" aria-labelledby={`approach-tab-${step}`} className="approach-example"><EmptyText value={data.approach[step].example} language={language} label={t.approachPending} /></div></div>
    </div></section>;
}

export function Work({ data, language, t }) {
  const featured = data.projects.filter(p => p.featured);
  return <>
    <section className="work-hero page-width"><div><span className="eyebrow intro-in">{t.workEyebrow}</span><h1 className="intro-in" style={{'--delay':'120ms'}}>{t.workFirst}<br /><span>{t.workSecond}</span></h1><p className="work-hero-body intro-in" style={{'--delay':'220ms'}}>{t.workBody}</p>{l(data.identity.availability,language) && <p className="availability"><i />{l(data.identity.availability,language)}</p>}<div className="hero-actions intro-in" style={{'--delay':'320ms'}}><a href="#selected-work" className="button button-accent">{t.projects}<Arrow /></a><CvLink identity={data.identity} t={t} /><ExternalLink className="github-hero-link" href={data.identity.github}>GitHub</ExternalLink></div></div><Photo asset={data.assets.work} label={t.workPhoto} code="THE BUILDER / 01" language={language} t={t} className="work-hero-photo intro-photo" priority /></section>
    <section className="experience-section page-width section-space" id="experience"><SectionTitle eyebrow={t.experienceEyebrow} title={t.experienceTitle} />{data.experiences.length ? <div className="experience-list">{data.experiences.map((item,index) => <article className="experience-item" key={index} data-reveal><div><span className="eyebrow">{item.period}</span><h3>{l(item.role,language)}</h3><p>{item.organization}</p></div><div><p>{l(item.challenge,language)}</p><p>{l(item.contribution,language)}</p><p>{l(item.outcome,language)}</p>{item.project && <RouteLink href={`/projects/${item.project}`} className="text-link">{t.caseStudy}<Arrow /></RouteLink>}{item.image?.src && <Photo asset={item.image} label={item.organization} language={language} t={t} />}</div></article>)}</div> : <div className="experience-empty" data-reveal><span>— / —</span><div><h3>{t.experienceEmpty}</h3><p>{t.experienceNote}</p></div></div>}</section>
    <section className="selected-work page-width section-space" id="selected-work"><SectionTitle eyebrow={t.selectedEyebrow} title={t.selectedTitle} /><SelectedShowcase projects={featured} language={language} t={t} /></section>
    <ProjectArchive projects={data.projects} language={language} t={t} />
    <section className="lab-section page-width section-space"><div className="lab-heading" data-reveal><span className="eyebrow">R&D / WORK IN PROGRESS</span><h2>{t.labTitle}</h2><p>{t.labBody}</p></div><div className="lab-list">{data.lab.map((item,index) => {const project = data.projects.find(p => p.slug === item.slug);return <RouteLink className="lab-item" href={`/projects/${project.slug}`} key={item.slug} data-reveal><span className="lab-index">0{index + 1}</span><div><span className="project-status">{t[project.status]}</span><h3>{project.title}</h3><p>{l(project.description,language)}</p></div><Arrow /></RouteLink>;})}</div></section>
    <Skills data={data} language={language} t={t} />
    <section className="page-width section-space"><SectionTitle eyebrow={t.trainingType} title={t.trainingTitle} /><Training data={data.training} language={language} t={t} /></section>
    <section className="notes-section page-width section-space"><SectionTitle eyebrow={t.notesEyebrow} title={t.notesTitle} /><div className="notes-list">{data.researchNotes.map((note,index) => <article key={index} data-reveal><span className="eyebrow">NOTE / 0{index + 1}</span><h3>{l(note.title,language)}</h3><p>{l(note.description,language)}</p><ExternalLink href={note.href}>{t.readNotes}</ExternalLink></article>)}</div></section>
    <section className="career-section section-space"><div className="page-width career-layout"><div data-reveal><span className="eyebrow">{t.careerEyebrow}</span><h2>{t.careerTitle}</h2><Photo asset={data.assets.future} label={t.careerEyebrow} code="WHAT COMES NEXT" language={language} t={t} /></div><div className="career-goals">{[['short',t.shortTerm],['long',t.longTerm]].map(([key,title],index) => <article key={key} data-reveal><span className="eyebrow">0{index + 1}</span><h3>{title}</h3><p>{l(data.career[key],language)}</p></article>)}<article data-reveal><span className="eyebrow">03</span><h3>{t.preferences}</h3><EmptyText value={data.identity.workingPreference} language={language} label={t.contentPending} /><p className="eyebrow">{t.opportunity}</p><EmptyText value={data.identity.availability} language={language} label={t.contentPending} /><CvLink identity={data.identity} t={t} /></article></div></div></section>
    <div className="page-width"><Contact data={data} language={language} t={t} branch="work" /></div>
  </>;
}
