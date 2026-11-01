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
    const mutation = new MutationObserver(observe);
    html.classList.add('motion-enabled');
    observe();
    mutation.observe(document.getElementById('main-content'), {childList:true, subtree:true});
    const change = () => { if (media.matches) html.classList.remove('motion-enabled'); };
    media.addEventListener('change', change);
    return () => {
      observer.disconnect();mutation.disconnect();
      media.removeEventListener('change', change);
      html.classList.remove('motion-enabled');
    };
  }, [path, language, disabled]);
}
