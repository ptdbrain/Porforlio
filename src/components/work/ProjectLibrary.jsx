import { useEffect, useLayoutEffect, useRef, useState } from 'react';
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
import { localize as l } from '../../content/copy';
import { filterProjects, getCategories } from '../../lib/studio.mjs';
import { Arrow, RouteLink, SectionTitle } from '../editorial/Shared';
import { BuildPhoto, ProjectMeta } from './ProjectElements';

export function ProjectLibrary({projects,studio,language,t,s,matches=[]}) {
  const [category,setCategory]=useState('all'),[technology,setTechnology]=useState(''),[query,setQuery]=useState(''),[limit,setLimit]=useState(6);
  const filtered=filterProjects(projects,{category,technology,query}),visible=filtered.slice(0,limit);
  const gridRef=useRef(null),previousLayout=useRef({width:0,positions:new Map()});
  useBrowserLayoutEffect(()=>{
    const grid=gridRef.current;
    if(!grid)return;
    const nodes=[...grid.children],width=grid.clientWidth;
    const positions=new Map(nodes.map(node=>[node.dataset.slug,{x:node.offsetLeft,y:node.offsetTop}]));
    if(previousLayout.current.width===width&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      for(const node of nodes){const before=previousLayout.current.positions.get(node.dataset.slug),after=positions.get(node.dataset.slug);if(before&&after&&(before.x!==after.x||before.y!==after.y))node.animate([{transform:`translate(${before.x-after.x}px,${before.y-after.y}px)`},{transform:'none'}],{duration:300,easing:'cubic-bezier(.22,1,.36,1)'});}
    }
    previousLayout.current={width,positions};
  },[category,technology,query,limit]);
  const reset=()=>{setCategory('all');setTechnology('');setQuery('');setLimit(6);};
  return <section className="studio-library studio-light section-space" id="archive"><div className="page-width"><SectionTitle eyebrow={s.libraryLabel} title={s.library}/><div className="library-tools"><label className="project-search"><span className="eyebrow">{s.search}</span><input type="search" value={query} onChange={event=>{setQuery(event.target.value);setLimit(6);}} placeholder={s.searchPlaceholder}/></label><label className="technology-select"><span>Stack</span><select value={technology} onChange={event=>{setTechnology(event.target.value);setLimit(6);}} aria-label={s.technology}><option value="">{t.all}</option>{[...new Set(projects.flatMap(p=>p.stack))].sort().map(tool=><option key={tool}>{tool}</option>)}</select></label></div><div className="library-filter-wrap"><div className="filter-list" aria-label={s.library}><button aria-pressed={category==='all'} onClick={()=>{setCategory('all');setLimit(6);}}>{t.all}</button>{getCategories(projects).map(id=><button key={id} aria-pressed={category===id} onClick={()=>{setCategory(id);setLimit(6);}}>{l(studio.categoryLabels[id],language)||id}</button>)}</div><span className="filter-scroll-hint">{s.filterHint}</span></div>
    <p className="filter-summary" role="status">{visible.length} / {filtered.length} {t.projectCount}{technology&&` / ${technology}`}</p><div className="project-archive-grid" ref={gridRef}>{visible.map(project=><article className="project-card-editorial library-card" key={project.slug} data-slug={project.slug} data-capability-match={matches.includes(project.slug)}><RouteLink className="project-image-link" href={`/projects/${project.slug}`} aria-label={`${t.caseStudy}: ${project.title}`}><BuildPhoto project={project} language={language} t={t}/>{project.media.gallery[0]?.src&&<img className="project-hover-image" src={project.media.gallery[0].src} alt="" loading="lazy"/>}</RouteLink><div className="project-card-copy"><ProjectMeta project={project} t={t}/><h3><RouteLink href={`/projects/${project.slug}`}>{project.title}</RouteLink></h3><p>{l(project.description,language)}</p><p className="library-role">{t.role}: {l(project.role,language)||'—'}</p><ul className="tags">{project.stack.slice(0,4).map(tool=><li key={tool}>{tool}</li>)}</ul><RouteLink href={`/projects/${project.slug}`} className="text-link">{t.caseStudy}<Arrow/></RouteLink></div></article>)}</div>
    {!filtered.length&&<div className="empty-archive"><p>{t.noProjects}</p><button className="text-link" onClick={reset}>{t.clearFilter}<Arrow/></button></div>}{filtered.length>limit&&<button className="button button-outline library-more" onClick={()=>setLimit(limit+6)}>{s.loadMore}<span aria-hidden="true">+</span></button>}
  </div></section>;
}
