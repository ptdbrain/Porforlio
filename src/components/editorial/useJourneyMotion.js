import {useEffect} from 'react';

// Geometry comes from the unchanged article boxes. The camera and progress
// bars own compositor transforms; React updates only when the chapter changes.
export function useJourneyMotion(root, onChapter, simple) {
  useEffect(()=>{
    const element=root.current;
    if(!element||!window.IntersectionObserver)return;
    const chapters=[...element.querySelectorAll('[data-chapter]')];
    const mobile=matchMedia('(max-width:760px)');
    const reduced=matchMedia('(prefers-reduced-motion:reduce)');
    const animated=!simple&&!reduced.matches;
    const visible=new Set(),revealed=new Set();
    let frame=0,timer=0,previous=-1,wasVisible=false,lastY=scrollY,disposed=false;
    const clamp=value=>Math.max(0,Math.min(1,value));
    function update(){
      frame=0;
      const positions=[...visible].map(node=>({node,rect:node.getBoundingClientRect()}));
      const anchor=innerHeight*.42;
      const current=positions.find(({rect})=>rect.top<=anchor&&rect.bottom>=anchor)||positions.sort((a,b)=>Math.abs(a.rect.top-anchor)-Math.abs(b.rect.top-anchor))[0];
      if(!current){wasVisible=false;element.classList.remove('is-journey-in-view');return;}
      if(animated)element.classList.add('is-journey-in-view');
      const index=Number(current.node.dataset.chapter);
      if(index!==previous||!wasVisible){
        onChapter(index);
        if(animated){
          element.dataset.journeyDirection=scrollY<lastY?'backward':'forward';
          element.classList.add('is-changing');
          clearTimeout(timer);timer=setTimeout(()=>element.classList.remove('is-changing'),1100);
        }
        previous=index;
      }
      wasVisible=true;lastY=scrollY;
      if(!animated)return;
      const progress=clamp((anchor-current.rect.top)/Math.max(1,current.rect.height));
      const travel=progress-.5;
      const camera=mobile.matches?current.node.querySelector('.journey-camera'):element.querySelectorAll('.timeline-photo-layer .journey-camera')[index];
      if(camera)camera.style.transform=`translate3d(${(travel*(mobile.matches?4:14)).toFixed(2)}px,${(travel*(mobile.matches?-8:-20)).toFixed(2)}px,0) rotate(${(travel*(mobile.matches?0:1.5)).toFixed(2)}deg)`;
      const orbit=element.querySelector('.journey-orbit');
      if(orbit)orbit.style.transform=`rotate(${(progress*70-35).toFixed(2)}deg)`;
      const bar=element.querySelector('.journey-stage-progress>i');
      if(bar)bar.style.transform=`scaleX(${progress.toFixed(4)})`;
      for(const {node,rect} of positions){
        // Text only moves at the edges. The central reading zone is exactly
        // neutral; article geometry never depends on these inner transforms.
        const entry=clamp((rect.top-innerHeight*.12)/(innerHeight*.65));
        const leave=clamp((innerHeight*.15-rect.bottom)/(innerHeight*.45));
        const edge=entry-leave;
        const side=Number(node.dataset.chapter)%2?-1:1;
        const title=node.querySelector('.journey-type-camera');
        const text=node.querySelector('.journey-text-camera');
        const strength=mobile.matches ? .45 : 1;
        if(title)title.style.transform=edge===0?'none':`perspective(900px) translate3d(${(edge*side*20*strength).toFixed(2)}px,${(entry*10*strength).toFixed(2)}px,0) rotateY(${(edge*side*-5*strength).toFixed(2)}deg)`;
        if(text)text.style.transform=edge===0?'none':`perspective(1000px) translate3d(${(edge*side*-16*strength).toFixed(2)}px,${(edge*8*strength).toFixed(2)}px,0) rotateY(${(edge*side*2*strength).toFixed(2)}deg)`;
        const line=node.querySelector('.journey-chapter-progress>i');
        if(line)line.style.transform=`scaleX(${clamp((innerHeight*.7-rect.top)/Math.max(1,rect.height)).toFixed(4)})`;
      }
    }
    function schedule(){if(!frame&&!document.hidden&&!disposed)frame=requestAnimationFrame(update);}
    const observer=new IntersectionObserver(entries=>{
      for(const {target,isIntersecting} of entries){if(isIntersecting)visible.add(target);else visible.delete(target);}
      schedule();
    });
    chapters.forEach(node=>observer.observe(node));
    const reveals=animated?new IntersectionObserver(entries=>{
      for(const {target,isIntersecting} of entries){
        const show=isIntersecting||target.contains(document.activeElement);
        target.classList.toggle('is-journey-visible',show);
        if(show)revealed.add(target);else revealed.delete(target);
      }
    },{rootMargin:'48px 0px',threshold:0}):null;
    element.querySelectorAll('[data-journey-reveal]').forEach(node=>reveals?.observe(node));
    const resize=window.ResizeObserver?new ResizeObserver(schedule):null;
    chapters.forEach(node=>resize?.observe(node));
    function focus(event){
      let node=event.target.closest('[data-journey-reveal]');
      while(node&&element.contains(node)){node.classList.add('is-journey-visible');revealed.add(node);node=node.parentElement.closest('[data-journey-reveal]');}
      schedule();
    }
    function visibility(){if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();}
    if(animated)element.classList.add('journey-motion');
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});
    document.addEventListener('visibilitychange',visibility);element.addEventListener('focusin',focus);
    schedule();
    return()=>{
      disposed=true;cancelAnimationFrame(frame);clearTimeout(timer);observer.disconnect();reveals?.disconnect();resize?.disconnect();
      window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);
      document.removeEventListener('visibilitychange',visibility);element.removeEventListener('focusin',focus);
      element.classList.remove('journey-motion','is-changing','is-journey-in-view');delete element.dataset.journeyDirection;
      revealed.forEach(node=>node.classList.remove('is-journey-visible'));
      element.querySelectorAll('.journey-camera,.journey-orbit,.journey-stage-progress>i,.journey-chapter-progress>i,.journey-type-camera,.journey-text-camera').forEach(node=>node.style.removeProperty('transform'));
    };
  },[root,onChapter,simple]);
}
