import { LazyMotion } from 'motion/react';
import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
const SceneContext=createContext(null);
const loadFeatures=()=>import('./motionFeatures').then(module=>module.default);
const clamp=value=>Math.max(0,Math.min(1,value));
export function CinemaMotion({simple,children}){
 const root=useRef(null),callbacks=useRef(new Map());
 const register=useCallback((id,fn)=>{callbacks.current.set(id,fn);return()=>callbacks.current.delete(id);},[]);
 useEffect(()=>{
  const element=root.current;if(simple||!element||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  let disposed=false,trigger,observer,resizeObserver,refreshFrame;const visible=new Set();
  const update=()=>{
   if(disposed||document.hidden)return;
   const viewport=innerHeight;
   const entries=[...visible].map(node=>({node,rect:node.getBoundingClientRect()}));
   const current=entries.find(({rect})=>rect.top<=viewport*.55&&rect.bottom>=viewport*.55)||entries[0];
   if(!current){delete element.dataset.activeScene;return;}
   const {node,rect}=current;
   const progress=node.dataset.sceneRange==='pinned'?clamp((76-rect.top)/Math.max(1,rect.height-viewport+76)):clamp((viewport-rect.top)/(viewport+rect.height));
   node.style.setProperty('--p',progress.toFixed(5));element.dataset.activeScene=node.dataset.cinemaScene;
   callbacks.current.get(node.dataset.cinemaScene)?.(progress);
  };
  Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([core,plugin])=>{
   if(disposed)return;
   const gsap=core.gsap||core.default,ScrollTrigger=plugin.ScrollTrigger||plugin.default;
   gsap.registerPlugin(ScrollTrigger);
   observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else{visible.delete(entry.target);entry.target.style.setProperty('--p',entry.boundingClientRect.top<0?'1':'0');}}update();},{threshold:[0,.1]});
   element.querySelectorAll('[data-cinema-scene]').forEach(node=>observer.observe(node));
   element.classList.add('cinema-motion');
   trigger=ScrollTrigger.create({trigger:element,start:'top bottom',end:'bottom top',onUpdate:update,onRefresh:update});
   if('ResizeObserver' in window){resizeObserver=new ResizeObserver(()=>{cancelAnimationFrame(refreshFrame);refreshFrame=requestAnimationFrame(()=>{if(!disposed)trigger?.refresh();});});resizeObserver.observe(element);}
   update();
  }).catch(()=>{element.classList.remove('cinema-motion');});
  return()=>{disposed=true;trigger?.kill();observer?.disconnect();resizeObserver?.disconnect();cancelAnimationFrame(refreshFrame);element.classList.remove('cinema-motion');delete element.dataset.activeScene;};
 },[simple]);
 return <SceneContext.Provider value={register}><LazyMotion features={loadFeatures} strict><div className={`kinetic-cinema ${simple?'cinema-simple':''}`} ref={root}>{children}</div></LazyMotion></SceneContext.Provider>;
}
export function useScene(id,onProgress){
 const register=useContext(SceneContext),callback=useRef(onProgress);callback.current=onProgress;
 useEffect(()=>register?.(id,progress=>callback.current?.(progress)),[register,id]);
}
export function usePointerDepth(ref,simple){
 useEffect(()=>{
  const node=ref.current;
  if(simple||!node||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  let frame,visible=false;
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)reset();});observer.observe(node);
  function move(event){if(!visible)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const rect=node.getBoundingClientRect();node.style.setProperty('--mx',`${Math.max(-10,Math.min(10,(event.clientX-rect.left)/rect.width*20-10))}px`);node.style.setProperty('--my',`${Math.max(-10,Math.min(10,(event.clientY-rect.top)/rect.height*20-10))}px`);});}
  function reset(){cancelAnimationFrame(frame);node.style.setProperty('--mx','0px');node.style.setProperty('--my','0px');}
  node.addEventListener('pointermove',move,{passive:true});node.addEventListener('pointerleave',reset);
  return()=>{observer.disconnect();cancelAnimationFrame(frame);node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',reset);};
 },[ref,simple]);
}
