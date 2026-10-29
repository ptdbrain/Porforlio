import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import data from './content/portfolio.json';
import { copy } from './content/copy';
import { resolveRoute, routeMetadata } from './lib/routes.mjs';
import { Home } from './components/editorial/Home';
import { Work } from './components/editorial/Work';
import { Personal } from './components/editorial/Personal';
import { CaseStudy } from './components/editorial/CaseStudy';
import { Contact, CvLink, RouteLink } from './components/editorial/Shared';

function browserLocation() { return {path: window.location.pathname, hash: window.location.hash, scroll: 0, initial: true}; }
function initialLang() {
  if (typeof window === 'undefined') return 'vi';
  const query = new URLSearchParams(window.location.search).get('lang');
  if (query === 'en' || query === 'vi') return query;
  try { return localStorage.getItem('ptd-language') === 'en' ? 'en' : 'vi'; } catch { return 'vi'; }
}

function useMotion(path, language) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('motion-enabled');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
    }), {threshold: .08, rootMargin: '0px 0px 30px 0px'});
    const observe = () => document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(node => observer.observe(node));
    observe();
    const mutation = new MutationObserver(observe);
    mutation.observe(document.getElementById('main-content'), {childList:true,subtree:true});
    const onChange = () => { if (reduced.matches) document.documentElement.classList.remove('motion-enabled'); };
    reduced.addEventListener('change',onChange);
    return () => {observer.disconnect();mutation.disconnect();reduced.removeEventListener('change',onChange);document.documentElement.classList.remove('motion-enabled');};
  }, [path,language]);
}

