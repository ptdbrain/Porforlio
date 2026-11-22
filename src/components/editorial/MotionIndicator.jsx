import {useEffect, useLayoutEffect, useRef} from 'react';

const useBrowserLayoutEffect=typeof window==='undefined'?useEffect:useLayoutEffect;

// Measure only on selection/resize; interpolate on the compositor, never on scroll.
export function MotionIndicator({selection, selector, rail=false}) {
  const ref=useRef(null);
  useBrowserLayoutEffect(()=>{
    const marker=ref.current, parent=marker.parentElement;
    let frame=0, disposed=false;
    const resize=window.ResizeObserver?new ResizeObserver(schedule):null;
    function measure(){
      frame=0;
      const target=parent.querySelector(selector);
      if(!target?.getClientRects().length){marker.hidden=true;return;}
      // Use layout coordinates: the menu's own entry transform must not leave
      // the rail offset after the links finish animating.
      const width=target.offsetWidth,height=target.offsetHeight;
      if(!width||!height){marker.hidden=true;return;}
      const vertical=rail||matchMedia('(max-width:760px)').matches;
      const x=vertical?0:target.offsetLeft;
      const y=vertical?target.offsetTop:target.offsetTop+height-2;
      marker.style.transform=`translate3d(${x}px,${y}px,0) scale(${vertical?2:width},${vertical?height:2})`;
      marker.hidden=false;
      parent.dataset.indicatorReady='true';
    }
    function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(measure);}
    resize?.observe(parent);
    parent.querySelectorAll(rail?'[role="tab"]':'a').forEach(node=>resize?.observe(node));
    // Route flushSync must position the new marker before the browser captures
    // its shared snapshot; a RAF here would run after that snapshot is taken.
    measure();
    document.fonts?.ready.then(schedule);
    window.addEventListener('resize',schedule,{passive:true});
    return()=>{disposed=true;cancelAnimationFrame(frame);resize?.disconnect();window.removeEventListener('resize',schedule);};
  },[selection,selector,rail]);
  return <span ref={ref} className="motion-indicator" aria-hidden="true" hidden/>;
}
