import { useEffect } from 'react';

export function useSectionEntrance(ref, simple, onEnter) {
 useEffect(() => {
  const element=ref.current;
  if(!element||simple||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  let timer;
  const enter=()=>{element.classList.add('is-entered');timer=setTimeout(()=>onEnter?.(),650);};
  const rect=element.getBoundingClientRect();
  element.classList.add('section-motion-ready');
  if(rect.top<innerHeight*.85&&rect.bottom>0){enter();return()=>clearTimeout(timer);}
  const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){enter();observer.disconnect();}},{threshold:.12});
  observer.observe(element);
  return()=>{clearTimeout(timer);observer.disconnect();};
 },[ref,simple,onEnter]);
}
