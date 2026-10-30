import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useIsPresent } from 'motion/react';
import { localize as l } from '../../content/copy';
import { Arrow, RouteLink } from '../editorial/Shared';
import { CinemaFrame } from './CinemaFrame';
import { usePointerDepth } from './CinemaMotion';
import { useSectionEntrance } from './useSectionEntrance';

function StageMetadata({project,language,t,simple}) {
 const present=useIsPresent();
 const tags=[...new Set([[project.category].flat().join(' / '),...project.stack.slice(0,3)])];
 return <m.div className="selected-stage-metadata" aria-hidden={!present} inert={!present?'':undefined} initial={simple?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={simple?undefined:{opacity:0,y:-8}} transition={{duration:simple?0:.24}}>
  <h3>{project.title}</h3><ul className="selected-stage-tags" aria-label={language==='vi'?'Lĩnh vực và công nghệ':'Fields and technologies'}>{tags.map(tag=><li key={tag}>{tag}</li>)}<li className="selected-status-tag">{t[project.status]||project.status}</li></ul>
  <p className="selected-stage-summary">{l(project.description,language)}</p><p className="selected-stage-facts">{t.role}: {l(project.role,language)||'—'}<span>{t.repoYear} / {project.year}</span></p>
 </m.div>;
}

export function SelectedWorks({content,projects,language,t,c,simple}) {
 const root=useRef(null),media=useRef(null),video=useRef(null),touch=useRef(null);
 const [selection,setSelection]=useState({index:0,direction:1}),[mobile,setMobile]=useState(false),[near,setNear]=useState(false);
 const active=Math.min(selection.index,Math.max(0,projects.length-1)),project=projects[active];
 const duration=simple?0:mobile?.2:.55;
 useSectionEntrance(root,simple);
 usePointerDepth(media,simple||mobile);
 useEffect(()=>{const query=matchMedia('(max-width:767px)');const change=()=>setMobile(query.matches);change();query.addEventListener('change',change);return()=>query.removeEventListener('change',change);},[]);
 useEffect(()=>{if(!root.current)return;if(!('IntersectionObserver' in window)){setNear(true);return;}const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){setNear(true);observer.disconnect();}},{rootMargin:'200px'});observer.observe(root.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{if(!near||!projects.length)return;const next=projects[(active+1)%projects.length];if(next?.media.cover){const image=new Image();image.src=next.media.cover;}},[near,active,projects]);
 useEffect(()=>{const node=video.current;if(!node)return;const pause=()=>node.pause();const hidden=()=>{if(document.hidden)pause();};if(simple)pause();document.addEventListener('visibilitychange',hidden);let observer;if('IntersectionObserver' in window){observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)pause();});observer.observe(node);}return()=>{pause();observer?.disconnect();document.removeEventListener('visibilitychange',hidden);};},[project?.slug,simple]);
 if(!project)return null;
 function select(index,direction){const next=(index+projects.length)%projects.length;if(next!==active)setSelection({index:next,direction:direction??(next>active?1:-1)});}
 const variants={enter:direction=>({x:direction*(mobile?26:100),scale:mobile?1:.96,opacity:0,clipPath:mobile?'inset(0 round 16px)':'inset(0 0 0 8% round 20px)'}),center:{x:0,scale:1,opacity:1,clipPath:'inset(0 round 20px)'},exit:direction=>({x:-direction*(mobile?26:100),scale:mobile?1:.94,opacity:0,transition:{duration:simple?0:mobile?.16:.3}})};
 const previousLabel=language==='vi'?'Dự án trước':'Previous project',nextLabel=language==='vi'?'Dự án tiếp theo':'Next project';
 return <section className="selected-works" id="selected-work" ref={root}>
  <span id="skills" className="selected-anchor-alias" aria-hidden="true"/>
  <div className="page-width"><div className="selected-heading-top"><span className="eyebrow">{content.eyebrow}</span><RouteLink className="selected-all-link" href="/work#archive">{language==='vi'?'Xem tất cả dự án':'View all projects'}<Arrow/></RouteLink></div><h2>{l(content.heading,language)}</h2><p className="selected-intro">{l(content.intro,language)}</p>
  <div className="selected-project-gallery" role="region" aria-roledescription={language==='vi'?'trình chiếu dự án':'project gallery'} aria-label={l(content.heading,language)} tabIndex="0" onKeyDown={event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();select(event.key==='Home'?0:event.key==='End'?projects.length-1:active+(event.key==='ArrowRight'?1:-1),event.key==='ArrowLeft'?-1:1);}}}>
   <div className="selected-stage-stack" ref={media} onTouchStart={event=>touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY}} onTouchEnd={event=>{if(!touch.current)return;const dx=event.changedTouches[0].clientX-touch.current.x,dy=event.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3)select(active+(dx<0?1:-1),dx<0?1:-1);touch.current=null;}}>
    {projects.length>1&&<><div className="selected-back-sheet back-sheet-two" aria-hidden="true"/><div className="selected-back-sheet back-sheet-one" aria-hidden="true"/></>}
    <div className="selected-stage-viewport">
     {project.media.previewVideo?<><video key={project.slug} ref={video} className="selected-preview-video" src={project.media.previewVideo} controls muted playsInline preload="none" poster={project.media.cover||undefined} aria-label={`${project.title} / ${t.video}`}/><RouteLink className="selected-video-cta" href={`/projects/${project.slug}`}>{t.caseStudy}<Arrow/></RouteLink></>:<RouteLink className="selected-stage-link" href={`/projects/${project.slug}`} data-project-portal aria-label={`${t.caseStudy}: ${project.title}`}>
      <AnimatePresence initial={false} custom={selection.direction}>{<m.div className="selected-stage-slide" key={project.slug} aria-hidden="true" custom={selection.direction} variants={variants} initial={simple?false:'enter'} animate="center" exit={simple?undefined:'exit'} transition={{duration,ease:[.22,1,.36,1]}}><CinemaFrame project={project} language={language} c={c} priority={near}/></m.div>}</AnimatePresence>
      <span className="selected-stage-cta">{language==='vi'?'Khám phá dự án':'Explore this project'}<Arrow/></span>
     </RouteLink>}
    </div>
   </div>
   <div className="selected-stage-caption"><span className="selected-counter" aria-hidden="true">{String(active+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span><div className="selected-metadata-slot"><AnimatePresence initial={false} mode="sync"><StageMetadata key={project.slug} project={project} language={language} t={t} simple={simple}/></AnimatePresence></div><div className="selected-stage-controls"><button aria-label={previousLabel} onClick={()=>select(active-1,-1)} disabled={projects.length<2}>←</button><button aria-label={nextLabel} onClick={()=>select(active+1,1)} disabled={projects.length<2}>→</button></div></div>
   <p className="selected-announcement" role="status" aria-live="polite" aria-atomic="true">{project.title} · {active+1} / {projects.length}</p>
   <div className="selected-progress" role="progressbar" aria-label={language==='vi'?'Vị trí dự án':'Project position'} aria-valuemin="1" aria-valuemax={projects.length} aria-valuenow={active+1} aria-valuetext={`${project.title}, ${active+1} / ${projects.length}`}><span style={{transform:`scaleX(${(active+1)/projects.length})`}}/></div>
   <div className="selected-project-picker" aria-label={language==='vi'?'Chọn dự án':'Choose a project'}>{projects.map((item,index)=><button key={item.slug} onClick={()=>select(index)} aria-pressed={active===index} aria-label={`${language==='vi'?'Xem':'View'} ${item.title}`}><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span>{item.title}</span></button>)}</div>
  </div></div>
 </section>;
}
