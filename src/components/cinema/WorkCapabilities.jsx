import { localize as l } from '../../content/copy';

export function WorkCapabilities({ skills, language, copy }) {
  return <section className="work-capabilities cinema-cream" id="skills">
    <div className="page-width">
      <div className="capabilities-heading">
        <span className="eyebrow">{copy.skills}</span>
        <h2>{copy.skillsTitle}</h2>
        <p>{copy.skillsIntro}</p>
      </div>
      <div className="capability-groups">
        {skills.map((group, index) => <article className="capability-group" key={l(group.title, language)}>
          <span className="eyebrow">0{index + 1}</span>
          <h3>{l(group.title, language)}</h3>
          <ul>{group.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
        </article>)}
      </div>
      <p className="capabilities-note">{copy.skillsNote}</p>
    </div>
  </section>;
}
