import { useEffect, useRef, useState } from 'react';
import { localize as l } from '../../content/copy';
import { Arrow, ExternalLink, Photo, RouteLink, SectionTitle } from '../editorial/Shared';
import { BuildPhoto, ProjectFacts, ProjectLinks, ProjectMeta } from './ProjectElements';

export function FeaturedFlagship({project,config,language,t,s,highlighted}) {
  const root=useRef(null);
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(!root.current)return;const rect=root.current.getBoundingClientRect();const progress=media.matches?1:Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight*.65)));root.current.style.setProperty('--bleed-progress',String(progress));});};
    update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);media.addEventListener('change',update);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);media.removeEventListener('change',update);};
  },[]);
  return <article className="featured-flagship" ref={root} data-featured-format="flagship" data-capability-match={highlighted}>
    <div className="flagship-stage"><BuildPhoto project={project} language={language} t={t}/><div className="flagship-scrim"/><div className="flagship-content page-width"><span className="eyebrow">PROJECT 01 / {s.flagship}</span><ProjectMeta project={project} t={t}/><h3>{project.title}</h3><p>{l(project.subtitle,language)}</p></div></div>
    <div className="flagship-dossier page-width"><ProjectFacts project={project} outcome={config.outcome} language={language} t={t} s={s}/><ProjectLinks project={project} t={t} s={s}/></div>
  </article>;
}

export function FeaturedBlueprint({project,config,language,t,s,highlighted}) {
  const [active,setActive]=useState(0);
  return <article className="featured-blueprint studio-light section-space" data-featured-format="blueprint" data-capability-match={highlighted}>
    <div className="page-width"><div className="blueprint-heading" data-reveal><div><span className="eyebrow">PROJECT 02 / {s.blueprint}</span><h3>{project.title}</h3><p>{l(project.subtitle,language)}</p></div><ProjectMeta project={project} t={t}/></div>
    <p className="blueprint-instruction">{s.inspectNode}</p><div className="blueprint-canvas" data-reveal><svg className="blueprint-wires" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">{project.pipeline.slice(1).map((_,index)=><path key={index} d={`M${(index+.5)*250} 40H${(index+1.5)*250}`} className={active===index||active===index+1?'is-active':''}/>)}</svg><div className="blueprint-nodes">{project.pipeline.map((node,index)=><div className={`blueprint-node-wrap ${active===index?'is-active':''}`} key={node.title}><button aria-expanded={active===index} aria-controls={`blueprint-detail-${index}`} onClick={()=>setActive(index)} style={{'--node-delay':`${index*180}ms`}}><span className="eyebrow">0{index+1} / MODULE</span><strong>{node.title}</strong><span aria-hidden="true">↗</span></button><div className="blueprint-mobile-detail" id={`blueprint-detail-${index}`} hidden={active!==index}><p>{l(node.detail,language)}</p><RouteLink href={`/projects/${project.slug}#architecture`}>{s.nodeEvidence}<Arrow/></RouteLink></div></div>)}</div></div>
    <div className="blueprint-drawer" aria-live="polite"><span className="eyebrow">0{active+1} / {project.pipeline[active].title}</span><p>{l(project.pipeline[active].detail,language)}</p><p className="blueprint-scope">{l(project.implementation,language)}</p>{l(project.pipeline[active].decision,language)&&<p>{l(project.pipeline[active].decision,language)}</p>}{project.pipeline[active].image?.src&&<Photo asset={project.pipeline[active].image} label={project.pipeline[active].title} language={language} t={t}/>}<ExternalLink href={project.source}>README / {s.nodeEvidence}</ExternalLink></div>
    <ProjectFacts project={project} outcome={config.outcome} language={language} t={t} s={s}/><ProjectLinks project={project} t={t} s={s} architecture/>
    </div></article>;
}

