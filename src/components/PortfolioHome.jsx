import { useEffect, useRef, useState } from 'react';
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

function ProjectDetail({ project, language, labels, isOpen, onClose }) {
  if (!project) return null;

  const localized = project[language];

  return (
    <div
      className={`project-detail-layer ${isOpen ? 'is-open' : ''}`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="project-detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-detail-${project.id}`}
      >
        <button
          className="project-detail-close"
          type="button"
          aria-label={labels.closeLabel}
          autoFocus
          onClick={onClose}
        >
          ×
        </button>

        <div className={`project-preview ${project.media.image ? 'has-image' : ''}`}>
          {project.media.image ? (
            <img src={project.media.image} alt={project.media.alt || localized.title} />
          ) : (
            <div className="project-preview-system">
              <span>{labels.previewLabel}</span>
              <strong>{project.id.toUpperCase()}</strong>
              <div className="preview-scanline" />
            </div>
          )}
        </div>

        <div className="project-detail-copy">
          <p className="eyebrow">{labels.detailEyebrow}</p>
          <h2 id={`project-detail-${project.id}`}>{localized.title}</h2>
          <p>{localized.description}</p>

          <div className="project-detail-grid">
            <div>
              <span className="mini-label">{labels.stackLabel}</span>
              <Tags tags={project.stack} />
            </div>
            <div>
              <span className="mini-label">{labels.featureLabel}</span>
              <ul>
                {localized.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </div>

          <div className="project-detail-actions">
            {project.links.demo ? (
              <a className="button primary" href={project.links.demo} target="_blank" rel="noreferrer">
                {labels.demoLabel} ↗
              </a>
            ) : (
              <span className="button is-disabled">{labels.demoLabel}: {labels.unavailable}</span>
            )}
            {project.links.github ? (
              <a className="button ghost" href={project.links.github} target="_blank" rel="noreferrer">
                {labels.githubLabel} ↗
              </a>
            ) : (
              <span className="button is-disabled">{labels.githubLabel}: {labels.unavailable}</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PortfolioHome({ visible }) {
  const appRef = useRef(null);
  const projectCloseTimer = useRef(0);
  const [language, setLanguage] = useState('vi');
  const [category, setCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDetailOpen, setProjectDetailOpen] = useState(false);
  const content = portfolioContent[language];
  const projects = getProjectsByCategory(category);
  const contactLinks = getVisibleContactLinks(contactConfig);

  document.title = content.metaTitle;
  document.documentElement.lang = language;

  useEffect(() => {
    const app = appRef.current;
    if (!app) return undefined;

    const revealItems = app.querySelectorAll('[data-reveal]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    app.classList.add('reveal-ready');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-revealed', entry.isIntersecting);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [language, category]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => setProjectDetailOpen(true));

    function handleKeyDown(event) {
      if (event.key === 'Escape') closeProjectDetail();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  function openProjectDetail(project) {
    window.clearTimeout(projectCloseTimer.current);
    setSelectedProject(project);
  }

  function closeProjectDetail() {
    setProjectDetailOpen(false);
    projectCloseTimer.current = window.setTimeout(() => setSelectedProject(null), 320);
  }

  return (
    <div ref={appRef} className={`portfolio-app ${visible ? 'is-visible' : ''}`}>
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
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">{content.about.eyebrow}</p>
            <h2>{content.about.title}</h2>
          </div>
          <div className="about-grid">
            <p data-reveal="left">{content.about.body}</p>
            <div className="stat-grid" data-reveal="right">
              {content.about.stats.map(([value, label]) => (
                <div className="stat" key={`${value}-${label}`}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="direction" data-reveal="up">
            <h3>{content.direction.title}</h3>
            <p>{content.direction.body}</p>
          </div>
          <div className="about-details">
            <div className="section-heading compact-heading" data-reveal="up">
              <p className="eyebrow">{content.about.educationTitle}</p>
              <h3>{content.about.educationIntro}</h3>
            </div>
            <div className="education-grid">
              {content.about.educationStages.map((stage, index) => (
                <article
                  className="education-stage"
                  data-reveal={index % 2 === 0 ? 'left' : 'right'}
                  style={{ '--reveal-delay': `${index * 80}ms` }}
                  key={stage.id}
                >
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
            <div className="hobby-panel" data-reveal="up">
              <h3>{content.about.hobbiesTitle}</h3>
              <div className="hobby-list">
                {content.about.hobbies.map((hobby) => <span key={hobby}>{hobby}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Capabilities</p>
            <h2>{content.skills.title}</h2>
          </div>
          <div className="skill-grid">
            {content.skills.groups.map(([title, skills], index) => (
              <article
                className="skill-card"
                data-reveal="up"
                style={{ '--reveal-delay': `${(index % 3) * 80}ms` }}
                key={title}
              >
                <h3>{title}</h3>
                <Tags tags={skills} />
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Selected work</p>
            <h2>{content.projects.title}</h2>
            <p>{content.projects.intro}</p>
          </div>
          <div className="project-filters" data-reveal="up" aria-label="Project filters">
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
                <article
                  className="project-card"
                  data-reveal="up"
                  style={{ '--reveal-delay': `${(index % 3) * 90}ms` }}
                  role="button"
                  tabIndex="0"
                  aria-haspopup="dialog"
                  onClick={() => openProjectDetail(project)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      openProjectDetail(project);
                    }
                  }}
                  key={project.id}
                >
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
                  <div className="project-card-open">
                    <span>{content.projects.viewDetails}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="journey" className="section">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Learning path</p>
            <h2>{content.journey.title}</h2>
          </div>
          <div className="timeline">
            {content.journey.items.map(([number, title, body], index) => (
              <article
                className="timeline-item"
                data-reveal="left"
                style={{ '--reveal-delay': `${index * 70}ms` }}
                key={number}
              >
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
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Research memory</p>
            <h2>{content.notes.title}</h2>
          </div>
          <div className="notes-grid">
            {content.notes.items.map(([title, body], index) => (
              <article
                className="note-card"
                data-reveal="up"
                style={{ '--reveal-delay': `${(index % 3) * 80}ms` }}
                key={title}
              >
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="contact-panel">
            <div data-reveal="left">
              <p className="eyebrow">{content.contact.eyebrow}</p>
              <h2>{content.contact.title}</h2>
              <p>{content.contact.body}</p>
              <div className="contact-availability">
                <span className="availability-dot" aria-hidden="true" />
                <div>
                  <strong>{content.contact.availability}</strong>
                  <span>{content.contact.response}</span>
                </div>
              </div>
            </div>
            <div className="contact-directory" data-reveal="right">
              {contactLinks.map((item) => {
                const label = item.label[language];
                const value = typeof item.value === 'object' ? item.value[language] : item.value;
                const contentValue = value || content.contact.unavailable;
                const itemContent = (
                  <>
                    <span className="contact-code" aria-hidden="true">{item.code}</span>
                    <span className="contact-detail">
                      <small>{label}</small>
                      <strong>{contentValue}</strong>
                    </span>
                    {item.href && <span className="contact-arrow" aria-hidden="true">↗</span>}
                  </>
                );

                return item.href ? (
                  <a
                    className="contact-item is-link"
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    key={item.id}
                  >
                    {itemContent}
                  </a>
                ) : (
                  <div className={`contact-item ${value ? '' : 'is-pending'}`} key={item.id}>
                    {itemContent}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Dat Brain Portfolio</strong>
          <span>AI Engineer | Computer Vision | RAG/LLM</span>
        </div>
        <a href="https://github.com/ptdbrain" target="_blank" rel="noreferrer">
          github.com/ptdbrain ↗
        </a>
      </footer>

      <ProjectDetail
        project={selectedProject}
        language={language}
        labels={content.projects}
        isOpen={projectDetailOpen}
        onClose={closeProjectDetail}
      />
    </div>
  );
}
