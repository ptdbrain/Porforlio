import {useEffect} from 'react';
// Ephemeral, first-party events only. No cookies, IDs, query text or network calls.
// Integrators may subscribe to `ptd:analytics` with their own consent policy.
export function usePortfolioEvents(path) {
 useEffect(()=>{
  if(navigator.doNotTrack==='1'||navigator.globalPrivacyControl)return;
  const emit=(event,detail={})=>window.dispatchEvent(new CustomEvent('ptd:analytics',{detail:{event,path,...detail}}));
  const seen=new Set();let frame;
  emit('page_view');
  const click=event=>{const link=event.target.closest('a');if(!link)return;const url=new URL(link.href);if(link.getAttribute('href')?.endsWith('.pdf'))emit('cv_click');else if(url.origin===location.origin&&url.pathname.startsWith('/projects/'))emit('case_study_open',{project:url.pathname.split('/').pop()});else if(link.matches('.button,.text-link,.email-link,.v4-email'))emit('cta_click',{target:url.origin===location.origin?url.pathname:url.protocol==='mailto:'?'email':'external'});};
  const scroll=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const height=document.documentElement.scrollHeight-innerHeight;if(height<=0)return;const depth=scrollY/height*100;for(const threshold of [25,50,75,100])if(depth>=threshold-1&&!seen.has(threshold)){seen.add(threshold);emit('scroll_depth',{depth:threshold});}});};
  document.addEventListener('click',click);window.addEventListener('scroll',scroll,{passive:true});
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('click',click);window.removeEventListener('scroll',scroll);};
 },[path]);
}
