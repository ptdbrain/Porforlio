import { useCallback, useEffect, useRef, useState } from 'react';
import data from './content/portfolio.json';
import { copy } from './content/copy';
import { cinemaCopy } from './content/cinemaCopy';
import { useMotionPreference } from './lib/useMotionPreference';
import { resolveRoute, routeMetadata } from './lib/routes.mjs';
import { Home } from './components/editorial/Home';
import { Work } from './components/editorial/Work';
import { Personal } from './components/editorial/Personal';
import { CaseStudy } from './components/editorial/CaseStudy';
import { Contact, CvLink, RouteLink } from './components/editorial/Shared';
import { NeuralIntro } from './components/editorial/NeuralIntro';
import { AmbientMotion } from './components/editorial/AmbientMotion';
import { useRouteTransition } from './components/editorial/useRouteTransition';
import { useSiteMotion } from './lib/useSiteMotion';
import { workReturnKey } from './lib/workV4.mjs';

function browserLocation() { return {path: window.location.pathname, hash: window.location.hash, scroll: 0, initial: true}; }
function scrollToAnchor(hash,behavior='instant') {
  try{const target=document.getElementById(decodeURIComponent(hash.slice(1)));if(target){target.scrollIntoView({behavior});return true;}}catch{}
  return false;
}
function initialLang() {
  if (typeof window === 'undefined') return 'vi';
  const query = new URLSearchParams(window.location.search).get('lang');
  if (query === 'en' || query === 'vi') return query;
  try { return localStorage.getItem('ptd-language') === 'en' ? 'en' : 'vi'; } catch { return 'vi'; }
}

