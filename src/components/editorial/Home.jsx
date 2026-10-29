import { Arrow, Contact, Photo, RouteLink, SectionTitle } from './Shared';

export function Home({ data, language, t }) {
  return <>
    <section className="home-hero page-width" aria-labelledby="home-title">
      <div className="hero-copy">
        <span className="eyebrow intro-in" style={{ '--delay': '50ms' }}>{t.hello}</span>
        <h1 id="home-title" className="intro-in" style={{ '--delay': '140ms' }}>{language === 'vi' ? <>Phan<br />Trọng Đạt<span className="accent-dot">.</span></> : <>Phan<br />Trong Dat<span className="accent-dot">.</span></>}</h1>
        <p className="hero-statement intro-in" style={{ '--delay': '240ms' }}>{t.heroFirst}<br /><span>{t.heroSecond}</span></p>
        <p className="hero-disciplines intro-in" style={{ '--delay': '330ms' }}>{t.homeNote}</p>
        <div className="hero-actions intro-in" style={{ '--delay': '420ms' }}><RouteLink className="button button-dark" href="/work">{t.exploreWork}<Arrow /></RouteLink><RouteLink className="button button-outline" href="/personal">{t.explorePersonal}<Arrow /></RouteLink></div>
      </div>
      <div className="hero-portrait intro-photo"><Photo asset={data.assets.hero} label={t.portrait} code="PORTRAIT / 01" language={language} t={t} priority interactive={false} /><span className="portrait-side-label">PHAN TRONG DAT — A WORK IN PROGRESS</span><div className="portrait-bottom"><span>PTD / PERSONAL ARCHIVE</span><span>01 — 02</span></div></div>
      <a href="#two-stories" className="scroll-cue"><span>↓</span>{t.scroll}</a>
    </section>
    <section className="two-stories page-width" id="two-stories">
      <SectionTitle eyebrow={t.introLabel} title={t.introTitle}><span className="serif-accent">{t.introAccent}</span></SectionTitle>
      <p className="stories-intro" data-reveal>{t.heroBody}</p>
      <div className="story-choices" data-reveal>
        {[{ href: '/work', type: 'work', number: '01', eyebrow: t.builder, title: t.workCard, body: t.workCardBody, label: t.workPhoto, cta: t.exploreWork }, { href: '/personal', type: 'personal', number: '02', eyebrow: t.human, title: t.personalCard, body: t.personalCardBody, label: t.personalPhoto, cta: t.explorePersonal }].map((item) => <RouteLink href={item.href} className={`story-choice story-choice-${item.type}`} key={item.type}>
          <Photo asset={data.assets[item.type]} label={item.label} code={`STORY / ${item.number}`} language={language} t={t} interactive={false} />
          <div className="story-choice-copy"><span className="eyebrow">{item.number} / {item.eyebrow}</span><h3>{item.title}</h3><p>{item.body}</p><span className="story-cta">{item.cta}<Arrow /></span></div>
        </RouteLink>)}
      </div>
    </section>
    <div className="page-width"><Contact data={data} language={language} t={t} /></div>
  </>;
}
