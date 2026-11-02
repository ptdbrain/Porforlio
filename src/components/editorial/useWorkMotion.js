import { useEffect } from 'react';

// Work owns its reveals so the site's one-shot observer cannot fight them.
// Scroll only schedules one frame; no render loop runs while the page is idle.
export function useWorkMotion(root, simple) {
  useEffect(() => {
    const element = root.current;
    if (!element || simple || !window.IntersectionObserver || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let disposed = false;
    const items = new Set();
    const visibleSections = new Set();
    const sections = [...element.querySelectorAll(':scope > section')];
    const clamp = value => Math.min(1, Math.max(0, value));

    function update() {
      frame = 0;
      const height = window.innerHeight;
      // Batch geometry reads before style writes.
      const positions = [...visibleSections].map(section => [section, section.getBoundingClientRect()]);
      for (const [section, rect] of positions) {
        const progress = clamp((height - rect.top) / (height + rect.height));
        section.style.setProperty('--work-progress', progress.toFixed(4));
        section.style.setProperty('--work-drift', `${((progress - .5) * (innerWidth < 768 ? 24 : 60)).toFixed(2)}px`);
        section.style.setProperty('--work-arrival', clamp((height - rect.top) / (height * .65)).toFixed(4));
      }
    }
    function schedule() {
      if (!frame && !document.hidden && !disposed) frame = requestAnimationFrame(update);
    }
    const reveals = new IntersectionObserver(entries => {
      for (const {target, isIntersecting, boundingClientRect} of entries) {
        // Reverse the entry direction when returning from further down the page.
        if (!isIntersecting) target.style.setProperty('--work-enter-y', boundingClientRect.bottom <= 0 ? '-24px' : '32px');
        target.classList.toggle('is-revealed', isIntersecting || target.contains(document.activeElement));
      }
    }, {threshold: 0});
    const sectionObserver = new IntersectionObserver(entries => {
      for (const {target, isIntersecting} of entries) {
        if (isIntersecting) visibleSections.add(target);
        else visibleSections.delete(target);
        target.classList.toggle('is-work-visible', isIntersecting);
      }
      schedule();
    });
    function observeItems() {
      for (const item of items) {
        if (!element.contains(item)) { reveals.unobserve(item); items.delete(item); }
      }
      for (const item of element.querySelectorAll('[data-work-reveal]')) {
        if (!items.has(item)) { items.add(item); reveals.observe(item); }
      }
      schedule();
    }
    function focus(event) {
      event.target.closest('[data-work-reveal]')?.classList.add('is-revealed');
    }
    function visibility() {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else schedule();
    }
    element.classList.add('v4-motion');
    sections.forEach(section => sectionObserver.observe(section));
    observeItems();
    const mutation = new MutationObserver(observeItems);
    mutation.observe(element, {childList:true, subtree:true});
    const resize = window.ResizeObserver ? new ResizeObserver(schedule) : null;
    sections.forEach(section => resize?.observe(section));
    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', schedule, {passive:true});
    document.addEventListener('visibilitychange', visibility);
    element.addEventListener('focusin', focus);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      reveals.disconnect(); sectionObserver.disconnect(); mutation.disconnect(); resize?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', visibility);
      element.removeEventListener('focusin', focus);
      element.classList.remove('v4-motion');
      items.forEach(item => { item.classList.remove('is-revealed'); item.style.removeProperty('--work-enter-y'); });
      sections.forEach(section => {
        section.classList.remove('is-work-visible');
        ['--work-progress','--work-drift','--work-arrival'].forEach(property => section.style.removeProperty(property));
      });
    };
  }, [root, simple]);
}
