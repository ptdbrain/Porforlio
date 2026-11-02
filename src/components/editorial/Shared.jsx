import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { localize } from '../../content/copy';

export function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '↗'}</span>;
}

export function RouteLink({ href, children, className = '', ...props }) {
  return <a href={href} data-route className={className} {...props}>{children}</a>;
}

export function ExternalLink({ href, children, className = '', ...props }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>{children}<Arrow /></a>;
}

export function SectionTitle({ eyebrow, title, children, id }) {
  return <div className="section-title" data-reveal>
    <span className="eyebrow">{eyebrow}</span>
    <h2 id={id}>{title}</h2>
    {children && <p>{children}</p>}
  </div>;
}

export function EmptyText({ value, language, label, className = '' }) {
  const content = localize(value, language);
  return content ? <p className={className}>{content}</p> : <div className={`empty-text ${className}`}><span aria-hidden="true">—</span><small>{label}</small></div>;
}

export function Modal({ title, closeLabel=title, onClose, children, className = '' }) {
  const ref = useRef(null);
  const closeRef=useRef(onClose);closeRef.current=onClose;
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    const app=document.querySelector('.portfolio'),wasInert=app?.inert;
    if(app)app.inert=true;
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector('button')?.focus();
    function keydown(event) {
      if (event.key === 'Escape') {event.preventDefault();closeRef.current();}
      if (event.key === 'Tab') {
        const items = [...ref.current.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]')].filter(node=>node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden');
        const first = items[0]; const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = overflow;if(app)app.inert=wasInert;document.removeEventListener('keydown', keydown);if(previous?.isConnected)previous.focus({preventScroll:true}); };
  }, []);
  return createPortal(<div className="modal-backdrop" onPointerDown={(event) => event.target === event.currentTarget && onClose()}>
    <section className={`story-modal ${className}`} role="dialog" aria-modal="true" aria-label={title} ref={ref}>
      <button className="modal-close" onClick={onClose} aria-label={closeLabel}>×</button>{children}
    </section>
  </div>, document.body);
}

export function Photo({ asset, label, code, language, t, className = '', priority = false, interactive = true, fit, motion, motionIndex=0 }) {
  const [open, setOpen] = useState(false);
  const [failedSource,setFailedSource]=useState(null);
  const available=asset?.src&&failedSource!==asset.src;
  const caption = localize(asset?.caption, language);
  const image = available ? <img src={asset.src} alt={localize(asset.alt, language) || label} width="1000" height="1200" decoding="async" style={{objectFit:fit||asset.fit||'cover',objectPosition:asset.position||'center'}} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} onError={()=>{setFailedSource(asset.src);setOpen(false);}} /> : null;
  const content = <>
    {image || <div className="photo-empty"><span className="photo-cross" aria-hidden="true" /><span className="photo-number">{code || 'PTD / PHOTO'}</span><span className="photo-empty-label">{label}<small>{t.photoPending}</small></span><i className="photo-frame-corner" aria-hidden="true" /></div>}
    {image && <figcaption>{caption || label}<Arrow /></figcaption>}
  </>;
  const surface = available && interactive ? <button className="photo-button" onClick={() => setOpen(true)} aria-label={`${language==='vi'?'Xem ảnh':'View photo'}: ${label}`}>{content}</button> : content;
  return <>
    <figure className={`photo ${available ? 'has-photo' : 'is-empty'} ${className}`} data-photo-motion={motion||undefined} style={motion?{'--photo-direction':motionIndex%2?-1:1}:undefined}>
      {motion ? <div className="photo-surface">{surface}</div> : surface}
    </figure>
    {open && <Modal title={label} closeLabel={t.close} onClose={() => setOpen(false)}><img className="lightbox-image" src={asset.src} alt={localize(asset.alt, language) || label} decoding="async" /><h2>{label}</h2>{caption && <p>{caption}</p>}</Modal>}
  </>;
}

export function CvLink({ identity, t, className = 'button button-outline' }) {
  return identity.cv ? <a className={className} href={identity.cv} target="_blank" rel="noopener noreferrer">{t.cv}<Arrow /></a> : <span className={`${className} unavailable`} aria-disabled="true">{t.cvPending}<span aria-hidden="true">—</span></span>;
}

export function Training({ data, language, t, compact = false, photoMotion }) {
  return <article className={`training-card ${compact ? 'is-compact' : ''}`} data-reveal>
    {!compact && <Photo asset={data.image} label={t.certificate} code="VINUNI / CERTIFICATE" language={language} t={t} fit="contain" motion={photoMotion} />}
    <div className="training-content"><div className="training-top"><span className="eyebrow">{t.trainingType}</span><span className="status-pill">{localize(data.status, language)}</span></div>
      <h3>{localize(data.title, language)}</h3><span className="training-org">{data.organization}</span><p>{localize(data.description, language)}</p>
      {data.date && <p>{data.date}</p>}{data.credentialId && <p>ID: {data.credentialId}</p>}
      <div className="inline-links"><ExternalLink href={data.source}>{t.programSource}</ExternalLink>{data.evidence && <ExternalLink href={data.evidence}>{t.evidence}</ExternalLink>}</div>
    </div>
  </article>;
}

export function Contact({ data, language, t, branch = 'home', headingLevel='h2' }) {
  const [copyState, setCopyState] = useState('');
  useEffect(() => {
    if (!copyState) return;
    const id = setTimeout(() => setCopyState(''), 3000);
    return () => clearTimeout(id);
  }, [copyState]);
  const identity = data.identity;
  const Heading=headingLevel;
  async function copyEmail() {
    try { await navigator.clipboard.writeText(identity.email); setCopyState('success'); }
    catch { setCopyState('failed'); }
  }
  return <section className="contact-section" id="contact" aria-labelledby="contact-heading" data-reveal>
    <div className="connection-line" aria-hidden="true"><i /><span>PTD.</span><i /></div>
    <div className="contact-layout"><div><span className="eyebrow">LET’S CONNECT</span><p className="contact-lead">{t[branch === 'personal' ? 'contactPersonal' : branch === 'work' ? 'contactWork' : 'contactHome']}</p><Heading id="contact-heading">{t.contactTitle}</Heading></div>
    <Photo asset={data.assets.contact} label={t.portrait} code="PORTRAIT / 02" language={language} t={t} className="contact-portrait" /></div>
    <div className="contact-bottom"><div className="email-block"><a className="email-link" href={`mailto:${identity.email}`}>{identity.email}<Arrow /></a><button className="copy-button" onClick={copyEmail}>{copyState === 'success' ? t.copied : t.copyEmail}</button><p role="status" className="copy-status">{copyState === 'failed' ? t.copyFailed : copyState === 'success' ? t.copied : ''}</p></div>
    <div className="contact-links"><ExternalLink href={identity.github}>GitHub</ExternalLink><ExternalLink href={identity.linkedin}>LinkedIn</ExternalLink>{identity.phone && <a href={`tel:${identity.phone.replace(/\s/g, '')}`}>{identity.phone}</a>}<CvLink identity={identity} t={t} className="text-cv" /></div></div>
  </section>;
}