export default function App({ initialPath }) {
  const [location,setLocation] = useState(() => initialPath ? {path:initialPath,hash:'',scroll:0,initial:true} : typeof window !== 'undefined' ? browserLocation() : {path:'/',hash:'',scroll:0,initial:true});
  const [language,setLanguage] = useState(initialLang);
  const [menuOpen,setMenuOpen] = useState(false);
  const mainRef=useRef(null);
  const route=resolveRoute(location.path,data.projects);
  const work=route.kind === 'work' || route.kind === 'project';
  const t=copy[language];
  useMotion(location.path,language);

  useEffect(() => {
    function navigate(event) {
      const link=event.target.closest?.('a[data-route]');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
      const url=new URL(link.href,window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      history.replaceState({...history.state,scroll:window.scrollY},'');
      if (language === 'en') url.searchParams.set('lang','en');
      const next={path:url.pathname,hash:url.hash,scroll:0,initial:false};
      const perform=() => {history.pushState({scroll:0},'',url.pathname+url.search+url.hash);setLocation(next);setMenuOpen(false);};
      if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && url.pathname !== window.location.pathname) {
        const choice=link.closest('.story-choice');
        if (choice) choice.style.viewTransitionName='journey';
        const transition=document.startViewTransition(() => flushSync(perform));
        transition.finished.catch(() => {}).finally(() => { if(choice?.isConnected) choice.style.viewTransitionName=''; });
      } else perform();
    }
    function popstate() {setLocation({path:window.location.pathname,hash:window.location.hash,scroll:history.state?.scroll || 0,initial:false});setMenuOpen(false);}
    function escape(event) {if(event.key === 'Escape') setMenuOpen(false);}
    const oldRestoration=history.scrollRestoration;
    history.scrollRestoration='manual';
    document.addEventListener('click',navigate);document.addEventListener('keydown',escape);window.addEventListener('popstate',popstate);
    return () => {document.removeEventListener('click',navigate);document.removeEventListener('keydown',escape);window.removeEventListener('popstate',popstate);history.scrollRestoration=oldRestoration;};
  }, [language]);

  useEffect(() => {
    const metadata=routeMetadata(route,data,language);
    document.title=metadata.title;document.documentElement.lang=language;
    const siteUrl=import.meta.env.VITE_SITE_URL || 'https://porforlio-delta.vercel.app';
    const canonical=new URL(route.path,siteUrl).href+(language === 'en' ? '?lang=en' : '');
    const setMeta=(name,content,property=false) => {
      let node=document.head.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`);
      if(!node){node=document.createElement('meta');node.setAttribute(property?'property':'name',name);document.head.append(node);}node.content=content;
    };
    setMeta('description',metadata.description);setMeta('og:title',metadata.title,true);setMeta('og:description',metadata.description,true);setMeta('og:type',metadata.type,true);setMeta('og:url',canonical,true);setMeta('twitter:card',metadata.image?'summary_large_image':'summary');
    if(metadata.image) setMeta('og:image',new URL(metadata.image,siteUrl).href,true);else document.head.querySelector('meta[property="og:image"]')?.remove();
    let link=document.head.querySelector('link[rel="canonical"]');if(!link){link=document.createElement('link');link.rel='canonical';document.head.append(link);}link.href=canonical;
    setMeta('theme-color',work?'#101b20':'#f5f3ed');
    setMeta('robots',route.kind === 'not-found'?'noindex, follow':'index, follow');
  }, [location.path,language]);

  useEffect(() => {
    const frame=requestAnimationFrame(() => {
      if(location.hash) {try { document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({behavior:'instant'}); }catch{} }
      else if(!location.initial) window.scrollTo({top:location.scroll,behavior:'instant'});
      if(!location.initial) mainRef.current?.focus({preventScroll:true});
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);

  useEffect(() => {
    let frame;
    function progress() {cancelAnimationFrame(frame);frame=requestAnimationFrame(() => {const height=document.documentElement.scrollHeight-window.innerHeight;document.documentElement.style.setProperty('--scroll-progress',height>0?String(window.scrollY/height):'0');});}
    window.addEventListener('scroll',progress,{passive:true});window.addEventListener('resize',progress);progress();
    return () => {cancelAnimationFrame(frame);window.removeEventListener('scroll',progress);window.removeEventListener('resize',progress);};
  }, [location.path]);

  function changeLanguage() {
    const next=language === 'vi'?'en':'vi';setLanguage(next);try {localStorage.setItem('ptd-language',next);}catch{}
    const url=new URL(window.location.href);if(next === 'en')url.searchParams.set('lang','en');else url.searchParams.delete('lang');history.replaceState(history.state,'',url.pathname+url.search+url.hash);
  }
  return <div className={`portfolio theme-${work?'work':route.kind === 'personal'?'personal':'home'}`}>
    <a className="skip-link" href="#main-content">{t.skip}</a><div className="reading-progress" aria-hidden="true" />
    <header className="site-header"><div className="header-inner page-width"><RouteLink href="/" className="wordmark" aria-label="PTD. Home">PTD<span>.</span></RouteLink><span className="header-caption">{t.themeCaption}</span>
      <nav className={`main-nav ${menuOpen?'is-open':''}`} id="main-navigation" aria-label={language==='vi'?'Điều hướng chính':'Main navigation'}>{[['/work',t.work,work],['/personal',t.personal,route.kind==='personal'],['/contact',t.contact,route.kind==='contact']].map(([href,label,active]) => <RouteLink key={href} href={href} aria-current={active?'page':undefined}><span>{label}</span>{active&&<i aria-hidden="true" />}</RouteLink>)}</nav>
      <div className="header-tools"><button className="language-toggle" type="button" onClick={changeLanguage} aria-label={language==='vi'?'Switch to English':'Chuyển sang tiếng Việt'}><span className={language==='vi'?'active':''}>VI</span><span>/</span><span className={language==='en'?'active':''}>EN</span></button><button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen?t.close:t.menu}><span /> <span /></button></div></div></header>
    {work && <div className="work-shortcuts"><div className="page-width"><RouteLink href="/work#selected-work">{t.projects} ↓</RouteLink><CvLink identity={data.identity} t={t} className="text-cv" /></div></div>}
    <main id="main-content" ref={mainRef} tabIndex="-1" key={location.path}>
      {route.kind==='home'&&<Home data={data} language={language} t={t} />}
      {route.kind==='personal'&&<Personal data={data} language={language} t={t} />}
      {route.kind==='work'&&<Work data={data} language={language} t={t} />}
      {route.kind==='project'&&<CaseStudy key={route.project.slug} project={route.project} data={data} language={language} t={t} />}
      {route.kind==='contact'&&<div className="page-width standalone-contact"><Contact data={data} language={language} t={t} /></div>}
      {route.kind==='not-found'&&<section className="not-found page-width"><span className="eyebrow">404 / PTD.</span><h1>{t.notFound}</h1><RouteLink className="button button-dark" href="/">{t.returnHome} ↗</RouteLink></section>}
    </main>
    <footer className="site-footer page-width"><RouteLink href="/" className="wordmark">PTD<span>.</span></RouteLink><p>{t.footer}</p><a href="#main-content" className="back-top" aria-label={language==='vi'?'Về đầu trang':'Back to top'}>↑</a></footer>
  </div>;
}
