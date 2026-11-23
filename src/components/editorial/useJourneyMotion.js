import {useEffect} from 'react';

const clamp=value=>Math.max(0,Math.min(1,value));
const mix=(from,to,progress)=>from+(to-from)*progress;
const smooth=value=>{const t=clamp(value);return t*t*(3-2*t);};
const transform=(x,y,angle=0,scale=1)=>`translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) rotate(${angle.toFixed(2)}deg) scale(${scale.toFixed(4)})`;

// The scroll range belongs to each chapter canvas, not a shared image column.
// Read stable containers first, then move only their composited child surfaces.
export function useJourneyMotion(root,onChapter,simple){
 useEffect(()=>{
  const element=root.current;if(!element||!window.IntersectionObserver)return;
  const chapters=[...element.querySelectorAll('[data-chapter]')];
  const mobile=matchMedia('(max-width:760px)');
  const animated=!simple&&!matchMedia('(prefers-reduced-motion:reduce)').matches;
  const visible=new Set(),revealed=new Set();
  let frame=0,timer=0,previous=-1,wasVisible=false,lastY=scrollY,disposed=false;
  function update(){
   frame=0;
   const height=innerHeight,top=mobile.matches?120:146;
   const positions=[...visible].map(node=>{
    const scene=node.querySelector('.journey-cinema'),board=node.querySelector('.journey-board');
    const reading=node.querySelector('.journey-reading'),gallery=node.querySelector('.journey-gallery-window');
    return {node,rect:node.getBoundingClientRect(),sceneRect:scene.getBoundingClientRect(),readingRect:reading?.getBoundingClientRect(),width:board.clientWidth,boardHeight:board.clientHeight,gallery,galleryRect:gallery?.getBoundingClientRect(),overflow:gallery?Math.max(0,gallery.scrollWidth-gallery.clientWidth):0};
   });
   const anchor=height*.42;
   const current=positions.find(({rect})=>rect.top<=anchor&&rect.bottom>=anchor)||positions.sort((a,b)=>Math.abs(a.rect.top-anchor)-Math.abs(b.rect.top-anchor))[0];
   if(!current){wasVisible=false;element.classList.remove('is-journey-in-view');return;}
   const index=Number(current.node.dataset.chapter);
   if(index!==previous||!wasVisible){
    onChapter(index);
    if(animated){element.dataset.journeyDirection=scrollY<lastY?'backward':'forward';element.classList.add('is-changing');clearTimeout(timer);timer=setTimeout(()=>element.classList.remove('is-changing'),1100);}
    previous=index;
   }
   wasVisible=true;lastY=scrollY;
   if(!animated)return;
   element.classList.add('is-journey-in-view');
   for(const {node,sceneRect,readingRect,width:w,boardHeight:h,gallery,galleryRect,overflow}of positions){
    const chapter=Number(node.dataset.chapter),reverse=chapter%2===1;
    const arrival=clamp((height*.98-sceneRect.top)/Math.max(1,height*.5));
    const progress=mobile.matches?clamp((height*.6-sceneRect.top)/(sceneRect.height+height*.2)):clamp((height*.88-sceneRect.top)/Math.max(1,height*.88-top-40));
    const travel=smooth((progress-.12)/.76);
    const incoming=1-smooth(arrival);
    node.classList.toggle('is-cinema-visible',sceneRect.top<height&&sceneRect.bottom>top);
    const photo=node.querySelector('.journey-photo-flight'),title=node.querySelector('.journey-title-flight');
    let px,py,tx,ty,angle,scale;
    if(mobile.matches){
     px=(reverse?-1:1)*incoming*65;py=incoming*18;
     tx=(reverse?1:-1)*incoming*45;ty=incoming*8;
     angle=mix(-3,3,progress);scale=1-incoming*.1;
    }else{
     const startsRight=reverse||chapter%3===2;
     px=mix(startsRight?w*.70:0,startsRight?0:w*.70,travel)+(startsRight?1:-1)*incoming*110;
     py=mix(h*.12,h*.08,travel)+incoming*25;
     tx=mix(startsRight?0:w*.30,startsRight?w*.30:0,travel)+(startsRight?-1:1)*incoming*135;
     ty=0;
     angle=mix(startsRight?5:-5,startsRight?-3:3,travel);scale=1-incoming*.12;
    }
    const startsRight=reverse||chapter%3===2;
    const photoBaseX=mobile.matches?0:startsRight?w*.70:0;
    const photoBaseY=mobile.matches?0:h*.12;
    const titleBaseX=mobile.matches?0:startsRight?0:w*.30;
    if(photo&&!photo.matches(':focus-within'))photo.style.transform=transform(px-photoBaseX,py-photoBaseY,angle,scale);
    if(title)title.style.transform=transform(tx-titleBaseX,ty,0,1);
    const copy=node.querySelector('.journey-copy-flight');
    if(copy&&readingRect){
     const enter=clamp((readingRect.top-height*.3)/(height*.55));
     const leave=clamp((height*.15-readingRect.bottom)/(height*.4));
     copy.style.transform=enter===0&&leave===0?'none':transform(0,(enter+leave)*20,0);
    }
    const bar=node.querySelector('.journey-chapter-progress>i');if(bar)bar.style.transform=`scaleX(${progress.toFixed(4)})`;
    const nav=element.querySelectorAll('.timeline-markers a>i')[chapter];if(nav)nav.style.transform=`scaleX(${chapter<index?1:chapter===index?progress:0})`;
    if(gallery&&!mobile.matches&&galleryRect.top<height&&galleryRect.bottom>0&&!gallery.dataset.manual&&overflow){gallery.scrollLeft=overflow*clamp((height*.9-galleryRect.top)/(height*.9+galleryRect.height));}
   }
  }
  function schedule(){if(!frame&&!document.hidden&&!disposed)frame=requestAnimationFrame(update);}
  const observer=new IntersectionObserver(entries=>{
   for(const {target,isIntersecting}of entries){if(isIntersecting)visible.add(target);else{visible.delete(target);target.classList.remove('is-cinema-visible');}}
   schedule();
  });
  chapters.forEach(node=>observer.observe(node));
  const reveals=animated?new IntersectionObserver(entries=>{
   for(const {target,isIntersecting}of entries){const show=isIntersecting||target.contains(document.activeElement);target.classList.toggle('is-journey-visible',show);if(show)revealed.add(target);else revealed.delete(target);}
  },{rootMargin:'48px 0px',threshold:0}):null;
  element.querySelectorAll('[data-journey-reveal]').forEach(node=>reveals?.observe(node));
  const resize=window.ResizeObserver?new ResizeObserver(schedule):null;chapters.forEach(node=>resize?.observe(node));
  function focus(event){let node=event.target.closest('[data-journey-reveal]');while(node&&element.contains(node)){node.classList.add('is-journey-visible');revealed.add(node);node=node.parentElement.closest('[data-journey-reveal]');}schedule();}
  function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();}
  if(animated)element.classList.add('journey-motion');
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',visibility);element.addEventListener('focusin',focus);schedule();
  return()=>{
   disposed=true;cancelAnimationFrame(frame);clearTimeout(timer);observer.disconnect();reveals?.disconnect();resize?.disconnect();
   window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);document.removeEventListener('visibilitychange',visibility);element.removeEventListener('focusin',focus);
   element.classList.remove('journey-motion','is-changing','is-journey-in-view');delete element.dataset.journeyDirection;
   revealed.forEach(node=>node.classList.remove('is-journey-visible'));chapters.forEach(node=>node.classList.remove('is-cinema-visible'));
   element.querySelectorAll('.journey-photo-flight,.journey-title-flight,.journey-copy-flight,.journey-chapter-progress>i,.timeline-markers a>i').forEach(node=>node.style.removeProperty('transform'));
  };
 },[root,onChapter,simple]);
}
