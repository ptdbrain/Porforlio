import { localize as l } from '../../content/copy';
import { Arrow, Contact, CvLink, EmptyText, RouteLink, SectionTitle } from '../editorial/Shared';

export function CareerDirection({data,studio,language,t,s}) {
  return <section className="next-mission section-space" id="next-mission"><div className="page-width"><SectionTitle eyebrow={s.missionLabel} title={s.mission}/><div className="mission-path" aria-hidden="true" data-reveal><span/><i/><span/></div><div className="mission-goals"><article><span className="eyebrow">01 / NEXT</span><h3>{s.nextMonths}</h3><p>{l(data.career.short,language)}</p></article><article><span className="eyebrow">02 / DIRECTION</span><h3>{t.longTerm}</h3><p>{l(data.career.long,language)}</p></article></div>{studio.availabilityUpdatedAt&&l(data.identity.availability,language)&&<p className="mission-availability">{s.openTo}: {l(data.identity.availability,language)} / {studio.availabilityUpdatedAt}</p>}<div className="mission-footer"><EmptyText value={data.identity.workingPreference} label={t.preferences} language={language}/><CvLink identity={data.identity} t={t}/></div></div></section>;
}
export function WorkContact({data,language,t,s}) {
  return <div className="studio-contact page-width"><Contact data={data} language={language} t={t} branch="work"/><RouteLink href="/personal" className="meet-the-person">{s.meetPerson}<Arrow/></RouteLink></div>;
}
