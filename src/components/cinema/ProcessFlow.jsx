import { useCallback, useEffect, useRef, useState } from 'react';
import { localize as l } from '../../content/copy';
import { useSectionEntrance } from './useSectionEntrance';

const desktopPath='M125 68 C210 68 250 118 375 118 S510 48 625 48 S770 95 875 95';
const mobilePath='M44 45 C112 95 20 145 44 225 S114 330 44 405 S15 520 44 585';
function StepShape({shape}) {
 return <svg viewBox="0 0 64 64" className={`step-shape shape-${shape}`} aria-hidden="true" fill="none">
  {shape==='question'&&<><circle cx="32" cy="32" r="25"/><path d="M25 23C25 13 43 15 40 26C38 32 31 30 31 38"/><circle className="shape-dot" cx="31" cy="46" r="1.5"/></>}
  {shape==='experiment'&&<><path d="M32 6L56 20V44L32 58L8 44V20Z"/><circle className="experiment-dot dot-a" cx="22" cy="32" r="3"/><circle className="experiment-dot dot-b" cx="32" cy="25" r="3"/><circle className="experiment-dot dot-c" cx="42" cy="37" r="3"/></>}
  {shape==='build'&&<><rect className="build-block block-a" x="10" y="10" width="18" height="18" rx="3"/><rect className="build-block block-b" x="36" y="10" width="18" height="18" rx="3"/><rect className="build-block block-c" x="23" y="36" width="18" height="18" rx="3"/><path d="M19 28V32H45V28M32 32V36"/></>}
  {shape==='improve'&&<><circle cx="32" cy="32" r="25"/><path className="improve-check" d="M19 32L28 41L45 23"/></>}
 </svg>;
}
function FlowPath({path,id,animationRef,className,height=720}) {
 return <svg className={`process-path ${className}`} viewBox={className==='process-path-desktop'?'0 0 1000 180':`0 0 140 ${height}`} preserveAspectRatio="none" aria-hidden="true">
  <path className="process-path-base" d={path}/><path className="process-path-draw" id={id} d={path} pathLength="1"/>
  <circle className="process-signal" r={className==='process-path-desktop'?5:4}><animateMotion ref={animationRef} dur="0.75s" begin="indefinite" fill="freeze"><mpath href={`#${id}`}/></animateMotion></circle>
 </svg>;
}
export function ProcessFlow({content,language,simple}) {
 const root=useRef(null),desktopSignal=useRef(null),mobileSignal=useRef(null);
 const [mobileGeometry,setMobileGeometry]=useState({path:mobilePath,height:720});
 useEffect(()=>{
  const element=root.current?.querySelector('.process-flow');if(!element||!('ResizeObserver' in window))return;
  const query=matchMedia('(max-width:767px)');
  const measure=()=>{
   if(!query.matches)return;
   const rect=element.getBoundingClientRect();
   const points=[...element.querySelectorAll('.process-node')].map(node=>{const bounds=node.getBoundingClientRect();return Number((bounds.top+bounds.height/2-rect.top).toFixed(1));});
   if(!points.length)return;
   const path=points.slice(1).reduce((value,y,index)=>{const previous=points[index],delta=y-previous;return `${value} C104 ${previous+delta*.35} -6 ${previous+delta*.65} 44 ${y}`;},`M44 ${points[0]}`);
   const height=Math.max(1,Math.round(rect.height));
   setMobileGeometry(previous=>previous.path===path&&previous.height===height?previous:{path,height});
  };
  const observer=new ResizeObserver(measure);observer.observe(element);query.addEventListener('change',measure);measure();
  return()=>{observer.disconnect();query.removeEventListener('change',measure);};
 },[]);
 const enter=useCallback(()=>{desktopSignal.current?.beginElement?.();mobileSignal.current?.beginElement?.();},[]);
 useSectionEntrance(root,simple,enter);
 return <section className="idea-process cinema-cream" id="manifesto" ref={root}>
  <div className="page-width"><div className="process-top"><span className="eyebrow">{content.eyebrow}</span><span className="eyebrow">THINK → TEST → BUILD</span></div><h2>{l(content.heading,language)}</h2><p className="process-intro">{l(content.intro,language)}</p>
  <div className="process-flow">
   <FlowPath path={desktopPath} id="process-curve-desktop" animationRef={desktopSignal} className="process-path-desktop"/>
   <FlowPath path={mobileGeometry.path} height={mobileGeometry.height} id="process-curve-mobile" animationRef={mobileSignal} className="process-path-mobile"/>
   <ol className="process-steps">{content.steps.map((step,index)=><li key={step.id} className={`process-step step-${step.id}`} style={{'--step-index':index}}>
     <div className="process-step-button"><span className="process-node"><StepShape shape={step.shape}/></span><span className="process-label">0{index+1} — {step.label}</span><strong>{l(step.title,language)}</strong><span className="process-description">{l(step.description,language)}</span></div>
    </li>)}</ol>
  </div><p className="process-ending"><span aria-hidden="true"/>{l(content.ending,language)}</p></div>
 </section>;
}