export function FeaturedDemoReel({project,config,frames,language,t,s,highlighted}) {
  const [active,setActive]=useState(0),touch=useRef(null),tabRefs=useRef([]);
  const select=(index,focus=false)=>{const next=(index+frames.length)%frames.length;setActive(next);if(focus)tabRefs.current[next]?.focus();};
  const frame=frames[active];
  return <article className="featured-reel page-width section-space" data-featured-format="reel" data-capability-match={highlighted}><div className="reel-heading" data-reveal><div><span className="eyebrow">PROJECT 03 / {s.reel}</span><h3>{project.title}</h3></div><ProjectMeta project={project} t={t}/></div><p className="reel-value">{l(project.subtitle,language)}</p>
    <div className="reel-stage" role="region" aria-roledescription="carousel" aria-label={`${project.title} / ${s.reel}`} tabIndex="0" onKeyDown={event=>{if(event.target!==event.currentTarget)return;if(['ArrowRight','ArrowLeft'].includes(event.key)){event.preventDefault();select(active+(event.key==='ArrowRight'?1:-1));}}} onTouchStart={event=>touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY}} onTouchEnd={event=>{if(!touch.current)return;const dx=event.changedTouches[0].clientX-touch.current.x,dy=event.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3)select(active+(dx<0?1:-1));touch.current=null;}}>
      <div className="reel-browser-bar"><span aria-hidden="true">○ ○ ○</span><span>LABGUARD / {l(frame.title,language)}</span><span>{String(active+1).padStart(2,'0')} / {String(frames.length).padStart(2,'0')}</span></div>
      <div className="reel-visual" key={frame.id}>{frame.video?<video controls preload="none" poster={frame.image.src||undefined} aria-label={`${project.title} / ${l(frame.title,language)}`}><source src={frame.video}/></video>:<Photo asset={frame.image} label={`${project.title} / ${l(frame.title,language)}`} code={s.screenshotPending} language={language} t={t} interactive={false}/>}</div>
      <div className="reel-controls"><button aria-label={s.previous} onClick={()=>select(active-1)}>←</button><p>{s.reelHint}</p><button aria-label={s.next} onClick={()=>select(active+1)}>→</button></div>
    </div>
    <div className="reel-tabs" role="tablist" aria-label={`${project.title} / ${s.reel}`}>{frames.map((item,index)=><button key={item.id} ref={node=>tabRefs.current[index]=node} role="tab" aria-selected={active===index} tabIndex={active===index?0:-1} id={`reel-tab-${item.id}`} aria-controls="reel-panel" onClick={()=>select(index)} onKeyDown={event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();select(event.key==='Home'?0:event.key==='End'?frames.length-1:index+(event.key==='ArrowRight'?1:-1),true);}}}><span>0{index+1}</span>{l(item.title,language)}</button>)}</div>
    <div className="reel-description" role="tabpanel" aria-labelledby={`reel-tab-${frame.id}`} id="reel-panel" tabIndex="0"><p>{l(project[frame.field],language)}</p>{frame.id==='tech'&&<ul className="tags">{project.stack.map(tool=><li key={tool}>{tool}</li>)}</ul>}</div>
    <ProjectFacts project={project} outcome={config.outcome} language={language} t={t} s={s}/><ProjectLinks project={project} t={t} s={s}/>
  </article>;
}
export function FeaturedBuilds({data,studio,language,t,s,matches}) {
  const components={flagship:FeaturedFlagship,blueprint:FeaturedBlueprint,reel:FeaturedDemoReel};
  return <section className="studio-featured" id="selected-work"><div className="page-width"><SectionTitle eyebrow={s.featuredLabel} title={s.featuredTitle}/></div>{studio.featured.map(config=>{const project=data.projects.find(item=>item.slug===config.slug),Component=components[config.format];return project&&Component?<Component key={config.slug} project={project} config={config} language={language} t={t} s={s} frames={studio.demoFrames} highlighted={matches.includes(config.slug)}/>:null;})}</section>;
}
