import { useState } from 'react';
import {
  categoryOptions,
  contactConfig,
  getProjectsByCategory,
  getVisibleContactLinks,
  portfolioContent,
} from '../data/portfolioData.mjs';

function Tags({ tags }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
    </div>
  );
}

export default function PortfolioHome({ visible }) {
  const [language, setLanguage] = useState('vi');
  const [category, setCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const content = portfolioContent[language];
  const projects = getProjectsByCategory(category);
  const contactLinks = getVisibleContactLinks(contactConfig);

  document.title = content.metaTitle;
  document.documentElement.lang = language;

  return (
    <div className={`portfolio-app ${visible ? 'is-visible' : ''}`}>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Go to home">
          <span className="brand-mark">DB</span>
          <span>Dat Brain</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
          {['home', 'about', 'skills', 'projects', 'journey', 'notes', 'contact'].map((id, index) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
              {content.nav[index]}
            </a>
          ))}
        </nav>

        <div className="language-switch" aria-label="Language switch">
          {['vi', 'en'].map((code) => (
            <button
              className={language === code ? 'active' : ''}
              type="button"
              key={code}
              onClick={() => setLanguage(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">Digital AI Lab Portfolio</p>
            <h1>{content.hero.name}</h1>
            <p className="hero-role">{content.hero.role}</p>
            <p className="hero-headline">{content.hero.headline}</p>
            <p className="hero-body">{content.hero.body}</p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">{content.hero.primaryCta}</a>
              <a className="button ghost" href="#contact">{content.hero.secondaryCta}</a>
            </div>
          </div>

          <div className="lab-panel" aria-label="AI lab visualization">
            <div className="panel-topline"><span>VISION</span><span>RAG</span><span>DEPLOY</span></div>
            <div className="scanner">
              <span className="node n1" />
              <span className="node n2" />
              <span className="node n3" />
              <span className="node n4" />
            </div>
            <div className="signal-ring" />
            <div className="panel-readout">
              <span>YOLO</span>
              <span>FastAPI</span>
              <span>Vector DB</span>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-heading">
            <p className="eyebrow">{content.about.eyebrow}</p>
            <h2>{content.about.title}</h2>
          </div>
          <div className="about-grid">
            <p>{content.about.body}</p>
            <div className="stat-grid">
              {content.about.stats.map(([value, label]) => (
                <div className="stat" key={`${value}-${label}`}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="direction">
            <h3>{content.direction.title}</h3>
            <p>{content.direction.body}</p>
          </div>
          <div className="about-details">
            <div className="section-heading compact-heading">
              <p className="eyebrow">{content.about.educationTitle}</p>
              <h3>{content.about.educationIntro}</h3>
            </div>
            <div className="education-grid">
              {content.about.educationStages.map((stage, index) => (
                <article className="education-stage" key={stage.id}>
                  <div className={`stage-media ${stage.image.src ? 'has-image' : ''}`}>
                    {stage.image.src ? (
                      <img src={stage.image.src} alt={stage.image.alt} />
                    ) : (
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    )}
                  </div>
                  <div className="stage-copy">
                    <p className="mini-label">{stage.label}</p>
                    <h3>{stage.title}</h3>
                    <p>{stage.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="hobby-panel">
              <h3>{content.about.hobbiesTitle}</h3>
              <div className="hobby-list">
                {content.about.hobbies.map((hobby) => <span key={hobby}>{hobby}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-heading">
            <p className="eyebrow">Capabilities</p>
            <h2>{content.skills.title}</h2>
          </div>
          <div className="skill-grid">
            {content.skills.groups.map(([title, skills]) => (
              <article className="skill-card" key={title}>
                <h3>{title}</h3>
                <Tags tags={skills} />
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2>{content.projects.title}</h2>
            <p>{content.projects.intro}</p>
          </div>
          <div className="project-filters" aria-label="Project filters">
            {categoryOptions.map((option) => (
              <button
                className={`filter-button ${category === option.id ? 'active' : ''}`}
                type="button"
                key={option.id}
                onClick={() => setCategory(option.id)}
              >
                {option[language]}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {projects.map((project, index) => {
              const localized = project[language];
              return (
                <article className="project-card" style={{ '--delay': `${index * 70}ms` }} key={project.id}>
                  <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
                  <h3>{localized.title}</h3>
                  <p>{localized.description}</p>
                  <div>
                    <span className="mini-label">{content.projects.stackLabel}</span>
                    <Tags tags={project.stack} />
                  </div>
                  <div>
                    <span className="mini-label">{content.projects.featureLabel}</span>
                    <ul>
                      {localized.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="journey" className="section">
          <div className="section-heading">
            <p className="eyebrow">Learning path</p>
            <h2>{content.journey.title}</h2>
          </div>
          <div className="timeline">
            {content.journey.items.map(([number, title, body]) => (
              <article className="timeline-item" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="notes" className="section">
          <div className="section-heading">
            <p className="eyebrow">Research memory</p>
            <h2>{content.notes.title}</h2>
          </div>
          <div className="notes-grid">
            {content.notes.items.map(([title, body]) => (
              <article className="note-card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="contact-panel">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>{content.contact.title}</h2>
              <p>{content.contact.body}</p>
            </div>
            <div className="contact-links">
              {contactLinks.length ? contactLinks.map((link) => (
                <a href={link.value} key={link.key}>{link.key}</a>
              )) : (
                <p className="muted">{content.contact.empty}</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Dat Brain Portfolio</span>
        <span>AI Engineer | Computer Vision | RAG/LLM</span>
      </footer>
    </div>
  );
}
