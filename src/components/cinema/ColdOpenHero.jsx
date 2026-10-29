import { useRef } from 'react';
import { Arrow, CvLink } from '../editorial/Shared';
import { localize as l } from '../../content/copy';
import { ProjectPortal } from './CinemaFrame';
import { usePointerDepth } from './CinemaMotion';
export function ColdOpenHero({data,cinema,language,t,c,simple}){
 const root=useRef(null);usePointerDepth(root,simple);
 const projects=cinema.featured.map(item=>data.projects.find(p=>p.slug===item.slug)).filter(Boolean);
 return <section className="cold-open" id="intro" data-cinema-scene="cold-open" data-scene-range="pinned" ref={root}>
  <div className="cold-stage page-width"><div className="cold-identity"><span className="eyebrow">{c.work}</span><p>{c.currentRole}: {l(data.identity.currentRole,language)||c.rolePending}</p></div>
  <h1>{c.headline.map((line,index)=><span className={`cold-line cold-line-${index+1}`} key={line}><span style={{'--delay':`${index*90}ms`}}>{line}</span></span>)}</h1>
  <p className="cold-focus">{c.focus}</p><div className="hero-actions cold-actions"><a href="#selected-work" className="button button-accent">{c.selected}<Arrow/></a><CvLink identity={data.identity} t={t}/></div>
  <div className="cold-fragments">{projects.map((project,index)=><ProjectPortal project={project} language={language} c={c} className={`cold-fragment fragment-${index+1}`} priority={index===0} key={project.slug}><span className="fragment-label">0{index+1} / {project.title}</span></ProjectPortal>)}</div>
  <a className="cold-scroll" href="#manifesto">↓ <span>{c.scroll}</span></a></div>
 </section>;
}
