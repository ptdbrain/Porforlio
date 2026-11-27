import {useRef,useState} from 'react';
import {localize as l} from '../../content/copy';
import {responsiveImage} from '../../lib/images.mjs';
import {useJourneyMotion} from './useJourneyMotion';
import {Arrow,EmptyText,ExternalLink,Photo,RouteLink} from './Shared';

const effects=['assemble','aperture','portal'];

function JourneyTitle({value}){
  let order=0;
  return <h3 aria-label={value} style={{'--title-factor':value.length>8 ? .68 : value.length>5 ? .84 : 1}}><span className="journey-heading-visual" aria-hidden="true">{value.split(/(\s+)/).map((word,i)=>/\s/.test(word)?word:<span className="journey-heading-word" key={i}>{Array.from(word.normalize('NFC')).map((letter,j)=><span className="journey-glyph-mask" key={j}><span className="journey-glyph" style={{'--glyph-order':order++}}>{letter}</span></span>)}</span>)}</span></h3>;
}

function Scene({chapter,index,language,t}){
  const original=[chapter.image,...chapter.gallery].filter(image=>image?.src);
  const asset=responsiveImage(chapter.image?.src).width<640?original.find(image=>responsiveImage(image.src).width>=800)||chapter.image:chapter.image;
  const album=[asset,...original.filter(image=>image.src!==asset?.src)];
  const source=responsiveImage(asset?.src);
  return <div className="journey-scene" data-scene-effect={effects[index%effects.length]}>
    <div className="journey-camera">
      <span className="journey-frame-echo" aria-hidden="true"/>
      <div className="journey-frame">
        <Photo asset={asset} label={l(chapter.label,language)} language={language} t={t} gallery={album}/>
        {asset?.src&&<div className="journey-shards" aria-hidden="true">{Array.from({length:5},(_,i)=><div className="journey-shard" key={i} style={{'--shard-index':i,'--shard-side':i%2?1:-1}}><img src={source.src} alt="" loading="lazy" decoding="async" style={{objectFit:asset.fit||'cover',objectPosition:asset.position||'center'}}/></div>)}</div>}
        <span className="journey-aperture" aria-hidden="true"/><span className="journey-portal" aria-hidden="true"/>
      </div>
      {album.filter(image=>image.src!==asset?.src).slice(0,2).map((image,i)=><div className={`journey-satellite satellite-${i}`} aria-hidden="true" key={image.src}><img src={responsiveImage(image.src).src} alt="" loading="lazy" decoding="async" style={{objectFit:image.fit||'cover',objectPosition:image.position||'center'}}/></div>)}
    </div>
  </div>;
}

export function LifeTimeline({chapters,language,t,simple=false}){
  const [active,setActive]=useState(0);
  const root=useRef(null);
  useJourneyMotion(root,setActive,simple);
  if(!chapters.length)return null;
  return <div className={`life-timeline journey-timeline journey-panorama ${simple?'':'journey-cinematic'}`} ref={root}>
    <nav className="timeline-markers" aria-label={t.timeline}>{chapters.map((chapter,index)=><a href={`#chapter-${chapter.id}`} className={active===index?'active':''} aria-current={active===index?'step':undefined} key={chapter.id}><span aria-hidden="true">0{index+1}</span><strong>{l(chapter.label,language)}</strong><i aria-hidden="true"/></a>)}</nav>
    <div className="timeline-chapters">{chapters.map((chapter,index)=><article id={`chapter-${chapter.id}`} data-chapter={index} data-writing-layout={['notes','editorial','perspective'][index%3]} className={`life-chapter ${active===index?'is-active':''}`} key={chapter.id}>
      <div className="journey-cinema"><div className="journey-board">
        <span className="journey-board-grid" aria-hidden="true"/>
        <span className="journey-stage-axis" aria-hidden="true"/>
        <div className="journey-title-flight"><div className="journey-chapter-header" data-journey-reveal="heading"><span className="eyebrow">{t.chapter} / {String(index+1).padStart(2,'0')} — {String(chapters.length).padStart(2,'0')}</span><div className="journey-type-camera"><JourneyTitle value={l(chapter.label,language)}/></div>{chapter.period&&<span className="journey-cinema-period">{chapter.period}</span>}</div><div className="journey-chapter-intro"><div className="journey-identity" data-journey-reveal="identity"><EmptyText value={chapter.school} language={language} className="chapter-school"/></div><div className="journey-prose" data-journey-reveal="reflection"><EmptyText value={chapter.story} language={language} className="journey-story"/>{chapter.location?.[language]&&<p>{l(chapter.location,language)}</p>}</div></div></div>
        <div className="journey-photo-flight"><Scene chapter={chapter} index={index} language={language} t={t}/></div>
        <span className="journey-chapter-progress" aria-hidden="true"><i/></span>
      </div></div>
      {(chapter.achievements.length>0||chapter.links?.some(link=>link.href))&&<div className="journey-reading"><div className="journey-copy-flight">
      <div className="journey-text-camera">
        {chapter.achievements.length>0&&<ul className="journey-milestones">{chapter.achievements.map((achievement,i)=><li key={i} data-journey-reveal="milestone" style={{'--note-angle':`${i%2?1.5:-1.5}deg`}}><span className="journey-milestone-marker" aria-hidden="true"/><span className="journey-milestone-content"><span className="journey-milestone-index" aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{l(achievement,language)}</span></li>)}</ul>}
        {chapter.links?.filter(link=>link.href).map(link=><p key={link.href} data-journey-reveal="copy"><ExternalLink href={link.href} className="text-link">{l(link.label,language)}</ExternalLink></p>)}
      </div>
      </div></div>}
      {chapter.gallery.length>0&&<div className="journey-gallery-window" role="region" tabIndex="0" aria-label={language==='vi'?`Ảnh kỷ niệm ${l(chapter.label,language)}`:`Memories from ${l(chapter.label,language)}`} onPointerDown={event=>event.currentTarget.dataset.manual='true'} onWheel={event=>{if(Math.abs(event.deltaX)>Math.abs(event.deltaY)||event.shiftKey)event.currentTarget.dataset.manual='true';}} onFocus={event=>event.currentTarget.dataset.manual='true'}><div className="chapter-gallery">{chapter.gallery.map((image,i)=><Photo motion={['zoom','curtain','iris'][i%3]} motionIndex={i} key={image.src} gallery={chapter.gallery} asset={image} label={l(chapter.label,language)} language={language} t={t}/>)}</div></div>}
      {chapter.id==='present'&&<RouteLink className="text-link" href="/work">{t.exploreWork}<Arrow/></RouteLink>}
    </article>)}</div>
  </div>;
}