export default function App({ initialPath, initialLanguage, hydrating=false }) {
  const [location,setLocation] = useState(() => initialPath ? {path:initialPath,hash:typeof window==='undefined'?'':window.location.hash,scroll:0,initial:true} : typeof window !== 'undefined' ? browserLocation() : {path:'/',hash:'',scroll:0,initial:true});
  const [language,setLanguage] = useState(()=>initialLanguage||initialLang());
  const [menuOpen,setMenuOpen] = useState(false);
  const [introVisible,setIntroVisible] = useState(false);
  const [introRevealed,setIntroRevealed] = useState(false);
  const mainRef=useRef(null),headerRef=useRef(null),menuButtonRef=useRef(null),currentPathRef=useRef(location.path);
  currentPathRef.current=location.path;
  const route=resolveRoute(location.path,data.projects);
  const work=route.kind === 'work' || route.kind === 'project';
  const t=copy[language];
  const motionPreference=useMotionPreference(hydrating);
  const transitionRoute=useRouteTransition(mainRef,motionPreference.simple);
  const c=cinemaCopy[language];
  const revealIntro=useCallback(()=>setIntroRevealed(true),[]);
  const finishIntro=useCallback(()=>{
    setIntroVisible(false);
    document.documentElement.classList.remove('neural-intro-pending');
    requestAnimationFrame(()=>mainRef.current?.focus({preventScroll:true}));
  },[]);
  useEffect(()=>{
    const pending=document.documentElement.classList.contains('neural-intro-pending');
    if(location.path==='/'&&pending){
      try{sessionStorage.setItem('ptd-neural-intro-seen','1');}catch{}
      setIntroVisible(true);
    }else document.documentElement.classList.remove('neural-intro-pending');
  },[]);
  useSiteMotion(location.path,language,motionPreference.simple||introVisible);
  useEffect(()=>{document.documentElement.dataset.motion=motionPreference.simple?'simple':'full';},[motionPreference.simple]);
  useEffect(()=>{if(initialLanguage)setLanguage(initialLang());},[initialLanguage]);

  useEffect(()=>{
    if(!menuOpen)return;
    const header=headerRef.current,media=matchMedia('(max-width:760px)');
    header.querySelector('.main-nav a')?.focus({preventScroll:true});
    const outside=event=>{if(!header.contains(event.target))setMenuOpen(false);};
    const keyboard=event=>{if(event.key==='Escape'){event.preventDefault();setMenuOpen(false);menuButtonRef.current?.focus();}};
    const resize=()=>{if(!media.matches)setMenuOpen(false);};
    document.addEventListener('pointerdown',outside);document.addEventListener('focusin',outside);document.addEventListener('keydown',keyboard);media.addEventListener('change',resize);
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('focusin',outside);document.removeEventListener('keydown',keyboard);media.removeEventListener('change',resize);};
  },[menuOpen]);

  useEffect(() => {
    function navigate(event) {
      const link=event.target.closest?.('a[data-route]');
      if (event.defaultPrevented || !link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
      const url=new URL(link.href,window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      history.replaceState({...history.state,scroll:window.scrollY,url:window.location.pathname+window.location.search+window.location.hash},'');
      if (language === 'en') url.searchParams.set('lang','en');
      let returnState=null;
      if(link.hasAttribute('data-work-return')){
        try{const saved=history.state?.workOrigin||JSON.parse(sessionStorage.getItem(workReturnKey));if(saved&&(history.state?.workOrigin||saved.projectPath===window.location.pathname))returnState=saved;}catch{}
      }
      const scroll=returnState&&Number.isFinite(returnState.scroll)?returnState.scroll:0;
      const next={path:url.pathname,hash:url.hash,scroll,initial:false};
      const projectTarget=url.pathname.startsWith('/projects/');
      const workOrigin=projectTarget?(history.state?.workOrigin||(window.location.pathname==='/work'?history.state?.workV4:null)):null;
      if(url.pathname+url.search+url.hash===window.location.pathname+window.location.search+window.location.hash){transitionRoute({from:currentPathRef.current,to:currentPathRef.current,update:()=>setMenuOpen(false)});const behavior=motionPreference.simple?'instant':'smooth';if(!url.hash||!scrollToAnchor(url.hash,behavior))window.scrollTo({top:0,behavior});mainRef.current?.focus({preventScroll:true});return;}
      history.pushState({scroll,url:url.pathname+url.search+url.hash,...(returnState?{workV4:returnState}:{}),...(workOrigin?{workOrigin}:{})},'',url.pathname+url.search+url.hash);
      const perform=() => {setLocation(next);setMenuOpen(false);};
      const cover=link.closest('[data-project-portal]');
      if(cover&&innerWidth>=768)cover.style.viewTransitionName='project-cover';
      transitionRoute({from:currentPathRef.current,to:url.pathname,update:perform,restore:()=>{
        if(!returnState&&(!url.hash||!scrollToAnchor(url.hash)))window.scrollTo({top:scroll,behavior:'instant'});
      }}).finally(()=>{if(cover?.isConnected)cover.style.viewTransitionName='';});
    }
    function popstate() {
      const next={path:window.location.pathname,hash:window.location.hash,scroll:history.state?.scroll || 0,initial:false,restore:history.state?.url===window.location.pathname+window.location.search+window.location.hash};
      transitionRoute({from:currentPathRef.current,to:next.path,update:()=>{setLocation(next);setMenuOpen(false);},restore:()=>{
        if(next.restore)window.scrollTo({top:next.scroll,behavior:'instant'});
        else if(!next.hash||!scrollToAnchor(next.hash))window.scrollTo({top:next.scroll,behavior:'instant'});
      }});
    }
    const oldRestoration=history.scrollRestoration;
    history.scrollRestoration='manual';
    document.addEventListener('click',navigate);window.addEventListener('popstate',popstate);
    return () => {document.removeEventListener('click',navigate);window.removeEventListener('popstate',popstate);history.scrollRestoration=oldRestoration;};
  }, [language,motionPreference.simple,transitionRoute]);

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
    setMeta('theme-color',work?'#090b10':'#f5f3ed');
    setMeta('robots',route.kind === 'not-found'?'noindex, follow':'index, follow');
  }, [location.path,language]);

  useEffect(() => {
    let active=true,fontFrame;
    const apply=()=>{
      let focusTarget=mainRef.current;
      if(location.restore) window.scrollTo({top:location.scroll,behavior:'instant'});
      else if(location.hash){scrollToAnchor(location.hash);try{focusTarget=document.getElementById(decodeURIComponent(location.hash.slice(1)))||focusTarget;}catch{}}
      else if(!location.initial) window.scrollTo({top:location.scroll,behavior:'instant'});
      if(!location.initial&&focusTarget){if(!focusTarget.hasAttribute('tabindex'))focusTarget.setAttribute('tabindex','-1');focusTarget.focus({preventScroll:true});}
    };
    const frame=requestAnimationFrame(apply);
    if(location.initial&&location.hash)document.fonts?.ready.then(()=>{if(active)fontFrame=requestAnimationFrame(apply);});
    return () => {active=false;cancelAnimationFrame(frame);cancelAnimationFrame(fontFrame);};
  }, [location]);

  useEffect(() => {
    let frame,lastWrite=0;
    const remember=()=>{if(window.location.pathname===location.path)history.replaceState({...history.state,scroll:window.scrollY,url:window.location.pathname+window.location.search+window.location.hash},'');};
    function progress(){
      cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
        const height=document.documentElement.scrollHeight-window.innerHeight;
        document.documentElement.style.setProperty('--scroll-progress',height>0?String(Math.min(1,Math.max(0,window.scrollY/height))):'0');
        if(performance.now()-lastWrite>500){remember();lastWrite=performance.now();}
      });
    }
    const visibility=()=>document.documentElement.classList.toggle('page-hidden',document.hidden);
    const resizeObserver='ResizeObserver' in window?new ResizeObserver(progress):null;
    resizeObserver?.observe(mainRef.current);
    window.addEventListener('scroll',progress,{passive:true});window.addEventListener('scrollend',remember);window.addEventListener('resize',progress);window.addEventListener('pagehide',remember);document.addEventListener('visibilitychange',visibility);visibility();progress();
    return()=>{cancelAnimationFrame(frame);resizeObserver?.disconnect();window.removeEventListener('scroll',progress);window.removeEventListener('scrollend',remember);window.removeEventListener('resize',progress);window.removeEventListener('pagehide',remember);document.removeEventListener('visibilitychange',visibility);};
  }, [location.path]);

  function changeLanguage() {
    const next=language === 'vi'?'en':'vi';setLanguage(next);try {localStorage.setItem('ptd-language',next);}catch{}
    const url=new URL(window.location.href);if(next === 'en')url.searchParams.set('lang','en');else url.searchParams.delete('lang');history.replaceState({...history.state,url:url.pathname+url.search+url.hash},'',url.pathname+url.search+url.hash);
  }
  return <><div className={`portfolio theme-${work?'work':route.kind === 'personal'?'personal':'home'} ${work?'theme-cinema':''} ${motionPreference.simple?'is-simple':''} ${!location.initial?'route-visited':''} ${introVisible?'intro-covered':''} ${introRevealed?'intro-revealed':''}`} inert={introVisible?'':undefined} aria-hidden={introVisible?'true':undefined}>
    <AmbientMotion work={work} paused={menuOpen||introVisible}/>
    <a className="skip-link" href="#main-content">{t.skip}</a><div className="reading-progress" aria-hidden="true" />
    <header className="site-header" ref={headerRef}><div className="header-inner page-width"><RouteLink href="/" className="wordmark" aria-label="PTD. Home">PTD<span>.</span></RouteLink><span className="header-caption">{t.themeCaption}</span>
      <nav className={`main-nav ${menuOpen?'is-open':''}`} id="main-navigation" aria-label={language==='vi'?'Điều hướng chính':'Main navigation'}>{[['/work',t.work,work],['/personal',t.personal,route.kind==='personal'],...(work?[['/work#archive',t.projects,false],['/work#experience',language==='vi'?'Kinh nghiệm':'Experience',false]]:[['/contact',t.contact,route.kind==='contact']])].map(([href,label,active]) => <RouteLink key={href} href={href} aria-current={active?'page':undefined}><span>{label}</span>{active&&<i aria-hidden="true" />}</RouteLink>)}{work&&<><CvLink identity={data.identity} t={t} className="text-cv"/><RouteLink href="/contact">{t.contact}</RouteLink></>}<button className="motion-preference" type="button" aria-pressed={motionPreference.simple} disabled={motionPreference.systemReduced} title={motionPreference.systemReduced?c.auto:undefined} onClick={motionPreference.toggle}>{motionPreference.systemReduced?c.simple:motionPreference.simple?c.full:c.simple}</button></nav>
      <div className="header-tools"><button className="language-toggle" type="button" onClick={changeLanguage} aria-label={language==='vi'?'Switch to English':'Chuyển sang tiếng Việt'}><span className={language==='vi'?'active':''}>VI</span><span>/</span><span className={language==='en'?'active':''}>EN</span></button><button ref={menuButtonRef} className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen?t.close:t.menu}><span /> <span /></button></div></div></header>
    <main id="main-content" ref={mainRef} tabIndex="-1" key={location.path}>
      {route.kind==='home'&&<Home data={data} language={language} t={t} />}
      {route.kind==='personal'&&<Personal data={data} language={language} t={t} simple={motionPreference.simple} />}
      {route.kind==='work'&&<Work data={data} language={language} t={t} simple={motionPreference.simple} />}
      {route.kind==='project'&&<CaseStudy key={route.project.slug} project={route.project} data={data} language={language} t={t} />}
      {route.kind==='contact'&&<div className="page-width standalone-contact"><Contact data={data} language={language} t={t} headingLevel="h1" /></div>}
      {route.kind==='not-found'&&<section className="not-found page-width"><span className="eyebrow">404 / PTD.</span><h1>{t.notFound}</h1><RouteLink className="button button-dark" href="/">{t.returnHome} ↗</RouteLink></section>}
    </main>
    <footer className="site-footer page-width"><RouteLink href="/" className="wordmark">PTD<span>.</span></RouteLink><p>{t.footer}</p><a href="#main-content" className="back-top" aria-label={language==='vi'?'Về đầu trang':'Back to top'}>↑</a></footer>
  </div>{introVisible&&<NeuralIntro language={language} onReveal={revealIntro} onComplete={finishIntro}/>}</>;
}
