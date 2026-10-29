import cinema from '../../content/cinema.json';
import studio from '../../content/studio.json';
import { cinemaCopy } from '../../content/cinemaCopy';
import { CinemaMotion } from '../cinema/CinemaMotion';
import { ColdOpenHero } from '../cinema/ColdOpenHero';
import { KineticManifesto } from '../cinema/KineticManifesto';
import { ProjectOrbit } from '../cinema/ProjectOrbit';
import { ProductFilm, ResearchMotion, InteractiveProject } from '../cinema/ProjectWorlds';
import { ExperienceCredits, SkillsInMotion, ExperimentRoom, FutureHorizon, WorkClosing } from '../cinema/StoryScenes';
import { ProjectIndex } from '../cinema/ProjectIndex';
export { ProjectMeta } from '../work/ProjectElements';
export function Work({data,language,t,simple=false}){
 const c=cinemaCopy[language],projects=cinema.featured.map(item=>data.projects.find(p=>p.slug===item.slug)).filter(Boolean);
 const formats={'product-film':ProductFilm,'research-motion':ResearchMotion,'interactive-experience':InteractiveProject};
 return <CinemaMotion simple={simple}>
  <ColdOpenHero data={data} cinema={cinema} language={language} t={t} c={c} simple={simple}/>
  <KineticManifesto cinema={cinema} language={language} c={c}/>
  <ProjectOrbit projects={projects} language={language} t={t} c={c} simple={simple}/>
  {cinema.featured.map(item=>{const project=data.projects.find(p=>p.slug===item.slug),Component=formats[item.format];return project&&Component?<Component key={item.slug} project={project} cinema={cinema} frames={studio.demoFrames} language={language} t={t} c={c} simple={simple}/>:null;})}
  <ExperienceCredits data={data} language={language} t={t} c={c} simple={simple}/>
  <SkillsInMotion data={data} cinema={cinema} language={language} t={t} c={c} simple={simple}/>
  <ExperimentRoom data={data} cinema={cinema} language={language} t={t} c={c} simple={simple}/>
  <ProjectIndex projects={data.projects} studio={studio} language={language} t={t} c={c}/>
  <FutureHorizon data={data} cinema={cinema} language={language} t={t} c={c} simple={simple}/>
  <WorkClosing data={data} language={language} t={t} c={c}/>
 </CinemaMotion>;
}
