import { localize as l } from '../../content/copy';
import { capabilityProjects } from '../../lib/studio.mjs';
import { Arrow, RouteLink, SectionTitle } from '../editorial/Shared';

function CapabilityGlyph({type}) {
  return <svg className={`capability-glyph glyph-${type}`} viewBox="0 0 160 80" fill="none" aria-hidden="true"><path d="M10 40H150M40 10V70M80 10V70M120 10V70" stroke="currentColor" strokeWidth=".5" opacity=".3"/><rect x="15" y="22" width="30" height="36" rx="3" stroke="currentColor"/><rect x="65" y="12" width="30" height="56" rx="3" stroke="currentColor"/><rect x="115" y="28" width="30" height="24" rx="3" stroke="currentColor"/><circle cx="80" cy="40" r="7" fill="currentColor"/></svg>;
}
export function CapabilityBento({studio,projects,selected,onSelect,language,t,s}) {
  return <section className="capability-section page-width section-space" id="capabilities"><SectionTitle eyebrow={s.capabilitiesLabel} title={s.capabilities}>{s.capabilityHint}</SectionTitle><div className="capability-grid">{studio.capabilities.map((item,index)=>{
    const matches=capabilityProjects(item,projects),open=selected===item.id;
    return <article className={`capability-tile capability-${index+1} ${open?'is-selected':''}`} key={item.id} data-reveal><button className="capability-trigger" aria-expanded={open} aria-controls={`capability-${item.id}`} onClick={()=>onSelect(open?'':item.id)}><span className="eyebrow">0{index+1} / CAPABILITY</span><CapabilityGlyph type={item.glyph}/><h3>{item.title}</h3><p>{l(item.description,language)}</p><span className="capability-count">{matches.length} {s.usedIn}<span aria-hidden="true">{open?'−':'+'}</span></span></button><div className="capability-panel" id={`capability-${item.id}`} hidden={!open}><span className="eyebrow">{s.related}</span>{matches.map(project=><RouteLink href={`/projects/${project.slug}#implementation`} key={project.slug}>{project.title}<Arrow/></RouteLink>)}</div></article>;
  })}</div></section>;
}
