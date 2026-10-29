import { useEffect, useState } from 'react';
import { localize as l } from '../../content/copy';
import { RouteLink } from '../editorial/Shared';
export function CinemaFrame({project,asset,language,c,priority=false,className=''}){
 const [failed,setFailed]=useState(false);
 const source=asset ? (asset.src || (asset.id==='overview'?project.media.cover:'')) : project.media.cover;
 useEffect(()=>setFailed(false),[source]);
 return <div className={`cinema-frame ${className} ${source&&!failed?'has-image':'type-poster'}`}>
  {source&&!failed?<img src={source} alt={l(asset?.alt||project.media.alt,language)||project.title} width="1600" height="1000" loading={priority?'eager':'lazy'} fetchPriority={priority?'high':undefined} onError={()=>setFailed(true)}/>:<div className="cinema-type-poster"><span className="eyebrow">{[project.category].flat().join(' / ')} / REPO {project.year}</span><strong>{project.title}<span>↗</span></strong><p>{l(project.subtitle,language)}</p><small>{c.assetPending}</small></div>}
 </div>;
}
export function ProjectPortal({project,language,c,className='',children,priority=false}){
 return <RouteLink href={`/projects/${project.slug}`} className={`project-portal ${className}`} data-project-portal aria-label={`${project.title} / Case study`}><CinemaFrame project={project} language={language} c={c} priority={priority}/>{children}</RouteLink>;
}
