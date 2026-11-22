import { useEffect } from 'react';

export function useSiteMotion(path, language, disabled) {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const main = document.getElementById('main-content');
    if (disabled || media.matches || !main || !('IntersectionObserver' in window)) return;
    const html = document.documentElement;
    const observed = new Set();
    const reveal = node => {
      node.classList.add('is-revealed');
      observer.unobserve(node);
      observed.delete(node);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
    }, {threshold:.06, rootMargin:'0px 0px -20px 0px'});
    function observe() {
      for (const node of observed) if (!node.isConnected) {observer.unobserve(node);observed.delete(node);}
      main.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(node => {
        if (!observed.has(node)) {observed.add(node);observer.observe(node);}
      });
    }
    // Keyboard focus must never wait for an intersection or a stagger delay.
    const focus = event => {
      let node = event.target.closest('[data-reveal]');
      while (node && main.contains(node)) {reveal(node);node = node.parentElement.closest('[data-reveal]');}
    };
    const portrait = main.querySelector('.hero-portrait>.photo');
    const hero = portrait?.closest('.home-hero');
    const fine = matchMedia('(hover:hover) and (pointer:fine)');
    let frame = 0, scanFrame = 0, visible = false;
    function reset() {
      cancelAnimationFrame(frame);frame = 0;
      portrait?.style.removeProperty('--portrait-x');portrait?.style.removeProperty('--portrait-y');
    }
    const portraitObserver = hero ? new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (!visible) reset();
    }) : null;
    if (hero) portraitObserver.observe(hero);
    const pointer = event => {
      if (!visible || !fine.matches || document.hidden || main.closest('[inert]') || media.matches) return;
      cancelAnimationFrame(frame);
      const x = ((event.clientX / innerWidth) - .5) * 10;
      const y = ((event.clientY / innerHeight) - .5) * 12;
      frame = requestAnimationFrame(() => {
        frame = 0;
        portrait.style.setProperty('--portrait-x', `${x}px`);
        portrait.style.setProperty('--portrait-y', `${y}px`);
      });
    };
    const mutation = new MutationObserver(() => {
      if (!scanFrame) scanFrame = requestAnimationFrame(() => {scanFrame = 0;observe();});
    });
    const visibility = () => {if (document.hidden) reset();};
    const change = () => {if (media.matches) {html.classList.remove('motion-enabled');reset();}};
    html.classList.add('motion-enabled');
    observe();
    mutation.observe(main, {childList:true, subtree:true});
    main.addEventListener('focusin', focus);
    hero?.addEventListener('pointermove', pointer, {passive:true});
    hero?.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', change);
    return () => {
      observer.disconnect();portraitObserver?.disconnect();mutation.disconnect();reset();cancelAnimationFrame(scanFrame);
      main.removeEventListener('focusin', focus);
      hero?.removeEventListener('pointermove', pointer);hero?.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', change);
      html.classList.remove('motion-enabled');
    };
  }, [path, language, disabled]);
}
