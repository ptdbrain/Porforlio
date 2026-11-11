import {useEffect,useState} from 'react';
export function useReadingSections(ids,key) {
 const [active,setActive]=useState(ids[0]);
 useEffect(()=>{
  const nodes=ids.map(id=>document.getElementById(id)).filter(Boolean);
  let frame;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const anchor=innerHeight*.3;let current=nodes[0];for(const node of nodes){if(node.getBoundingClientRect().top<=anchor)current=node;}setActive(current?.id);});};
  window.addEventListener('scroll',update,{passive:true});update();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);};
 },[key,ids.join('|')]);
 return active;
}
