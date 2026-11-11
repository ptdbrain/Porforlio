import {localize as l} from '../../content/copy';
import {responsiveImage} from '../../lib/images.mjs';

function Layer({asset,imageRef,label,language,previous=false}) {
  if(!asset?.src)return null;
  const dimensions=responsiveImage(asset.src);
  const image=<img ref={imageRef} className="lightbox-image" src={asset.src} width={dimensions.width} height={dimensions.height} alt={previous?'':l(asset.alt,language)||label} decoding="async"/>;
  return asset.rotate===-90?<div className="photo-rotation">{image}</div>:image;
}

export function GalleryStage({sequence,imageRef,label,language}) {
  const touch=event=>{if(event.pointerType==='touch')event.currentTarget.dataset.touchStart=JSON.stringify([event.clientX,event.clientY]);};
  const swipe=event=>{
    const start=event.currentTarget.dataset.touchStart;delete event.currentTarget.dataset.touchStart;
    if(!start||window.visualViewport?.scale>1)return;
    const [x,y]=JSON.parse(start),dx=event.clientX-x,dy=event.clientY-y;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)sequence.move(dx<0?1:-1);
  };
  return <div className="gallery-stage" data-transition={sequence.effect} data-step={sequence.step} style={{'--gallery-direction':sequence.direction}} aria-busy={sequence.pending} onPointerDown={touch} onPointerUp={swipe} onPointerCancel={event=>delete event.currentTarget.dataset.touchStart}>
    {sequence.previous&&<div className="gallery-layer gallery-layer-previous" aria-hidden="true" key={`old-${sequence.step}`}><Layer asset={sequence.previous} label={label} language={language} previous/></div>}
    <div className="gallery-layer gallery-layer-current" key={`current-${sequence.step}`}><Layer asset={sequence.current} label={label} language={language} imageRef={imageRef}/></div>
    <span className="gallery-loading" aria-hidden="true" hidden={!sequence.pending}/>
  </div>;
}
