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

export function Modal({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector('button')?.focus();
    function keydown(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const items = [...ref.current.querySelectorAll('button, a[href], [tabindex="0"]')];
        const first = items[0]; const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', keydown); previous?.focus(); };
  }, [onClose]);
  return createPortal(<div className="modal-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
    <section className="story-modal" role="dialog" aria-modal="true" aria-label={title} ref={ref}>
      <button className="modal-close" onClick={onClose} aria-label={title}>×</button>{children}
    </section>
  </div>, document.body);
}

export function Photo({ asset, label, code, language, t, className = '', priority = false, interactive = true }) {
  const [open, setOpen] = useState(false);
  const caption = localize(asset?.caption, language);
  const image = asset?.src ? <img src={asset.src} alt={localize(asset.alt, language) || label} width="1000" height="1200" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} /> : null;
  const content = <>
    {image || <div className="photo-empty"><span className="photo-cross" aria-hidden="true" /><span className="photo-number">{code || 'PTD / PHOTO'}</span><span className="photo-empty-label">{label}<small>{t.photoPending}</small></span><i className="photo-frame-corner" aria-hidden="true" /></div>}
    {image && <figcaption>{caption || label}<Arrow /></figcaption>}
  </>;
  return <>
    <figure className={`photo ${asset?.src ? 'has-photo' : 'is-empty'} ${className}`}>
      {asset?.src && interactive ? <button className="photo-button" onClick={() => setOpen(true)} aria-label={`${t.details}: ${label}`}>{content}</button> : content}
    </figure>
    {open && <Modal title={t.close} onClose={() => setOpen(false)}><img className="lightbox-image" src={asset.src} alt={localize(asset.alt, language) || label} /><h2>{label}</h2>{caption && <p>{caption}</p>}</Modal>}
  </>;
}

export function CvLink({ identity, t, className = 'button button-outline' }) {
  return identity.cv ? <a className={className} href={identity.cv} target="_blank" rel="noopener noreferrer">{t.cv}<Arrow /></a> : <span className={`${className} unavailable`} aria-disabled="true">{t.cvPending}<span aria-hidden="true">—</span></span>;
}

export function Training({ data, language, t, compact = false }) {
  return <article className={`training-card ${compact ? 'is-compact' : ''}`} data-reveal>
    {!compact && <Photo asset={data.image} label={t.certificate} code="VINUNI / CERTIFICATE" language={language} t={t} />}
    <div className="training-content"><div className="training-top"><span className="eyebrow">{t.trainingType}</span><span className="status-pill">{localize(data.status, language)}</span></div>
      <h3>{localize(data.title, language)}</h3><span className="training-org">{data.organization}</span><p>{localize(data.description, language)}</p>
      {data.date && <p>{data.date}</p>}{data.credentialId && <p>ID: {data.credentialId}</p>}
      <div className="inline-links"><ExternalLink href={data.source}>{t.programSource}</ExternalLink>{data.evidence && <ExternalLink href={data.evidence}>{t.evidence}</ExternalLink>}</div>
    </div>
  </article>;
}

export function Contact({ data, language, t, branch = 'home' }) {
  const [copyState, setCopyState] = useState('');
  useEffect(() => {
    if (!copyState) return;
    const id = setTimeout(() => setCopyState(''), 3000);
    return () => clearTimeout(id);
  }, [copyState]);
  const identity = data.identity;
  async function copyEmail() {
    try { await navigator.clipboard.writeText(identity.email); setCopyState('success'); }
    catch { setCopyState('failed'); }
  }
  return <section className="contact-section" id="contact" data-reveal>
    <div className="connection-line" aria-hidden="true"><i /><span>PTD.</span><i /></div>
    <div className="contact-layout"><div><span className="eyebrow">LET’S CONNECT</span><p className="contact-lead">{t[branch === 'personal' ? 'contactPersonal' : branch === 'work' ? 'contactWork' : 'contactHome']}</p><h2>{t.contactTitle}</h2></div>
    <Photo asset={data.assets.contact} label={t.portrait} code="PORTRAIT / 02" language={language} t={t} className="contact-portrait" /></div>
    <div className="contact-bottom"><div className="email-block"><a className="email-link" href={`mailto:${identity.email}`}>{identity.email}<Arrow /></a><button className="copy-button" onClick={copyEmail}>{copyState === 'success' ? t.copied : t.copyEmail}</button><p role="status" className="copy-status">{copyState === 'failed' ? t.copyFailed : copyState === 'success' ? t.copied : ''}</p></div>
    <div className="contact-links"><ExternalLink href={identity.github}>GitHub</ExternalLink><ExternalLink href={identity.linkedin}>LinkedIn</ExternalLink>{identity.phone && <a href={`tel:${identity.phone.replace(/\s/g, '')}`}>{identity.phone}</a>}<CvLink identity={identity} t={t} className="text-cv" /></div></div>
  </section>;
}
