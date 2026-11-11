import { localize as l } from '../../content/copy';
import { ProjectVisual } from './ProjectVisual';
import { Arrow, Contact, CvLink, Photo, RouteLink, SectionTitle } from './Shared';

export function Home({ data, language, t, onPlayIntro }) {
  return <>
    <section className="home-hero page-width" aria-labelledby="home-title">
      <div className="hero-copy">
        <span className="eyebrow intro-in" style={{ '--delay': '50ms' }}>{t.hello}</span>
        <h1 id="home-title" className="split-headline">{language === 'vi' ? <><span className="headline-line"><span>Phan</span></span><span className="headline-line"><span>Trọng Đạt<i className="accent-dot">.</i></span></span></> : <><span className="headline-line"><span>Phan</span></span><span className="headline-line"><span>Trong Dat<i className="accent-dot">.</i></span></span></>}</h1>
        <p className="hero-statement intro-in" style={{ '--delay': '240ms' }}>{t.heroFirst}<br /><span>{t.heroSecond}</span></p>
        <p className="hero-disciplines intro-in" style={{ '--delay': '330ms' }}>{l(data.identity.currentRole,language)}<br/>{t.homeNote}</p>
        <div className="hero-actions intro-in" style={{ '--delay': '420ms' }}><RouteLink className="button button-dark" href="/work">{t.exploreWork}<Arrow /></RouteLink><RouteLink className="button button-outline" href="/personal">{t.explorePersonal}<Arrow /></RouteLink></div><div className="hero-secondary"><CvLink identity={data.identity} t={t} className="text-link"/><a className="text-link" href="#highlights">{language==='vi'?'Xem dấu ấn nổi bật':'Selected highlights'} ↓</a>{onPlayIntro&&<button className="text-link intro-replay" onClick={onPlayIntro}>{language==='vi'?'Xem phim mở đầu':'Play introduction'} ▷</button>}</div>
      </div>
      <div className="hero-portrait intro-photo"><Photo asset={data.assets.hero} label={t.portrait} code="PORTRAIT / 01" language={language} t={t} priority interactive={false} /><span className="portrait-side-label">PHAN TRONG DAT — A WORK IN PROGRESS</span><div className="portrait-bottom"><span>PTD / PERSONAL ARCHIVE</span><span>01 — 02</span></div></div>
      <a href="#highlights" className="scroll-cue"><span>↓</span>{t.scroll}</a>
    </section>
    <section className="home-highlights page-width section-space" id="highlights" aria-labelledby="highlights-title">
      <SectionTitle eyebrow="SELECTED HIGHLIGHTS" title={language==='vi'?'Một vài dấu ấn. Một cách nhìn rõ hơn.':'A few highlights. A clearer picture.'} id="highlights-title" />
      <div className="highlight-grid">
        <RouteLink className="highlight-card" href="/projects/dpotm" data-project-portal data-reveal><ProjectVisual project={data.projects.find(p=>p.slug==='dpotm')} language={language}/><span className="eyebrow">01 / RESEARCH</span><h3>LLMFeed · EMNLP 2026<Arrow/></h3><p>{language==='vi'?'Đồng tác giả · Triển khai và đánh giá thực nghiệm mô hình chủ đề.':'Co-author · Topic model implementation and experimental evaluation.'}</p></RouteLink>
        <RouteLink className="highlight-card highlight-experience" href="/work#experience" data-reveal><span className="eyebrow">02 / EXPERIENCE</span><h3>AI × Software<Arrow/></h3><div className="highlight-organizations">GeoIT VNPT<span>BA GPS</span></div><p>{language==='vi'?'Hệ thống địa không gian, backend và thị giác máy tính trên thiết bị nhúng.':'Geospatial systems, backend services and computer vision on embedded devices.'}</p><span className="text-link">{language==='vi'?'Xem kinh nghiệm':'Explore experience'}<Arrow/></span></RouteLink>
        <RouteLink className="highlight-card" href="/projects/medtutor" data-project-portal data-reveal><ProjectVisual project={data.projects.find(p=>p.slug==='medtutor')} language={language}/><span className="eyebrow">03 / APPLIED AI</span><h3>MedTutor<Arrow/></h3><p>{language==='vi'?'Trợ lý học tập y khoa với truy xuất tài liệu, reranking và câu trả lời có trích dẫn.':'A medical learning assistant with retrieval, reranking and source-grounded answers.'}</p></RouteLink>
      </div>
    </section>
    <section className="two-stories page-width" id="two-stories">
      <SectionTitle eyebrow={t.introLabel} title={t.introTitle}><span className="serif-accent">{t.introAccent}</span></SectionTitle>
      <p className="stories-intro" data-reveal>{t.heroBody}</p>
      <div className="story-choices" data-reveal>
        {[{ href: '/work', type: 'work', number: '01', eyebrow: t.builder, title: t.workCard, body: t.workCardBody, label: t.workPhoto, cta: t.exploreWork }, { href: '/personal', type: 'personal', number: '02', eyebrow: t.human, title: t.personalCard, body: t.personalCardBody, label: t.personalPhoto, cta: t.explorePersonal }].map((item) => <RouteLink href={item.href} data-story-portal={item.type} className={`story-choice story-choice-${item.type}`} key={item.type}>
          <Photo asset={data.assets[item.type]} label={item.label} code={`STORY / ${item.number}`} language={language} t={t} interactive={false} />
          <div className="story-choice-copy"><span className="eyebrow">{item.number} / {item.eyebrow}</span><h3>{item.title}</h3><p>{item.body}</p><span className="story-cta">{item.cta}<Arrow /></span></div>
        </RouteLink>)}
      </div>
    </section>
    <div className="page-width"><Contact data={data} language={language} t={t} /></div>
  </>;
}
