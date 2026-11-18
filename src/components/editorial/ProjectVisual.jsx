import { localize as l } from '../../content/copy';

export function ProjectVisual({project,language,priority=false,className='',variant='cover'}) {
  if(variant==='flow'&&!project.media.cover){
    const label=language==='vi'?'Luồng xử lý':'System flow';
    return <figure className={`project-visual project-visual-flow ${className}`}>
      <figcaption>{label}</figcaption>
      <ol className="project-flow-nodes" aria-label={label}>{project.pipeline.slice(0,4).map((node,index)=><li key={`${index}-${node.title}`}><span aria-hidden="true">0{index+1}</span><strong>{node.title}</strong></li>)}</ol>
    </figure>;
  }
  return <figure className={`project-visual ${className}`}>
    <img src={project.media.cover || `/project-maps/${project.slug}.svg`} alt={project.media.cover ? l(project.media.alt,language)||project.title : `${project.title} / ${language==='vi'?'Sơ đồ từ tài liệu dự án':'Diagram from project documentation'}: ${project.pipeline.map(node=>node.title).join(' → ')}`} width="1200" height="720" loading={priority?'eager':'lazy'} decoding="async" fetchpriority={priority?'high':undefined}/>
    {!project.media.cover&&<figcaption>{language==='vi'?'Sơ đồ hệ thống · Từ tài liệu dự án':'System map · From project documentation'}</figcaption>}
  </figure>;
}
