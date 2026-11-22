import {localize as l} from '../../content/copy';
import {responsiveImage} from '../../lib/images.mjs';
import {useRef} from 'react';

function Layer({asset,imageRef,label,language,previous=false}) {
  if(!asset?.src)return null;
  const dimensions=responsiveImage(asset.src);
  const image=<img ref={imageRef} className="lightbox-image" src={asset.src} width={dimensions.width} height={dimensions.height} alt={previous?'':l(asset.alt,language)||label} decoding="async"/>;
  return asset.rotate===-90?<div className="photo-rotation">{image}</div>:image;
}

export function GalleryStage({sequence,imageRef,label,language}) {
  const gesture=useRef({pointers:new Set(),start:null,blocked:false});
  const touch=event=>{
    if(event.pointerType!=='touch')return;
    const state=gesture.current;
    state.pointers.add(event.pointerId);
    if(state.pointers.size>1){state.blocked=true;state.start=null;}
    else if(!state.blocked)state.start={id:event.pointerId,x:event.clientX,y:event.clientY};
  };
  const release=event=>{
    const state=gesture.current;
    state.pointers.delete(event.pointerId);
    if(!state.pointers.size){state.start=null;state.blocked=false;}
  };
  const swipe=event=>{
    const {start,blocked}=gesture.current;
    release(event);
    if(!start||blocked||event.pointerId!==start.id||window.visualViewport?.scale>1)return;
    const dx=event.clientX-start.x,dy=event.clientY-start.y;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)sequence.move(dx<0?1:-1);
  };
  const cancel=event=>{gesture.current.blocked=true;gesture.current.start=null;release(event);};
  return <div className="gallery-stage" data-transition={sequence.effect} data-step={sequence.step} style={{'--gallery-direction':sequence.direction}} aria-busy={sequence.pending} onPointerDown={touch} onPointerUp={swipe} onPointerCancel={cancel}>
    {sequence.previous&&<div className="gallery-layer gallery-layer-previous" aria-hidden="true" key={`old-${sequence.step}`}><Layer asset={sequence.previous} label={label} language={language} previous/></div>}
    <div className="gallery-layer gallery-layer-current" key={`current-${sequence.step}`}><Layer asset={sequence.current} label={label} language={language} imageRef={imageRef}/></div>
    <span className="gallery-loading" aria-hidden="true" hidden={!sequence.pending}/>
  </div>;
}
