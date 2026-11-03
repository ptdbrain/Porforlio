import { useCallback, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

const storyPaths = new Set(['/','/work','/personal']);

export function useRouteTransition(mainRef, simple) {
  const current = useRef({version:0, transition:null, animation:null});
  useEffect(() => () => {
    current.current.version++;
    current.current.transition?.skipTransition();
    current.current.animation?.cancel();
    delete document.documentElement.dataset.routeMotion;
    delete document.documentElement.dataset.routeDirection;
    document.documentElement.style.removeProperty('--route-surface');
  }, [simple]);

  return useCallback(({from,to,update,restore}) => {
    const state = current.current;
    const version = ++state.version;
    state.transition?.skipTransition();
    state.animation?.cancel();
    state.transition = null; state.animation = null;
    const html = document.documentElement;
    const story = from !== to && storyPaths.has(from) && storyPaths.has(to);
    const reduced = simple || matchMedia('(prefers-reduced-motion: reduce)').matches;
    const direction = to === '/work' || (to === '/' && from === '/personal') ? 'left' : 'right';
    let committed = false;
    function commit() {
      if (version !== state.version || committed) return;
      committed = true;
      flushSync(update);
      restore?.();
      if(html.dataset.routeMotion&&mainRef.current)html.style.setProperty('--route-surface',getComputedStyle(mainRef.current).getPropertyValue('--bg'));
    }
    function clean() {
      if (version !== state.version) return;
      delete html.dataset.routeMotion;
      delete html.dataset.routeDirection;
      html.style.removeProperty('--route-surface');
      state.transition = null; state.animation = null;
    }
    if (reduced || from === to) {
      clean(); commit();
      return Promise.resolve();
    }
    html.dataset.routeMotion = story ? 'story' : 'page';
    html.dataset.routeDirection = direction;
    function fallback() {
      commit();
      if (version !== state.version) return Promise.resolve();
      const main = mainRef.current;
      if (!main?.animate) { clean(); return Promise.resolve(); }
      const offset = (innerWidth < 768 ? 18 : 36) * (direction === 'left' ? -1 : 1);
      state.animation = main.animate([
        {opacity:.15,transform:`translate3d(${story?offset:0}px,${story?0:8}px,0)`},
        {opacity:1,transform:'translate3d(0,0,0)'},
      ], {duration:story?520:300,easing:'cubic-bezier(.22,1,.36,1)'});
      return state.animation.finished.catch(()=>{}).finally(clean);
    }
    if (!document.startViewTransition) return fallback();
    try {
      // Rendering is suspended inside the native callback: never wait for RAF
      // here. Commit and restore synchronously so the snapshot can be captured.
      state.transition = document.startViewTransition(commit);
      state.transition.ready.catch(()=>{});
      return state.transition.finished.catch(()=>{}).finally(clean);
    } catch {
      return fallback();
    }
  }, [mainRef,simple]);
}
