import { useState } from 'react';
import studio from '../../content/studio.json';
import { studioCopy } from '../../content/studioCopy';
import { capabilityProjects } from '../../lib/studio.mjs';
import { WorkHero } from '../work/WorkHero';
import { CapabilityBento } from '../work/CapabilityBento';
import { FeaturedBuilds } from '../work/FeaturedBuilds';
import { ProjectLibrary } from '../work/ProjectLibrary';
import { BuildNotes } from '../work/BuildNotes';
import { ExperienceDossiers } from '../work/ExperienceDossiers';
import { SkillsEvidenceMatrix } from '../work/SkillsEvidenceMatrix';
import { PublicLabBoard } from '../work/PublicLabBoard';
import { CareerDirection, WorkContact } from '../work/CareerDirection';

export { ProjectMeta } from '../work/ProjectElements';

export function Work({data,language,t}) {
  const [capability,setCapability]=useState('');
  const s=studioCopy[language];
  const selected=studio.capabilities.find(item=>item.id===capability);
  const matches=selected?capabilityProjects(selected,data.projects).map(project=>project.slug):[];
  return <div className="build-studio">
    <WorkHero data={data} studio={studio} language={language} t={t} s={s}/>
    <CapabilityBento studio={studio} projects={data.projects} selected={capability} onSelect={setCapability} language={language} t={t} s={s}/>
    <FeaturedBuilds data={data} studio={studio} language={language} t={t} s={s} matches={matches}/>
    <ProjectLibrary projects={data.projects} studio={studio} language={language} t={t} s={s} matches={matches}/>
    <BuildNotes data={data} studio={studio} language={language} t={t} s={s}/>
    <ExperienceDossiers data={data} language={language} t={t} s={s}/>
    <SkillsEvidenceMatrix data={data} studio={studio} language={language} t={t} s={s}/>
    <PublicLabBoard data={data} studio={studio} language={language} t={t} s={s}/>
    <CareerDirection data={data} studio={studio} language={language} t={t} s={s}/>
    <WorkContact data={data} language={language} t={t} s={s}/>
  </div>;
}
