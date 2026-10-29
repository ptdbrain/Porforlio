import { useEffect, useRef, useState } from 'react';
import { localize as l } from '../../content/copy';
import { Arrow, Contact, EmptyText, ExternalLink, Modal, Photo, RouteLink, SectionTitle, Training } from './Shared';

function LifeTimeline({ chapters, language, t }) {
  const [active, setActive] = useState(0);
  const root = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActive(Number(visible[0].target.dataset.chapter));
    }, { rootMargin: '-20% 0px -35% 0px', threshold: [0, .2, .5] });
    root.current.querySelectorAll('[data-chapter]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <div className="life-timeline" ref={root}>
    <div className="timeline-sticky"><div className="timeline-photo-stack">
      {chapters.map((chapter, index) => <div className={`timeline-photo-layer ${active === index ? 'is-active' : ''}`} aria-hidden={active !== index} inert={active !== index ? '' : undefined} key={chapter.id}><Photo asset={chapter.image} label={l(chapter.label, language)} code={`${t.chapter} / 0${index + 1}`} language={language} t={t} interactive={false} /></div>)}
    </div><div className="timeline-caption"><span>{t.chapter} 0{active + 1}</span><strong>{l(chapters[active].label, language)}</strong></div></div>
    <div className="timeline-chapters">{chapters.map((chapter, index) => <article id={`chapter-${chapter.id}`} data-chapter={index} className={`life-chapter ${active === index ? 'is-active' : ''}`} key={chapter.id}>
      <span className="chapter-dot" aria-hidden="true" /><span className="eyebrow">{t.chapter} / 0{index + 1}</span><h3>{l(chapter.label, language)}</h3>
      <div className="mobile-chapter-photo"><Photo asset={chapter.image} label={l(chapter.label, language)} code={`0${index + 1}`} language={language} t={t} /></div>
      <EmptyText value={chapter.school} language={language} label={t.schoolPending} className="chapter-school" /><span className="chapter-period">{chapter.period || `— / ${t.periodPending}`}</span>
      <EmptyText value={chapter.story} language={language} label={t.storyPending} />
      {chapter.location?.[language] && <p>{l(chapter.location, language)}</p>}
      {chapter.achievements.length > 0 && <ul>{chapter.achievements.map((achievement, i) => <li key={i}>{l(achievement, language)}</li>)}</ul>}
      {chapter.gallery.length > 0 && <div className="chapter-gallery">{chapter.gallery.map((image, i) => <Photo key={i} asset={image} label={l(chapter.label, language)} language={language} t={t} />)}</div>}
      {chapter.id === 'present' && <RouteLink className="text-link" href="/work">{t.exploreWork}<Arrow /></RouteLink>}
    </article>)}</div>
    <nav className="timeline-markers" aria-label={t.timeline}>{chapters.map((chapter, index) => <a href={`#chapter-${chapter.id}`} className={active === index ? 'active' : ''} aria-current={active === index ? 'step' : undefined} key={chapter.id} aria-label={l(chapter.label, language)}><span>0{index + 1}</span><i /></a>)}</nav>
  </div>;
}

function AchievementCard({ item, language, t }) {
  const [open, setOpen] = useState(false);
  return <><article className="achievement-card" data-reveal><Photo asset={item.image} label={l(item.title, language)} language={language} t={t} /><span className="eyebrow">{item.date} {item.organization && ` / ${item.organization}`}</span><h3>{l(item.title, language)}</h3><p>{l(item.result, language)}</p><button className="text-link" onClick={() => setOpen(true)}>{t.details}<Arrow /></button></article>{open && <Modal title={t.close} onClose={() => setOpen(false)}><h2>{l(item.title, language)}</h2><p>{item.date} / {item.organization}</p><p>{l(item.result, language)}</p><p>{l(item.role, language)}</p><p>{l(item.story, language)}</p>{item.evidence && <ExternalLink href={item.evidence}>{t.evidence}</ExternalLink>}</Modal>}</>;
}

