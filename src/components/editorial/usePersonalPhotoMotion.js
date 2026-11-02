import { useEffect } from 'react';

export function usePersonalPhotoMotion(root, simple) {
  useEffect(() => {
    const element = root.current;
    if (!element || simple || !window.IntersectionObserver || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const photos = [...element.querySelectorAll('[data-photo-motion]')];
    const visible = new Set();
    const clamp = value => Math.max(0, Math.min(1, value));
    let frame = 0;
    let disposed = false;

    function update() {
      frame = 0;
      const height = innerHeight;
      // The figure stays still; only its inner surface moves. Geometry never
      // depends on the transform we're about to write (no scroll feedback).
      const positions = [...visible].map(photo => [photo, photo.getBoundingClientRect()]);
      for (const [photo, rect] of positions) {
        if (!rect.height) continue;
        const range = Math.min(rect.height, height) * .7;
        const enter = clamp((height - rect.top) / range);
        const leave = clamp((160 - rect.bottom) / range);
        photo.style.setProperty('--photo-fold', (1 - enter + leave * .55).toFixed(4));
        photo.style.setProperty('--photo-travel', (clamp((height - rect.top) / (height + rect.height)) - .5).toFixed(4));
      }
    }
    function schedule() {
      if (!frame && !document.hidden && !disposed) frame = requestAnimationFrame(update);
    }
    const observer = new IntersectionObserver(entries => {
      for (const {target,isIntersecting} of entries) {
        if (isIntersecting) visible.add(target);
        else visible.delete(target);
      }
      schedule();
    }, {rootMargin:'100px 0px'});
    const resize = window.ResizeObserver ? new ResizeObserver(schedule) : null;
    photos.forEach(photo => { observer.observe(photo); resize?.observe(photo); });
    element.classList.add('personal-photo-motion');
    function visibility() {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else schedule();
    }
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    document.addEventListener('visibilitychange',visibility);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame); observer.disconnect(); resize?.disconnect();
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',schedule);
      document.removeEventListener('visibilitychange',visibility);
      element.classList.remove('personal-photo-motion');
      photos.forEach(photo => {
        photo.style.removeProperty('--photo-fold');
        photo.style.removeProperty('--photo-travel');
      });
    };
  }, [root,simple]);
}
