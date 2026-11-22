import { Capabilities } from './Capabilities';
import { FeaturedProjects } from './FeaturedProjects';
import { Photo } from './Shared';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { localize as l } from '../../content/copy';
import { capabilities, experienceSummaries, workCopy } from '../../content/workV4.mjs';
import { initialWorkView, normalizeWorkView, workProjects, workReturnKey } from '../../lib/workV4.mjs';
import { useWorkMotion } from './useWorkMotion';
import { Arrow, CvLink, ExternalLink, RouteLink } from './Shared';
export { ProjectMeta } from '../work/ProjectElements';

const useBrowserLayoutEffect=typeof window==='undefined'?useEffect:useLayoutEffect;

function SystemMap({copy}) {
  const positions = [[22,55],[182,55],[182,165],[22,165]];
  return <div className="v4-system" data-work-reveal><div className="v4-system-orbit" aria-hidden="true"/><svg viewBox="0 0 330 260" role="img" aria-label={copy.mapLabel}>
    <path className="v4-map-wire" pathLength="1" d="M82 80H242V190H82"/>
    {positions.map(([x,y],index)=><g key={index} style={{'--node-index':index}}><rect x={x} y={y} width="120" height="50" rx="8"/><text x={x+60} y={y+30} textAnchor="middle">{copy.mapNodes[index]}</text></g>)}
    <path className="v4-map-signal" pathLength="1" d="M82 80H242V190H82"/>
  </svg><p className="v4-mono">{copy.mapCaption}</p></div>;
}

