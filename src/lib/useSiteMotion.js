import { useEffect } from 'react';

export function useSiteMotion(path, language, disabled) {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (disabled || media.matches || !('IntersectionObserver' in window)) return;
    const html = document.documentElement;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    }, {threshold:.06, rootMargin:'0px 0px -20px 0px'});
    const observe = () => document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(node => observer.observe(node));
    const portrait=document.querySelector('.hero-portrait>.photo');
    const fine=matchMedia('(hover:hover) and (pointer:fine)');
    let frame;
    const pointer=event=>{if(!portrait||!fine.matches)return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{portrait.style.setProperty('--portrait-x',`${((event.clientX/innerWidth)-.5)*10}px`);portrait.style.setProperty('--portrait-y',`${((event.clientY/innerHeight)-.5)*12}px`);});};
    if(portrait)window.addEventListener('pointermove',pointer,{passive:true});
    const mutation = new MutationObserver(observe);
    html.classList.add('motion-enabled');
    observe();
    mutation.observe(document.getElementById('main-content'), {childList:true, subtree:true});
    const change = () => { if (media.matches) html.classList.remove('motion-enabled'); };
    media.addEventListener('change', change);
    return () => {
      observer.disconnect();mutation.disconnect();cancelAnimationFrame(frame);window.removeEventListener('pointermove',pointer);portrait?.style.removeProperty('--portrait-x');portrait?.style.removeProperty('--portrait-y');
      media.removeEventListener('change', change);
      html.classList.remove('motion-enabled');
    };
  }, [path, language, disabled]);
}
