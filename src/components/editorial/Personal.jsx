import { useEffect, useRef, useState } from 'react';
import { usePersonalPhotoMotion } from './usePersonalPhotoMotion';
import { localize as l } from '../../content/copy';
import { Arrow, Contact, EmptyText, ExternalLink, Modal, Photo, RouteLink, SectionTitle, Training } from './Shared';

function PersonalPhoto(props) {
  return <Photo motion="tilt" {...props} />;
}

function LifeTimeline({ chapters, language, t }) {
  const [active, setActive] = useState(0);
  const root = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const visible=new Map();
    const observer = new IntersectionObserver((entries) => {
      for(const entry of entries){if(entry.isIntersecting)visible.set(entry.target,entry.intersectionRatio);else visible.delete(entry.target);}
      const candidates=[...visible.keys()].map(node=>({node,rect:node.getBoundingClientRect()}));
      const current=candidates.find(({rect})=>rect.top<=innerHeight*.45&&rect.bottom>=innerHeight*.45)||candidates.sort((a,b)=>Math.abs(a.rect.top-innerHeight*.45)-Math.abs(b.rect.top-innerHeight*.45))[0];
      if(current)setActive(Number(current.node.dataset.chapter));
    }, { rootMargin: '-20% 0px -35% 0px', threshold: [0, .2, .5] });
    root.current.querySelectorAll('[data-chapter]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <div className="life-timeline" ref={root}>
    <div className="timeline-sticky"><div className="timeline-photo-stack">
      {chapters.map((chapter, index) => <div className={`timeline-photo-layer ${active === index ? 'is-active' : index < active ? 'is-past' : 'is-future'}`} aria-hidden={active !== index} inert={active !== index ? '' : undefined} key={chapter.id}><PersonalPhoto asset={chapter.image} label={l(chapter.label, language)} code={`${t.chapter} / 0${index + 1}`} language={language} t={t} interactive={false} motion={false} /></div>)}
    </div><div className="timeline-caption"><span>{t.chapter} 0{active + 1}</span><strong>{l(chapters[active].label, language)}</strong></div></div>
    <div className="timeline-chapters">{chapters.map((chapter, index) => <article id={`chapter-${chapter.id}`} data-chapter={index} className={`life-chapter ${active === index ? 'is-active' : ''}`} key={chapter.id}>
      <span className="chapter-dot" aria-hidden="true" /><span className="eyebrow">{t.chapter} / 0{index + 1}</span><h3>{l(chapter.label, language)}</h3>
      <div className="mobile-chapter-photo"><PersonalPhoto motion="hinge" asset={chapter.image} label={l(chapter.label, language)} code={`0${index + 1}`} language={language} t={t} /></div>
      <EmptyText value={chapter.school} language={language} label={t.schoolPending} className="chapter-school" />{chapter.period&&<span className="chapter-period">{chapter.period}</span>}
      <EmptyText value={chapter.story} language={language} label={t.storyPending} />
      {chapter.location?.[language] && <p>{l(chapter.location, language)}</p>}
      {chapter.achievements.length > 0 && <ul>{chapter.achievements.map((achievement, i) => <li key={i}>{l(achievement, language)}</li>)}</ul>}
      {chapter.links?.filter(link => link.href).map(link => <p key={link.href}><ExternalLink href={link.href} className="text-link">{l(link.label, language)}</ExternalLink></p>)}
      {chapter.gallery.length > 0 && <div className="chapter-gallery">{chapter.gallery.map((image, i) => <PersonalPhoto key={i} gallery={chapter.gallery} asset={image} label={l(chapter.label, language)} language={language} t={t} />)}</div>}
      {chapter.id === 'present' && <RouteLink className="text-link" href="/work">{t.exploreWork}<Arrow /></RouteLink>}
    </article>)}</div>
    <nav className="timeline-markers" aria-label={t.timeline}>{chapters.map((chapter, index) => <a href={`#chapter-${chapter.id}`} onClick={()=>setActive(index)} className={active === index ? 'active' : ''} aria-current={active === index ? 'step' : undefined} key={chapter.id} aria-label={l(chapter.label, language)}><span>0{index + 1}</span><i /></a>)}</nav>
  </div>;
}

function AchievementCard({ item, language, t }) {
  const [open, setOpen] = useState(false);
  return <><article className="achievement-card" data-reveal><PersonalPhoto motion="flip" asset={item.image} label={l(item.title, language)} language={language} t={t} /><span className="eyebrow">{item.date} {item.organization && ` / ${item.organization}`}</span><h3>{l(item.title, language)}</h3><p>{l(item.result, language)}</p><button className="text-link" onClick={() => setOpen(true)}>{t.details}<Arrow /></button></article>{open && <Modal title={l(item.title,language)} closeLabel={t.close} onClose={() => setOpen(false)}><h2>{l(item.title, language)}</h2><p>{item.date} / {item.organization}</p><p>{l(item.result, language)}</p><p>{l(item.role, language)}</p><p>{l(item.story, language)}</p>{item.gallery?.map((asset,index)=><Photo key={asset.src} asset={asset} label={l(asset.caption,language)||l(item.title,language)} language={language} t={t} interactive={false} className="achievement-evidence-photo" />)}{item.evidence && <ExternalLink href={item.evidence}>{t.evidence}</ExternalLink>}</Modal>}</>;
}

export function Personal({ data, language, t, simple=false }) {
  const root=useRef(null);
  usePersonalPhotoMotion(root,simple);
  const chapters=data.education.filter(chapter=>l(chapter.story,language)||l(chapter.school,language)||chapter.image?.src);
  const momentIds=['national-science-2023','robotics-champion','badminton-club','venture-x-2026'];
  const moments=momentIds.map(id=>data.achievements.find(item=>item.id===id)).filter(Boolean);
  const archive=data.achievements.filter(item=>!momentIds.includes(item.id));
  const now=['learning','building','exploring'].filter(key=>l(data.present[key],language));
  const dreams=['near','long','life'].filter(key=>l(data.dreams[key],language));
  const hobbies=data.hobbies.filter(hobby=>hobby.image?.src||l(hobby.caption,language));
  return <div className="personal-story" ref={root}>
    <section className="personal-hero portrait-intro page-width"><div><span className="eyebrow intro-in">{t.personalEyebrow}</span><h1 className="intro-in" style={{ '--delay': '120ms' }}>{t.personalTitle}</h1><p className="personal-lead intro-in" style={{ '--delay': '220ms' }}>{t.personalLead}</p><a href="#life-timeline" className="text-link">{t.timeline} ↓</a></div><Photo asset={data.assets.personal} label={t.portrait} language={language} t={t} priority className="personal-intro-photo"/></section>
    <section className="personal-about page-width section-space"><div className="personal-about-copy" data-reveal><span className="eyebrow">{t.aboutLabel}</span><EmptyText value={data.identity.personalBio} language={language} label={t.bioPending} className="personal-bio" />{data.identity.traits.length > 0 && <div className="trait-list">{data.identity.traits.map((trait, index) => <span key={index}>{l(trait, language)}</span>)}</div>}</div>
      <div className="personal-collage">{[['collageStudy',t.collageStudy],['collageSport',t.collageSport],['collageFriends',t.collageFriends]].map(([key,label],index) => <PersonalPhoto motion="fan" motionIndex={index} asset={data.assets[key]} label={label} code={`LIFE / 0${index + 1}`} key={key} className={`collage-${index + 1}`} language={language} t={t} />)}</div>
    </section>
    <section className="page-width section-space" id="life-timeline"><SectionTitle eyebrow={t.timelineEyebrow} title={t.timeline} /><LifeTimeline chapters={chapters} language={language} t={t} /></section>
    <section className="milestones-section section-space"><div className="page-width"><SectionTitle eyebrow={t.archiveEyebrow} title={t.archiveTitle} /><div className="achievement-grid defining-moments">{moments.map(item=><AchievementCard item={item} language={language} t={t} key={item.id}/>)}</div><details className="milestone-archive"><summary>{language==='vi'?'Những cột mốc khác':'More milestones'} <span>{archive.length} ↗</span></summary><div className="achievement-grid">{archive.map(item=><AchievementCard item={item} language={language} t={t} key={item.id}/>)}</div><Training data={data.training} language={language} t={t}/></details></div></section>
    <section className="page-width section-space" id="life-beyond-code"><SectionTitle eyebrow={t.sportsEyebrow} title={t.sportsTitle} />{data.sports.map((sport,index) => <article className="sport-feature" key={index} data-reveal><PersonalPhoto motion="unfold" asset={sport.image} label={l(sport.title,language) || t.sportName} code={`SPORT / 0${index + 1}`} language={language} t={t} /><div className="sport-story"><span className="eyebrow">0{index + 1} / {t.collageSport}</span><h3>{l(sport.title,language) || '—'}</h3><EmptyText value={sport.story} language={language} label={t.sportsStory} /></div>{sport.gallery.length > 0 && <div className="sport-gallery">{sport.gallery.map((image,i) => <PersonalPhoto gallery={[sport.image,...sport.gallery]} asset={image} key={i} label={l(sport.title,language)} language={language} t={t} />)}</div>}</article>)}
      {hobbies.length>0&&<><h3 className="subsection-heading" data-reveal>{t.hobbies}</h3><div className="hobby-grid">{hobbies.map((hobby,index) => <article data-reveal key={index}><PersonalPhoto motion={["tilt","hinge","flip"][index%3]} motionIndex={index} asset={hobby.image} label={l(hobby.title,language)} code={`JOURNAL / 0${index + 1}`} language={language} t={t} /><h4>{l(hobby.title,language)}</h4>{l(hobby.caption,language) && <p>{l(hobby.caption,language)}</p>}</article>)}</div></>}
    </section>
    {now.length>0&&<section className="present-section section-space"><div className="page-width"><SectionTitle eyebrow={t.presentEyebrow} title={t.presentTitle} /><div className="present-grid">{now.map((key,index) => <article key={key} data-reveal><span className="eyebrow">0{index + 1}</span><h3>{t[key]}</h3><PersonalPhoto motion="flip" motionIndex={index} asset={data.assets[`present${key[0].toUpperCase()+key.slice(1)}`]} label={t[key]} code={`NOW / 0${index + 1}`} language={language} t={t} /><EmptyText value={data.present[key]} language={language} label={t.contentPending} /></article>)}</div><p className="update-note">{data.present.updatedAt ? `${t.updated}: ${data.present.updatedAt}` : ''}</p></div></section>}
    <section className="dreams-section section-space"><div className="page-width">{dreams.length>0&&<SectionTitle eyebrow={t.dreamsEyebrow} title={t.dreamsTitle} />}<PersonalPhoto motion="unfold" asset={data.assets.future} label={t.dreamsEyebrow} code="THE NEXT CHAPTER" language={language} t={t} className="future-photo" /><div className="dreams-grid">{dreams.map((key) => <article key={key} data-reveal><h3>{t[key]}</h3><EmptyText value={data.dreams[key]} language={language} label={t.contentPending} /></article>)}</div><div className="journey-bridge" data-reveal><p>{t.personalBridge}</p><RouteLink href="/work" className="button button-light">{t.exploreWork}<Arrow /></RouteLink></div></div></section>
    <div className="page-width"><Contact data={data} language={language} t={t} branch="personal" /></div>
  </div>;
}