export function Personal({ data, language, t }) {
  return <>
    <section className="personal-hero page-width"><span className="eyebrow intro-in">{t.personalEyebrow}</span><h1 className="intro-in" style={{ '--delay': '120ms' }}>{t.personalTitle}</h1><p className="personal-lead intro-in" style={{ '--delay': '220ms' }}>{t.personalLead}</p><span className="large-outline-number" aria-hidden="true">02</span></section>
    <section className="personal-about page-width section-space"><div className="personal-about-copy" data-reveal><span className="eyebrow">{t.aboutLabel}</span><EmptyText value={data.identity.personalBio} language={language} label={t.bioPending} className="personal-bio" />{data.identity.traits.length > 0 && <div className="trait-list">{data.identity.traits.map((trait, index) => <span key={index}>{l(trait, language)}</span>)}</div>}</div>
      <div className="personal-collage" data-reveal>{[['collageMain',t.collageMain],['collageSport',t.collageSport],['collageFriends',t.collageFriends],['collageStudy',t.collageStudy]].map(([key,label],index) => <Photo asset={data.assets[key]} label={label} code={`LIFE / 0${index + 1}`} key={key} className={`collage-${index + 1}`} language={language} t={t} />)}</div>
    </section>
    <section className="page-width section-space" id="life-timeline"><SectionTitle eyebrow={t.timelineEyebrow} title={t.timeline} /><LifeTimeline chapters={data.education} language={language} t={t} /></section>
    <section className="milestones-section section-space"><div className="page-width"><SectionTitle eyebrow={t.archiveEyebrow} title={t.archiveTitle} /><Training data={data.training} language={language} t={t} /><div className="achievement-grid">{data.achievements.length ? data.achievements.map((item,index) => <AchievementCard item={item} language={language} t={t} key={item.id || index} />) : <div className="empty-archive" data-reveal><span>＋</span><h3>{t.achievementEmpty}</h3><p>{t.achievementNote}</p></div>}</div></div></section>
    <section className="page-width section-space" id="life-beyond-code"><SectionTitle eyebrow={t.sportsEyebrow} title={t.sportsTitle} />{data.sports.map((sport,index) => <article className="sport-feature" key={index} data-reveal><Photo asset={sport.image} label={l(sport.title,language) || t.sportName} code={`SPORT / 0${index + 1}`} language={language} t={t} /><div className="sport-story"><span className="eyebrow">0{index + 1} / {t.collageSport}</span><h3>{l(sport.title,language) || '—'}</h3><EmptyText value={sport.story} language={language} label={t.sportsStory} /></div>{sport.gallery.length > 0 && <div className="sport-gallery">{sport.gallery.map((image,i) => <Photo asset={image} key={i} label={l(sport.title,language)} language={language} t={t} />)}</div>}</article>)}
      <h3 className="subsection-heading" data-reveal>{t.hobbies}</h3><div className="hobby-grid">{data.hobbies.map((hobby,index) => <article data-reveal key={index}><Photo asset={hobby.image} label={l(hobby.title,language)} code={`JOURNAL / 0${index + 1}`} language={language} t={t} /><h4>{l(hobby.title,language)}</h4>{l(hobby.caption,language) && <p>{l(hobby.caption,language)}</p>}</article>)}</div>
    </section>
    <section className="present-section section-space"><div className="page-width"><SectionTitle eyebrow={t.presentEyebrow} title={t.presentTitle} /><div className="present-grid">{['learning','building','exploring'].map((key,index) => <article key={key} data-reveal><span className="eyebrow">0{index + 1}</span><h3>{t[key]}</h3><Photo asset={data.assets[`present${key[0].toUpperCase()+key.slice(1)}`]} label={t[key]} code={`NOW / 0${index + 1}`} language={language} t={t} /><EmptyText value={data.present[key]} language={language} label={t.contentPending} /></article>)}</div><p className="update-note">{data.present.updatedAt ? `${t.updated}: ${data.present.updatedAt}` : t.updatedPending}</p></div></section>
    <section className="dreams-section section-space"><div className="page-width"><SectionTitle eyebrow={t.dreamsEyebrow} title={t.dreamsTitle} /><Photo asset={data.assets.future} label={t.dreamsEyebrow} code="THE NEXT CHAPTER" language={language} t={t} className="future-photo" /><div className="dreams-grid">{['near','long','life'].map((key) => <article key={key} data-reveal><h3>{t[key]}</h3><EmptyText value={data.dreams[key]} language={language} label={t.contentPending} /></article>)}</div><div className="journey-bridge" data-reveal><p>{t.personalBridge}</p><RouteLink href="/work" className="button button-light">{t.exploreWork}<Arrow /></RouteLink></div></div></section>
    <div className="page-width"><Contact data={data} language={language} t={t} branch="personal" /></div>
  </>;
}
