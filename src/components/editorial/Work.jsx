import { useEffect, useRef, useState } from 'react';
import { localize as l } from '../../content/copy';
import { capabilities, experienceSummaries, projectSummaries, workCopy } from '../../content/workV4.mjs';
import { initialWorkView, normalizeWorkView, workProjects, workReturnKey } from '../../lib/workV4.mjs';
import { Arrow, CvLink, ExternalLink, RouteLink } from './Shared';
export { ProjectMeta } from '../work/ProjectElements';

function SystemMap({copy}) {
  const positions = [[22,55],[182,55],[182,165],[22,165]];
  return <div className="v4-system"><svg viewBox="0 0 330 260" role="img" aria-label={copy.mapLabel}>
    <path className="v4-map-wire" d="M82 80H242V190H82"/>
    {positions.map(([x,y],index)=><g key={index}><rect x={x} y={y} width="120" height="50" rx="8"/><text x={x+60} y={y+30} textAnchor="middle">{copy.mapNodes[index]}</text></g>)}
    <path className="v4-map-signal" pathLength="1" d="M82 80H242V190H82"/>
  </svg><p className="v4-mono">{copy.mapCaption}</p></div>;
}

export function Work({data,language,t,simple=false}) {
  const c=workCopy[language];
  const [view,setView]=useState(initialWorkView),[ready,setReady]=useState(false),[restore,setRestore]=useState(null),[copyState,setCopyState]=useState('');
  const root=useRef(null),tabs=useRef([]);
  const active=capabilities.find(cap=>cap.id===view.capability),projects=workProjects(data.projects,view);
  const shown=view.expanded?projects:projects.slice(0,6);
  const technologies=[...new Set(data.projects.flatMap(project=>project.stack))].sort();
  const professional=['geoit-vnpt','ba-gps','robotics-mentor'].map(id=>data.experiences.find(entry=>entry.id===id)).filter(Boolean);
  const research=data.projects.find(project=>project.slug==='dpotm');

  useEffect(()=>{
    const saved=history.state?.workV4;
    if(saved){setView(normalizeWorkView(saved,data.projects));if(Number.isFinite(saved.scroll)&&saved.scroll>=0)setRestore({scroll:saved.scroll,focusSlug:saved.focusSlug});}
    setReady(true);
  },[data.projects]);
  useEffect(()=>{if(ready&&!restore)history.replaceState({...history.state,workV4:{...view,scroll:window.scrollY}},'');},[view,ready,restore]);
  useEffect(()=>{
    if(!ready||!restore)return;
    let secondFrame;
    const frame=requestAnimationFrame(()=>{secondFrame=requestAnimationFrame(()=>{
      const link=[...root.current.querySelectorAll('[data-work-project]')].find(node=>node.dataset.workProject===restore.focusSlug);
      link?.focus({preventScroll:true});window.scrollTo({top:restore.scroll,behavior:'instant'});setRestore(null);
    });});
    return()=>{cancelAnimationFrame(frame);cancelAnimationFrame(secondFrame);};
  },[ready,restore]);
  useEffect(()=>{if(!copyState)return;const timer=setTimeout(()=>setCopyState(''),2500);return()=>clearTimeout(timer);},[copyState]);
  useEffect(()=>{
    const hidden=()=>root.current?.classList.toggle('v4-paused',document.hidden);
    document.addEventListener('visibilitychange',hidden);hidden();return()=>document.removeEventListener('visibilitychange',hidden);
  },[]);

  function changeFilter(patch){setView(previous=>({...previous,...patch,expanded:false}));}
  function chooseCapability(index,focus=false){setView(previous=>({...previous,capability:capabilities[index].id}));if(focus)tabs.current[index]?.focus();}
  function related(capability){
    changeFilter({filter:capability,query:'',technology:''});
    const target=root.current.querySelector('#archive');
    target.scrollIntoView({behavior:simple||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    target.querySelector('h2')?.focus({preventScroll:true});
  }
  function rememberProject(event,project){
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const context={...view,scroll:window.scrollY,focusSlug:project.slug,projectPath:`/projects/${project.slug}`};
    history.replaceState({...history.state,workV4:context},'');try{sessionStorage.setItem(workReturnKey,JSON.stringify(context));}catch{}
  }
  async function copyEmail(){try{await navigator.clipboard.writeText(data.identity.email);setCopyState('success');}catch{setCopyState('failed');}}

  return <div className={`work-v4 ${simple?'v4-simple':''}`} ref={root}>
    <section className="v4-hero" id="intro"><div className="page-width">
      <div className="v4-hero-layout"><div className="v4-hero-copy" data-reveal><span className="v4-label">{c.eyebrow}</span><h1>{c.headline[0]}<br/>{c.headline[1]} <span>{c.product}</span></h1><p className="v4-lead">{c.intro}</p><div className="v4-actions"><a href="#capabilities" className="button button-accent">{c.viewCapabilities}<span aria-hidden="true">↓</span></a><CvLink identity={data.identity} t={t}/></div><a className="v4-quiet" href="#archive">{c.directProjects}<Arrow/></a></div><SystemMap copy={c}/></div>
      <div className="v4-proof">{professional.slice(0,2).map((entry,index)=><div key={entry.id}><span>{c.proofLabels[index]}</span><strong>{entry.organization} · {l(entry.role,language)}</strong><small>{entry.period}</small></div>)}<div><span>{c.proofLabels[2]}</span><strong>{c.proofResearch}</strong></div></div>
    </div></section>

    <section className="v4-section v4-capabilities" id="capabilities" aria-labelledby="v4-cap-title"><span id="skills" className="v4-anchor"/><span id="manifesto" className="v4-anchor"/><div className="page-width">
      <div className="v4-section-heading" data-reveal><span className="v4-label">{c.capLabel}</span><h2 id="v4-cap-title">{c.capTitle}</h2><p className="v4-lead">{c.capIntro}</p></div>
      <div className="v4-tabs" role="tablist" aria-label={c.capTabs}>{capabilities.map((cap,index)=><button key={cap.id} ref={node=>tabs.current[index]=node} className="v4-tab" role="tab" id={`v4-tab-${cap.id}`} aria-selected={cap.id===view.capability} aria-controls="v4-cap-panel" tabIndex={cap.id===view.capability?0:-1} onClick={()=>chooseCapability(index)} onKeyDown={event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();chooseCapability(event.key==='Home'?0:event.key==='End'?capabilities.length-1:(index+(event.key==='ArrowRight'?1:-1)+capabilities.length)%capabilities.length,true);}}}><span aria-hidden="true">0{index+1}</span>{l(cap.title,language)}</button>)}</div>
      <div className="v4-cap-panel" id="v4-cap-panel" role="tabpanel" tabIndex="0" aria-labelledby={`v4-tab-${active.id}`}>
        {capabilities.map(cap=><div key={cap.id} className={`v4-cap-layer ${active.id===cap.id?'is-active':''}`} aria-hidden={active.id!==cap.id} inert={active.id!==cap.id?'':undefined}>
          <div className="v4-cap-grid"><div><span className="v4-label">{c.work}</span><h3>{l(cap.heading,language)}</h3><p>{l(cap.work,language)}</p></div><div><span className="v4-label">{c.tools}</span><ul className="v4-tool-list">{cap.tools.map(tool=><li key={tool}>{tool}</li>)}</ul></div><div><span className="v4-label">{c.output}</span><p>{l(cap.output,language)}</p></div></div>
          <div className="v4-cap-footer"><ol className="v4-cap-flow">{l(cap.flow,language).map((node,index)=><li key={node}>{index>0&&<span aria-hidden="true">→</span>}{node}</li>)}</ol><button className="button button-outline" onClick={()=>related(cap.id)}>{c.related}<Arrow/></button></div>
        </div>)}
      </div>
      <p className="v4-process-note">{c.process}</p>
    </div></section>

    <section className="v4-section v4-experience" id="experience" aria-labelledby="v4-exp-title"><div className="page-width">
      <div className="v4-section-heading" data-reveal><span className="v4-label">{c.expLabel}</span><h2 id="v4-exp-title">{c.expTitle}</h2><p className="v4-lead">{c.expIntro}</p></div>
      {professional.map(entry=><article className="v4-job" key={entry.id} data-reveal><span className="v4-job-period v4-mono">{entry.period}</span><div><h3>{entry.organization}</h3><p className="v4-position">{l(entry.role,language)}</p></div><div><p className="v4-job-summary">{l(experienceSummaries[entry.id],language)}</p><details><summary>{c.scope}</summary>{[['challenge',t.problem],['contribution',t.contribution],['outcome',t.results]].map(([key,label])=><div className="v4-job-detail" key={key}><h4>{label}</h4><p>{l(entry[key],language)}</p></div>)}{entry.evidence&&<ExternalLink href={entry.evidence}>{t.evidence}</ExternalLink>}</details></div></article>)}
      {research&&<article className="v4-research" data-reveal><div><span className="v4-label">{c.researchLabel}</span><h3>{c.researchTitle}</h3><p>{c.researchBody}</p></div><div className="v4-research-links">{research.links.report&&<ExternalLink href={research.links.report}>{c.paper}</ExternalLink>}<RouteLink href={`/projects/${research.slug}`} onClick={event=>rememberProject(event,research)}>{c.researchLink}<Arrow/></RouteLink></div></article>}
      <div className="v4-training"><span className="v4-label">{c.training}</span><div><p>{l(data.training.title,language)} <span className="v4-training-status">{l(data.training.status,language)}</span></p><small>{data.training.organization}</small></div><div className="v4-training-links"><ExternalLink href={data.training.source}>{t.programSource}</ExternalLink>{data.training.evidence&&<ExternalLink href={data.training.evidence}>{t.evidence}</ExternalLink>}</div></div>
    </div></section>

    <section className="v4-section v4-library" id="archive" aria-labelledby="v4-library-title"><span id="selected-work" className="v4-anchor"/><div className="page-width">
      <div className="v4-section-heading" data-reveal><span className="v4-label">{c.libraryLabel}</span><h2 id="v4-library-title" tabIndex="-1">{c.libraryTitle}</h2><p className="v4-lead">{c.libraryIntro}</p></div>
      <div className="v4-library-tools"><div className="v4-filters" role="group" aria-label={c.filters}>{[{id:'all',title:c.all},...capabilities].map(cap=><button key={cap.id} aria-pressed={view.filter===cap.id} onClick={()=>changeFilter({filter:cap.id})}>{l(cap.title,language)}</button>)}</div><div className="v4-search-tools"><label><span>{c.search}</span><input type="search" value={view.query} placeholder={c.placeholder} onChange={event=>changeFilter({query:event.target.value})}/></label><label><span>{c.technology}</span><select value={view.technology} onChange={event=>changeFilter({technology:event.target.value})}><option value="">{c.allTools}</option>{technologies.map(tool=><option key={tool}>{tool}</option>)}</select></label></div></div>
      <p className="v4-count" role="status" aria-atomic="true">{c.showing} {shown.length} / {projects.length} {c.projects}</p>
      <div className="v4-project-grid">{shown.map(project=><RouteLink className="v4-project-card" key={project.slug} href={`/projects/${project.slug}`} data-work-project={project.slug} onClick={event=>rememberProject(event,project)}><span className="v4-card-status">{t[project.status]||project.status}</span><h3>{project.title}</h3><p className="v4-card-summary">{l(projectSummaries[project.slug]||project.description,language)}</p><ul className="v4-card-tags" aria-label={`${project.title} / Stack`}>{project.stack.slice(0,3).map(tool=><li key={tool}>{tool}</li>)}</ul>{l(project.role,language)&&<p className="v4-card-role"><span>{c.role}: </span>{l(project.role,language)}</p>}<span className="v4-card-link">{t.caseStudy}<Arrow/></span></RouteLink>)}</div>
      {shown.length===0&&<div className="v4-empty"><p>{c.empty}</p><button className="button button-outline" onClick={()=>changeFilter({filter:'all',query:'',technology:''})}>{c.clear}<span aria-hidden="true">↺</span></button></div>}
      {shown.length<projects.length&&<div className="v4-library-more"><button className="button button-outline" onClick={()=>setView(previous=>({...previous,expanded:true}))}>{c.more} {projects.length} {c.projects}<span aria-hidden="true">↓</span></button></div>}
    </div></section>

    <section className="v4-contact" id="contact"><div className="page-width" data-reveal><span className="v4-label">{c.contactLabel}</span><h2>{c.contactTitle}</h2><p className="v4-lead">{c.contactBody}</p><a className="v4-email" href={`mailto:${data.identity.email}`}>{data.identity.email}<Arrow/></a><button className="v4-copy" onClick={copyEmail}>{copyState==='success'?c.copied:c.copy}</button><p className="v4-copy-status" role="status">{copyState==='failed'?c.failed:copyState==='success'?c.copied:''}</p><div className="v4-contact-links"><CvLink className="v4-quiet" identity={data.identity} t={t}/><ExternalLink href={data.identity.github}>GitHub</ExternalLink><ExternalLink href={data.identity.linkedin}>LinkedIn</ExternalLink><RouteLink href="/personal">{c.personal}<Arrow/></RouteLink></div></div></section>
  </div>;
}
