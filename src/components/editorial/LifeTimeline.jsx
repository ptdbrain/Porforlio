import {useRef,useState} from 'react';
import {localize as l} from '../../content/copy';
import {responsiveImage} from '../../lib/images.mjs';
import {useJourneyMotion} from './useJourneyMotion';
import {Arrow,EmptyText,ExternalLink,Photo,RouteLink} from './Shared';

const effects=['assemble','aperture','portal'];

function Scene({chapter,index,language,t,mobile=false}){
  const asset=chapter.image;
  const source=responsiveImage(asset?.src);
  return <div className="journey-scene" data-scene-effect={effects[index%effects.length]}>
    <div className="journey-camera">
      <span className="journey-frame-echo" aria-hidden="true"/>
      <div className="journey-frame">
        <Photo asset={asset} label={l(chapter.label,language)} language={language} t={t} interactive={mobile} gallery={[asset,...chapter.gallery]}/>
        {asset?.src&&<div className="journey-shards" aria-hidden="true">{Array.from({length:5},(_,i)=><div className="journey-shard" key={i} style={{'--shard-index':i,'--shard-side':i%2?1:-1}}><img src={source.src} alt="" loading="lazy" decoding="async" style={{objectFit:asset.fit||'cover',objectPosition:asset.position||'center'}}/></div>)}</div>}
        <span className="journey-aperture" aria-hidden="true"/><span className="journey-portal" aria-hidden="true"/>
      </div>
      {chapter.gallery.slice(0,2).map((image,i)=><div className={`journey-satellite satellite-${i}`} aria-hidden="true" key={image.src}><img src={responsiveImage(image.src).src} alt="" loading="lazy" decoding="async" style={{objectFit:image.fit||'cover',objectPosition:image.position||'center'}}/></div>)}
    </div>
  </div>;
}

export function LifeTimeline({chapters,language,t,simple=false}){
  const [active,setActive]=useState(0);
  const root=useRef(null);
  useJourneyMotion(root,setActive,simple);
  if(!chapters.length)return null;
  const current=chapters[Math.min(active,chapters.length-1)];
  return <div className="life-timeline journey-timeline" ref={root}>
    <div className="timeline-sticky">
      <div className="journey-stage-meta"><span className="journey-number-window" aria-hidden="true"><b key={active}>{String(active+1).padStart(2,'0')}</b></span><span>{current.period}</span><span aria-hidden="true">/ {String(chapters.length).padStart(2,'0')}</span></div>
      <div className="journey-stage"><span className="journey-orbit" aria-hidden="true"/><span className="journey-stage-axis" aria-hidden="true"/>
        <div className="timeline-photo-stack">{chapters.map((chapter,index)=><div className={`timeline-photo-layer ${active===index?'is-active':index<active?'is-past':'is-future'}`} aria-hidden={active!==index} inert={active!==index?'':undefined} key={chapter.id}>
          <Scene chapter={chapter} index={index} language={language} t={t}/>
        </div>)}</div>
      </div>
      <div className="timeline-caption"><span>{t.chapter} 0{active+1}</span><strong key={`${active}:${language}`}>{l(current.label,language)}</strong></div>
      <div className="journey-stage-progress" aria-hidden="true"><i/></div>
    </div>
    <div className="timeline-chapters">{chapters.map((chapter,index)=><article id={`chapter-${chapter.id}`} data-chapter={index} className={`life-chapter ${active===index?'is-active':''}`} key={chapter.id}>
      <span className="chapter-dot" aria-hidden="true"/>
      <div className="journey-chapter-header" data-journey-reveal="heading"><svg className="journey-chapter-mark" viewBox="0 0 120 120" aria-hidden="true" focusable="false" style={{rotate:`${index*45}deg`}}><circle cx="60" cy="60" r="48"/><circle cx="60" cy="60" r="33" strokeDasharray="3 7"/><path d="M60 3v24M60 93v24M3 60h24M93 60h24"/><circle cx="94" cy="26" r="5"/></svg><span className="eyebrow">{t.chapter} / 0{index+1}</span><h3>{l(chapter.label,language)}</h3><span className="journey-chapter-progress" aria-hidden="true"><i/></span></div>
      <div className="mobile-chapter-photo" data-journey-reveal="scene"><Scene chapter={chapter} index={index} language={language} t={t} mobile/></div>
      <div className="journey-chapter-intro" data-journey-reveal="copy"><EmptyText value={chapter.school} language={language} className="chapter-school"/>{chapter.period&&<span className="chapter-period">{chapter.period}</span>}<EmptyText value={chapter.story} language={language}/>{chapter.location?.[language]&&<p>{l(chapter.location,language)}</p>}</div>
      {chapter.achievements.length>0&&<ul className="journey-milestones">{chapter.achievements.map((achievement,i)=><li key={i} data-journey-reveal="milestone"><span className="journey-milestone-marker" aria-hidden="true"/><span>{l(achievement,language)}</span></li>)}</ul>}
      {chapter.links?.filter(link=>link.href).map(link=><p key={link.href} data-journey-reveal="copy"><ExternalLink href={link.href} className="text-link">{l(link.label,language)}</ExternalLink></p>)}
      {chapter.gallery.length>0&&<div className="chapter-gallery">{chapter.gallery.map((image,i)=><Photo motion={['zoom','curtain','iris'][i%3]} motionIndex={i} key={image.src} gallery={chapter.gallery} asset={image} label={l(chapter.label,language)} language={language} t={t}/>)}</div>}
      {chapter.id==='present'&&<RouteLink className="text-link" href="/work">{t.exploreWork}<Arrow/></RouteLink>}
    </article>)}</div>
    <nav className="timeline-markers" aria-label={t.timeline}>{chapters.map((chapter,index)=><a href={`#chapter-${chapter.id}`} className={active===index?'active':''} aria-current={active===index?'step':undefined} key={chapter.id} aria-label={l(chapter.label,language)}><span>0{index+1}</span><i/></a>)}</nav>
  </div>;
}