export function Work({data,language,t,simple=false}) {
  const c=workCopy[language];
  const [view,setView]=useState(initialWorkView),[ready,setReady]=useState(false),[restore,setRestore]=useState(null),[copyState,setCopyState]=useState('');
  const root=useRef(null),cardPositions=useRef(new Map());
  useWorkMotion(root,simple);
  const projects=workProjects(data.projects,view);
  const shown=view.expanded?projects:projects.slice(0,6);
  const professional=['geoit-vnpt','ba-gps','robotics-mentor'].map(id=>data.experiences.find(entry=>entry.id===id)).filter(Boolean);
  const research=data.projects.find(project=>project.slug==='dpotm');

  useEffect(()=>{
    const saved=history.state?.workV4;
    if(saved){const scroll=Number.isFinite(history.state.scroll)?history.state.scroll:saved.scroll;setView({...normalizeWorkView(saved,data.projects),technology:'',libraryOpen:saved.libraryOpen===true||saved.focusKind==='archive'||location.hash==='#archive'});if(Number.isFinite(scroll)&&scroll>=0)setRestore({scroll,focusSlug:saved.focusSlug,focusKind:saved.focusKind});}
    if(!saved&&location.hash==='#archive')setView(previous=>({...previous,libraryOpen:true}));
    setReady(true);
  },[data.projects]);
  useEffect(()=>{if(ready&&!restore)history.replaceState({...history.state,workV4:{...view,scroll:window.scrollY}},'');},[view,ready,restore]);
  useEffect(()=>{
    if(!ready||!restore)return;
    let secondFrame;
    const frame=requestAnimationFrame(()=>{secondFrame=requestAnimationFrame(()=>{
      const link=[...root.current.querySelectorAll(restore.focusKind==='featured'?'[data-work-featured]':'[data-work-project]')].find(node=>(node.dataset.workFeatured||node.dataset.workProject)===restore.focusSlug);
      link?.focus({preventScroll:true});window.scrollTo({top:restore.scroll,behavior:'instant'});setRestore(null);
    });});
    return()=>{cancelAnimationFrame(frame);cancelAnimationFrame(secondFrame);};
  },[ready,restore]);
  useEffect(()=>{if(!copyState)return;const timer=setTimeout(()=>setCopyState(''),2500);return()=>clearTimeout(timer);},[copyState]);
  useEffect(()=>{
    const hidden=()=>root.current?.classList.toggle('v4-paused',document.hidden);
    document.addEventListener('visibilitychange',hidden);hidden();return()=>document.removeEventListener('visibilitychange',hidden);
  },[]);

  useBrowserLayoutEffect(()=>{
    if(!view.libraryOpen||simple||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const animations=[];
    root.current.querySelectorAll('.v4-project-card').forEach(node=>{
      const rect=node.getBoundingClientRect(),old=cardPositions.current.get(node.dataset.workProject);
      animations.push(node.animate([{transform:old?`translate(${old.x-rect.x}px,${old.y-rect.y}px)`:'translateY(12px)',opacity:old?1:0},{transform:'none',opacity:1}],{duration:320,easing:'cubic-bezier(.22,1,.36,1)'}));
    });
    cardPositions.current.clear();
    return()=>animations.forEach(animation=>animation.cancel());
  },[view.filter,view.query,view.technology,view.expanded,view.libraryOpen,simple]);
  function changeFilter(patch){
    if(!simple&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      root.current.querySelectorAll('.v4-project-card').forEach(node=>cardPositions.current.set(node.dataset.workProject,node.getBoundingClientRect()));
    }
setView(previous=>({...previous,...patch,expanded:false}));}
  function related(capability){
    changeFilter({filter:capability,query:'',technology:'',libraryOpen:true});
    const target=root.current.querySelector('#archive');
    target.scrollIntoView({behavior:simple||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    target.querySelector('h2')?.focus({preventScroll:true});
  }
  function rememberProject(event,project){
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const context={...view,scroll:window.scrollY,focusSlug:project.slug,focusKind:event.currentTarget.hasAttribute('data-work-featured')?'featured':'archive',projectPath:`/projects/${project.slug}`};
    history.replaceState({...history.state,workV4:context},'');try{sessionStorage.setItem(workReturnKey,JSON.stringify(context));}catch{}
  }
  async function copyEmail(){try{await navigator.clipboard.writeText(data.identity.email);setCopyState('success');}catch{setCopyState('failed');}}

  return <div className={`work-v4 ${simple?'v4-simple':''}`} ref={root}>
    <section className="v4-hero" id="intro"><div className="page-width">
      <div className="v4-hero-layout"><div className="v4-hero-copy" data-work-reveal><span className="v4-label">{c.eyebrow}</span><h1>{c.headline[0]}<br/>{c.headline[1]} <span>{c.product}</span></h1><p className="v4-lead">{c.intro}</p><div className="v4-actions"><a href="#featured" className="button button-accent">{language==='vi'?'Xem dự án nổi bật':'Explore featured projects'}<span aria-hidden="true">↓</span></a><CvLink identity={data.identity} t={t}/></div><a className="v4-quiet" href="#archive" onClick={()=>setView(previous=>({...previous,libraryOpen:true}))}>{c.directProjects}<Arrow/></a></div><div className="work-hero-visual"><Photo asset={data.assets.work} label={t.workPhoto} language={language} t={t} interactive={false} priority/><SystemMap copy={c}/></div></div>
      <div className="v4-proof">{professional.slice(0,2).map((entry,index)=><div key={entry.id} data-work-reveal style={{'--work-delay':`${index*80}ms`}}><span>{c.proofLabels[index]}</span><a href="#experience"><strong>{entry.organization} · {l(entry.role,language)}</strong></a><small>{entry.period}</small></div>)}<div data-work-reveal style={{'--work-delay':'160ms'}}><span>{c.proofLabels[2]}</span><RouteLink href="/projects/dpotm"><strong>{c.proofResearch}</strong><Arrow/></RouteLink></div></div>
    </div></section>

    <FeaturedProjects data={data} language={language} t={t} onProject={rememberProject}/>

    <section className="v4-section v4-experience" id="experience" aria-labelledby="v4-exp-title"><div className="page-width">
      <div className="v4-section-heading" data-work-reveal><span className="v4-label">{c.expLabel}</span><h2 id="v4-exp-title">{c.expTitle}</h2><p className="v4-lead">{c.expIntro}</p></div>
      {professional.map(entry=><article className="v4-job" key={entry.id} data-work-reveal><span className="v4-job-period v4-mono">{entry.period}</span><div><h3>{entry.organization}</h3><p className="v4-position">{l(entry.role,language)}</p></div><div><p className="v4-job-summary">{l(experienceSummaries[entry.id],language)}</p><details><summary>{c.scope}</summary>{[['challenge',t.problem],['contribution',t.contribution],['outcome',t.results]].map(([key,label])=><div className="v4-job-detail" key={key}><h4>{label}</h4><p>{l(entry[key],language)}</p></div>)}{entry.evidence&&<ExternalLink href={entry.evidence}>{t.evidence}</ExternalLink>}</details></div></article>)}
      {research&&<article className="v4-research" data-work-reveal><div><span className="v4-label">{c.researchLabel}</span><h3>{c.researchTitle}</h3><p>{c.researchBody}</p></div><div className="v4-research-links">{research.links.report&&<ExternalLink href={research.links.report}>{c.paper}</ExternalLink>}<RouteLink href={`/projects/${research.slug}`} onClick={event=>rememberProject(event,research)}>{c.researchLink}<Arrow/></RouteLink></div></article>}
      <div className="v4-training" data-work-reveal><span className="v4-label">{c.training}</span><div><p>{l(data.training.title,language)} <span className="v4-training-status">{l(data.training.status,language)}</span></p><small>{data.training.organization}</small></div><div className="v4-training-links"><ExternalLink href={data.training.source}>{t.programSource}</ExternalLink>{data.training.evidence&&<ExternalLink href={data.training.evidence}>{t.evidence}</ExternalLink>}</div></div>
    </div></section>

    <Capabilities activeId={view.capability} language={language} copy={c} onChange={capability=>setView(previous=>({...previous,capability}))} onRelated={related}/>

    <section className="v4-section v4-library v4-library-compact" id="archive" aria-labelledby="v4-library-title"><span id="selected-work" className="v4-anchor"/><div className="page-width" data-work-reveal>
      <details className="v4-project-index" open={view.libraryOpen} onToggle={event=>{const open=event.currentTarget.open;setView(previous=>previous.libraryOpen===open?previous:{...previous,libraryOpen:open});}}>
        <summary><div><span className="v4-label">{c.libraryLabel}</span><h2 id="v4-library-title" tabIndex="-1">{c.libraryTitle}</h2><p>{c.libraryIntro}</p></div><span className="v4-index-toggle"><span>{data.projects.length} {c.projects}</span><i aria-hidden="true">+</i></span></summary>
        <div className="v4-library-body">
          <div className="v4-index-toolbar"><label className="v4-index-search"><span>{c.search}</span><input type="search" value={view.query} placeholder={c.placeholder} onChange={event=>changeFilter({query:event.target.value})}/></label><div className="v4-index-context"><span>{view.filter==='all'?c.all:l(capabilities.find(cap=>cap.id===view.filter)?.title,language)}</span>{(view.filter!=='all'||view.query)&&<button className="text-link" onClick={()=>changeFilter({filter:'all',query:'',technology:''})}>{c.clear}<span aria-hidden="true">↺</span></button>}</div></div>
          <p className="v4-count" role="status" aria-atomic="true" data-work-filter={view.filter}>{c.showing} {shown.length} / {projects.length} {c.projects}</p>
          <div className="v4-project-grid">{shown.map((project,index)=><RouteLink className="v4-project-card" key={project.slug} href={`/projects/${project.slug}`} data-work-project={project.slug} data-work-reveal onClick={event=>rememberProject(event,project)}><span className="v4-index-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><h3>{project.title}</h3><p className="v4-card-role">{l(project.role,language)}</p><span className="v4-card-link">{t.caseStudy}<Arrow/></span></RouteLink>)}</div>
          {shown.length===0&&<div className="v4-empty"><p>{c.empty}</p></div>}
          {shown.length<projects.length&&<div className="v4-library-more"><button className="button button-outline" onClick={()=>setView(previous=>({...previous,expanded:true}))}>{c.more} {projects.length} {c.projects}<span aria-hidden="true">↓</span></button></div>}
        </div>
      </details>
    </div></section>

    <section className="v4-contact" id="contact"><div className="page-width" data-work-reveal><span className="v4-label">{c.contactLabel}</span><h2>{c.contactTitle}</h2><p className="v4-lead">{c.contactBody}</p><a className="v4-email" href={`mailto:${data.identity.email}`}>{data.identity.email}<Arrow/></a><button className="v4-copy" onClick={copyEmail}>{copyState==='success'?c.copied:c.copy}</button><p className="v4-copy-status" role="status">{copyState==='failed'?c.failed:copyState==='success'?c.copied:''}</p><div className="v4-contact-links"><CvLink className="v4-quiet" identity={data.identity} t={t}/><ExternalLink href={data.identity.github}>GitHub</ExternalLink><ExternalLink href={data.identity.linkedin}>LinkedIn</ExternalLink><RouteLink href="/personal">{c.personal}<Arrow/></RouteLink></div></div></section>
  </div>;
}
