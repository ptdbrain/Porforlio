import {localize as l} from '../../content/copy';
import {projectSummaries} from '../../content/workV4.mjs';
import {ProjectVisual} from './ProjectVisual';
import {Arrow,RouteLink} from './Shared';
export const featuredSlugs=['dpotm','advertest','medtutor','parking-ai'];
export function FeaturedProjects({data,language,t,onProject}) {
 const projects=featuredSlugs.map(slug=>data.projects.find(p=>p.slug===slug)).filter(Boolean);
 return <section className="featured-studies v4-section" id="featured" aria-labelledby="featured-title"><div className="page-width">
   <div className="v4-section-heading" data-work-reveal><span className="v4-label">SELECTED WORK / 01—04</span><h2 id="featured-title">{language==='vi'?'Những bài toán tôi đã chọn giải quyết.':'The problems I chose to solve.'}</h2><p className="v4-lead">{language==='vi'?'Từ nghiên cứu đến ứng dụng. Mỗi dự án là một cách kết nối dữ liệu, mô hình và phần mềm.':'From research to applications. Each project connects data, models and software.'}</p></div>
   <div className="featured-study-grid">{projects.map((project,index)=><RouteLink key={project.slug} className="featured-study" href={`/projects/${project.slug}`} onClick={event=>onProject?.(event,project)} data-project-portal data-work-featured={project.slug} data-work-reveal>
     <ProjectVisual project={project} language={language}/><div className="featured-study-copy"><span className="eyebrow">0{index+1} / {t[project.status]||project.status}</span><h3>{project.title}<Arrow/></h3><p>{l(projectSummaries[project.slug]||project.description,language)}</p><div className="featured-role"><span>{t.role}</span>{l(project.role,language)}</div><div className="featured-stack">{project.stack.slice(0,3).join(' / ')}</div><span className="text-link">{t.caseStudy}<Arrow/></span></div>
   </RouteLink>)}</div>
 </div></section>;
}
