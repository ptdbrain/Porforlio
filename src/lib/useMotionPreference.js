import { useEffect, useState } from 'react';
const storedPreference=()=>{try{return localStorage.getItem('ptd-motion')||'auto';}catch{return 'auto';}};
const reduced=()=>typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowPower=()=>typeof window!=='undefined'&&typeof navigator!=='undefined'&&(navigator.connection?.saveData||(navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4));
export function useMotionPreference(deferInitial=false){
 const [preference,setPreference]=useState(()=>typeof window==='undefined'||deferInitial?'auto':storedPreference());
 const [systemReduced,setSystemReduced]=useState(()=>deferInitial?false:reduced());
 const [weakDevice,setWeakDevice]=useState(()=>deferInitial?false:lowPower());
 useEffect(()=>{if(deferInitial){setPreference(storedPreference());setWeakDevice(lowPower());}const media=matchMedia('(prefers-reduced-motion: reduce)');setSystemReduced(media.matches);const change=()=>setSystemReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[deferInitial]);
 const simple=systemReduced||preference==='simple'||(preference==='auto'&&weakDevice);
 const toggle=()=>{const value=simple?'full':'simple';setPreference(value);try{localStorage.setItem('ptd-motion',value);}catch{}};
 return {simple,toggle,systemReduced,weakDevice,preference};
}
