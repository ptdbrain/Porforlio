import {useEffect,useRef,useState} from 'react';

const effects=['slide','book','iris','curtain','zoom','tilt'];
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='simple';

// Keep the visible image until the requested original has decoded. Rapid input
// follows the requested index; an older request can never replace a newer one.
export function useImageSequence(asset,gallery) {
  const valid=(gallery||[]).filter(item=>item?.src);
  const images=valid.some(item=>item.src===asset?.src)?valid:asset?.src?[asset,...valid]:valid;
  const imagesRef=useRef(images);imagesRef.current=images;
  const initial=Math.max(0,images.findIndex(item=>item.src===asset?.src));
  const [frame,setFrame]=useState(()=>({current:asset,index:initial,previous:null,effect:'slide',direction:1,step:0}));
  const [pending,setPending]=useState(false),[error,setError]=useState(false);
  const displayed=useRef(frame),requested=useRef(initial),sequence=useRef(0),mounted=useRef(true);
  displayed.current=frame;

  function reset(index=initial) {
    sequence.current++;requested.current=index;setPending(false);setError(false);
    const next={current:imagesRef.current[index]||asset,index,previous:null,effect:'slide',direction:1,step:0};
    displayed.current=next;setFrame(next);
  }
  useEffect(()=>{mounted.current=true;reset();return()=>{mounted.current=false;sequence.current++;};},[asset?.src]);
  useEffect(()=>{
    if(!frame.previous)return;
    const timer=setTimeout(()=>setFrame(current=>current.step===frame.step?{...current,previous:null}:current),680);
    return()=>clearTimeout(timer);
  },[frame.step,frame.previous]);

  async function move(direction) {
    const list=imagesRef.current;
    if(list.length<2)return;
    const index=(requested.current+direction+list.length)%list.length;
    requested.current=index;
    const version=++sequence.current,source=list[index];
    setPending(true);setError(false);
    try {
      const image=new Image();
      const loaded=new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;});
      image.src=source.src;
      await loaded;
      if(image.decode)await image.decode();
      if(!mounted.current||version!==sequence.current)return;
      const old=displayed.current;
      const next={current:source,index,previous:reduced()?null:old.current,effect:effects[old.step%effects.length],direction,step:old.step+1};
      displayed.current=next;setFrame(next);setPending(false);
    } catch {
      if(!mounted.current||version!==sequence.current)return;
      requested.current=displayed.current.index;setPending(false);setError(true);
    }
  }
  return {...frame,images,pending,error,reset,move};
}
