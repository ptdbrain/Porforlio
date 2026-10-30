import cinema from '../../content/cinema.json';
import studio from '../../content/studio.json';
import { cinemaCopy } from '../../content/cinemaCopy';
import { CinemaMotion } from '../cinema/CinemaMotion';
import { ColdOpenHero } from '../cinema/ColdOpenHero';
import { ProcessFlow } from '../cinema/ProcessFlow';
import sections from '../../content/workSections.json';
import { SelectedWorks } from '../cinema/SelectedWorks';
import { ExperienceCredits, FutureHorizon, WorkClosing } from '../cinema/StoryScenes';
import { ProjectIndex } from '../cinema/ProjectIndex';
import { WorkCapabilities } from '../cinema/WorkCapabilities';
export { ProjectMeta } from '../work/ProjectElements';
export function Work({data,language,t,simple=false}){
 const c=cinemaCopy[language],projects=cinema.featured.map(item=>data.projects.find(p=>p.slug===item.slug)).filter(Boolean);
 return <CinemaMotion simple={simple}>
  <ColdOpenHero data={data} language={language} t={t} c={c} simple={simple}/>
  <ProcessFlow content={sections.process} language={language} simple={simple}/>
  <ExperienceCredits data={data} language={language} t={t} c={c}/>
  <WorkCapabilities skills={data.skills} language={language} copy={c}/>
  <SelectedWorks content={sections.selected} projects={projects} language={language} t={t} c={c} simple={simple}/>
  <ProjectIndex projects={data.projects} studio={studio} language={language} t={t} c={c}/>
  <FutureHorizon data={data} cinema={cinema} language={language} t={t} c={c} simple={simple}/>
  <WorkClosing data={data} language={language} t={t} c={c}/>
 </CinemaMotion>;
}
