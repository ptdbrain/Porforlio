import { useRef } from 'react';
import { Arrow, CvLink } from '../editorial/Shared';
import { localize as l } from '../../content/copy';
import { usePointerDepth } from './CinemaMotion';
export function ColdOpenHero({data,language,t,c,simple}){
 const root=useRef(null);usePointerDepth(root,simple);
 return <section className="cold-open" id="intro" data-cinema-scene="cold-open" data-scene-range="pinned" ref={root}>
  <div className="cold-stage page-width"><div className="cold-identity"><span className="eyebrow">{c.work}</span><p>{c.currentRole}: {l(data.identity.currentRole,language)||c.rolePending}</p></div>
  <h1>{c.headline.map((line,index)=><span className={`cold-line cold-line-${index+1}`} key={line}><span style={{'--delay':`${index*90}ms`}}>{line}</span></span>)}</h1>
  <p className="cold-focus">{c.focus}</p><div className="hero-actions cold-actions"><a href="#experience" className="button button-accent">{c.workOverview}<Arrow/></a><CvLink identity={data.identity} t={t}/></div>
  <a className="cold-scroll" href="#manifesto">↓ <span>{c.scroll}</span></a></div>
 </section>;
}
