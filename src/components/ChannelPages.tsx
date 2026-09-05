import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  experiences,
  interests,
  profile,
  projects,
  skillGroups,
  type IconName,
} from '../data/portfolio';
import { ChannelIcon } from './ChannelIcon';
import { ChannelLayout } from './AppShell';

const companyLogos: Record<string, string> = {
  AMD: '/images/logos/amd.jpg',
  Tallysight: '/images/logos/tallysight.jpg',
  "Queen's Space Engineering Team": '/images/logos/qset.jpg',
  "Queen's University": '/images/logos/queens.jpg',
  Swarmed: '/images/logos/swarmed.jpg',
  'CAD Railway Industries': '/images/logos/cad-railway.jpg',
};

const projectImages: Record<string, { src: string; alt: string }> = {
  odysseywalk: {
    src: '/images/projects/odysseywalk.png',
    alt: 'OdysseyWalk live product showing its worldwide walking-tour browser',
  },
  spin2dine: {
    src: '/images/projects/spin2dine.png',
    alt: 'Spin2Dine live product showing its restaurant discovery landing page',
  },
};

function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="tag-list" aria-label="Technologies">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="project-link" href={href} target="_blank" rel="noreferrer">
      {children}
      <ChannelIcon name="external" size={16} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function AboutPage() {
  return (
    <ChannelLayout
      number="01"
      eyebrow="Start here"
      title="Start Here"
      intro="I'm a Computer Engineering student at Queen's who likes working where software meets real constraints - hardware, people, performance, and production."
    >
      <section className="about-hero">
        <figure className="portrait-card">
          <div className="portrait-frame">
            <img src="/images/linkedin-headshot.jpg" alt="Aaron Kleiman" />
            <span className="portrait-status"><i aria-hidden="true" /> Toronto, ON</span>
          </div>
          <figcaption>
            <span>Computer Engineering</span>
            <strong>Queen's University - '28</strong>
          </figcaption>
        </figure>

        <div className="about-copy">
          <p className="lead-copy">{profile.positioning}</p>
          <div className="principle-grid">
            <article>
              <span>01</span>
              <h2>Work close to reality</h2>
              <p>Validation, robotics, and infrastructure reveal the edge cases that make engineering interesting.</p>
            </article>
            <article>
              <span>02</span>
              <h2>Automate the repeatable</h2>
              <p>Good tooling gives people more time for judgment, investigation, and invention.</p>
            </article>
            <article>
              <span>03</span>
              <h2>Make complexity legible</h2>
              <p>A thoughtful interface can turn a dense system into something people trust and enjoy using.</p>
            </article>
          </div>
          <div className="button-row">
            <Link className="primary-button" to="/projects">See selected work <ChannelIcon name="arrow" size={18} /></Link>
            <Link className="secondary-button" to="/contact">Get in touch</Link>
          </div>
        </div>
      </section>

    </ChannelLayout>
  );
}

export function ExperiencePage() {
  return (
    <ChannelLayout
      number="02"
      eyebrow="Experience"
      title="Experience"
      intro="A career path moving through technical operations, product software, robotics, AI automation, and datacenter GPU systems."
    >
      <section className="timeline" aria-label="Career timeline">
        {experiences.map((experience, index) => (
          <article className="timeline-item" key={`${experience.company}-${experience.title}`}>
            <div className="timeline-marker" aria-hidden="true">
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="timeline-card">
              <div className="timeline-meta">
                <span>{experience.kind}</span>
                <time>{experience.dates}</time>
              </div>
              <div className="timeline-company">
                <img src={companyLogos[experience.company]} alt="" />
                <div>
                  <h2>{experience.company}</h2>
                  <h3>{experience.title}</h3>
                </div>
              </div>
              <p>{experience.summary}</p>
              <TagList items={experience.tech} />
              <details>
                <summary>Selected impact <span aria-hidden="true">+</span></summary>
                <ul className="impact-list">
                  {experience.impact.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </details>
            </div>
          </article>
        ))}
      </section>
    </ChannelLayout>
  );
}

function ProjectVisual({ project }: { project: (typeof projects)[number] }) {
  const preview = projectImages[project.id];

  if (preview) {
    return (
      <figure className="project-visual project-product-preview">
        <img src={preview.src} alt={preview.alt} />
        <figcaption><span>Live product</span>{project.signal}</figcaption>
      </figure>
    );
  }

  return (
    <div className="project-visual project-system-panel" aria-label={`${project.name} system summary`}>
      <header><span>AK / PROJECT</span><b>{project.id.toUpperCase()}</b></header>
      <dl>
        <div><dt>System</dt><dd>{project.signal}</dd></div>
        <div><dt>Mode</dt><dd>{project.kicker}</dd></div>
      <div><dt>Core stack</dt><dd>{project.stack.slice(0, 3).join(' - ')}</dd></div>
      </dl>
      <footer><span>Documented build</span><i aria-hidden="true" /></footer>
    </div>
  );
}

export function ProjectsPage() {
  return (
    <ChannelLayout
      number="03"
      eyebrow="Selected work"
      title="Projects"
      intro="A selection of systems and products chosen for the engineering decisions behind them - not just the technologies listed underneath."
    >
      <section className="project-stack" aria-label="Featured projects">
        {projects.map((project, index) => (
          <article className={`project-card${index < 2 ? ' flagship' : ''}`} key={project.id}>
            <ProjectVisual project={project} />
            <div className="project-body">
              <div className="project-heading">
                <div>
                  <p className="eyebrow">{project.kicker}</p>
                  <h2>{project.name}</h2>
                </div>
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="project-summary">{project.summary}</p>
              <div className="decision-block">
                <h3>Key engineering decisions</h3>
                <ul>
                  {project.decisions.map((decision) => <li key={decision}>{decision}</li>)}
                </ul>
              </div>
              <TagList items={project.stack} />
              {(project.github || project.live) && (
                <div className="project-links">
                  {project.live && <ExternalLink href={project.live}>Live experience</ExternalLink>}
                  {project.github && <ExternalLink href={project.github}>View source</ExternalLink>}
                </div>
              )}
            </div>
          </article>
        ))}
      </section>
    </ChannelLayout>
  );
}

export function SkillsPage() {
  const [active, setActive] = useState(0);
  const selected = skillGroups[active];

  return (
    <ChannelLayout
      number="04"
      eyebrow="Skills & toolbox"
      title="Skills & Toolbox"
      intro="Choose a capability area to see the technologies I use and where they show up in real work."
    >
      <section className="toolbox-layout">
        <div className="toolbox-tabs" role="list" aria-label="Skill categories">
          {skillGroups.map((group, index) => (
            <button
              type="button"
              key={group.name}
              className={index === active ? 'active' : ''}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {group.name}
              <ChannelIcon name="arrow" size={18} />
            </button>
          ))}
        </div>
        <article className="toolbox-panel" aria-live="polite">
          <p className="eyebrow">Selected capability</p>
          <h2>{selected.name}</h2>
          <p className="toolbox-description">{selected.description}</p>
          <div className="tool-cloud">
            {selected.skills.map((skill, index) => (
              <span key={skill} style={{ '--tool-index': index } as CSSProperties}>{skill}</span>
            ))}
          </div>
          <div className="proof-block">
            <h3>Seen in</h3>
            <ul>{selected.proof.map((proof) => <li key={proof}>{proof}</li>)}</ul>
          </div>
        </article>
      </section>
    </ChannelLayout>
  );
}

const resumeAvailable = false;

export function ResumePage() {
  return (
    <ChannelLayout
      number="05"
      eyebrow="Resume"
      title="Resume"
      intro="A compact overview of experience, projects, and core tools."
    >
      <section className="resume-toolbar" aria-label="Resume actions">
        <div>
          <strong>Aaron Kleiman - Computer Engineering</strong>
          <span>Toronto, Ontario - BASc 2023-2028</span>
        </div>
        {resumeAvailable ? (
          <a className="primary-button" href="/Aaron-Kleiman-Resume.pdf" download>
            Download PDF <ChannelIcon name="download" size={18} />
          </a>
        ) : (
          <span className="disabled-button" aria-disabled="true" title="Add Aaron-Kleiman-Resume.pdf to public/ to enable">
            PDF awaiting upload <ChannelIcon name="download" size={18} />
          </span>
        )}
      </section>

      {!resumeAvailable && (
        <aside className="content-notice">
          <ChannelIcon name="resume" size={25} />
          <div>
            <strong>No resume PDF is available yet.</strong>
            <p>This page stays useful without a broken download. Add the current PDF as <code>public/Aaron-Kleiman-Resume.pdf</code>, then switch <code>resumeAvailable</code> to <code>true</code>.</p>
          </div>
        </aside>
      )}

      <section className="resume-sheet" aria-label="Condensed resume">
        <div className="resume-profile">
          <p className="eyebrow">Profile</p>
          <h2>Systems software, AI tooling, and product-minded engineering.</h2>
          <p>{profile.positioning}</p>
          <div className="resume-contact-line">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer">github.com/aaronk2005</a>
          </div>
        </div>
        <div className="resume-columns">
          <section>
            <h3>Recent experience</h3>
            {experiences.slice(0, 5).map((experience) => (
              <article className="resume-role" key={experience.company}>
                <div><strong>{experience.company}</strong><time>{experience.dates}</time></div>
                <span>{experience.title}</span>
                <p>{experience.summary}</p>
              </article>
            ))}
          </section>
          <aside>
            <h3>Selected projects</h3>
            {projects.slice(0, 3).map((project) => (
              <article className="resume-project" key={project.id}>
                <strong>{project.name}</strong>
                <span>{project.kicker}</span>
                <p>{project.summary}</p>
              </article>
            ))}
            <h3>Core stack</h3>
            <TagList items={['Python', 'TypeScript', 'C/C++', 'Linux', 'React', 'ROCm', 'ROS 2', 'Docker', 'CI/CD', 'RAG']} />
          </aside>
        </div>
      </section>
    </ChannelLayout>
  );
}

export function NowPage() {
  return (
    <ChannelLayout
      number="06"
      eyebrow="Now building"
      title="Now Building"
      intro="AgentBench is an in-progress developer tool for testing and evaluating AI agents and skills."
    >
      <section className="now-layout">
        <article className="now-feature">
          <div className="agentbench-console" aria-label="AgentBench workbench preview">
            <header><span>AGENTBENCH / LOCAL</span><b>BUILDING</b></header>
            <div className="agentbench-run">
              <span>Evaluation workspace</span>
              <strong>Trace what an agent did - and why.</strong>
            </div>
            <ul>
              <li><span>01</span>Scenario runner<i>ready</i></li>
              <li><span>02</span>Trace review<i>building</i></li>
              <li><span>03</span>RAG inspection<i>exploring</i></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow"><span className="signal-dot" aria-hidden="true" /> Active exploration</p>
            <h2>AgentBench</h2>
            <p>A workbench for running repeatable agent tests, understanding failures, and comparing behavior across skills and environments.</p>
            <div className="status-chip">In development - scope evolving</div>
          </div>
        </article>
        <div className="exploration-list">
          <h2>Currently exploring</h2>
          {[
            ['01', 'Agent testing', 'Repeatable scenarios, regression suites, and behavior-level evaluation.'],
            ['02', 'RAG & observability', 'Tracing retrieval, tool calls, and context quality across a run.'],
            ['03', 'Developer tools', 'Interfaces that make failure analysis faster and less ambiguous.'],
            ['04', 'Robust automation', 'Workflows that degrade clearly and recover without hiding important state.'],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>
    </ChannelLayout>
  );
}

type GuideMessage = {
  id: number;
  speaker: 'guide' | 'visitor';
  text: string;
};

function answerAaronQuestion(question: string) {
  const normalized = question.toLowerCase();

  if (/amd|experience|work|career|intern/.test(normalized)) {
    return 'Aaron currently works in datacenter GPU validation at AMD, building Python and YAML automation across firmware, drivers, ROCm workloads, regression triage, and AI-assisted failure classification. His path also includes product engineering at Tallysight, rover UI leadership, teaching, and full-stack work.';
  }
  if (/project|build|odyssey|robot|spin2dine/.test(normalized)) {
    return 'Start with OdysseyWalk, a QHacks 2026-winning voice-first walking tour, and the Autonomous Taxi Robot, which combined A*, PID control, a finite-state machine, and on-device inference. Spin2Dine is the strongest example of his playful full-stack product work.';
  }
  if (/skill|stack|language|technology|tech/.test(normalized)) {
    return 'His strongest through-line is dependable software around real systems: Python, TypeScript, C/C++, Linux, React, CI/CD, ROCm, ROS 2, embedded hardware, RAG, and agent tooling. The Toolbox channel connects each group to actual work.';
  }
  if (/hobby|outside|fun|sport|music|travel|food/.test(normalized)) {
    return 'Outside engineering, Aaron is into hockey, basketball, the gym, cooking, travel, strategy games, rap, jazz, and lo-fi. The Hobbies channel has the fuller, less recruiter-shaped version.';
  }
  if (/contact|email|reach|hire|opportunity/.test(normalized)) {
    return 'The fastest route is aaron.kleiman@queensu.ca. You can also use the LinkedIn and GitHub channels from the Wii Menu. He is especially interested in systems software, validation, developer tools, and AI infrastructure.';
  }
  if (/who|about|aaron/.test(normalized)) {
    return "Aaron is a Toronto-based Computer Engineering student at Queen's University. He works across systems software, AI tooling, robotics, and product engineering - and cares about making complex systems useful and legible.";
  }
  return "I'm a focused portfolio guide, so I'm best at questions about Aaron's experience, projects, skills, hobbies, or how to contact him. Try one of the prompts above.";
}

export function AaronAIPage() {
  const [messages, setMessages] = useState<GuideMessage[]>([
    {
      id: 1,
      speaker: 'guide',
      text: "Hi - I'm Aaron AI, a small local guide to this portfolio. Ask about Aaron's projects, work, skills, or life outside engineering.",
    },
  ]);
  const [draft, setDraft] = useState('');

  const sendQuestion = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    const id = Date.now();
    setMessages((current) => [
      ...current,
      { id, speaker: 'visitor', text: cleanQuestion },
      { id: id + 1, speaker: 'guide', text: answerAaronQuestion(cleanQuestion) },
    ]);
    setDraft('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendQuestion(draft);
  };

  const prompts = [
    'What does Aaron build?',
    'What is Aaron doing at AMD?',
    'What are his strongest skills?',
    'What does he do outside work?',
  ];

  return (
    <ChannelLayout
      number="07"
      eyebrow="Interactive portfolio guide"
      title="Aaron AI"
      intro="A compact local guide to this portfolio. It answers from this site's content and does not send your text to an external AI service."
    >
      <section className="aaron-ai-layout">
        <aside className="ai-prompt-panel">
          <p className="eyebrow">Ask a quick question</p>
          <h2>Choose a prompt</h2>
          <div className="ai-prompt-list">
            {prompts.map((prompt) => (
              <button type="button" key={prompt} onClick={() => sendQuestion(prompt)}>{prompt}</button>
            ))}
          </div>
          <p className="ai-local-note"><span aria-hidden="true">1</span> Local portfolio guide - no account required</p>
        </aside>
        <div className="ai-console">
          <header><span>Aaron AI Channel</span><i aria-hidden="true" /> Ready</header>
          <div className="ai-messages" aria-live="polite" aria-label="Conversation with Aaron AI">
            {messages.map((message) => (
              <article className={`ai-message ${message.speaker}`} key={message.id}>
                <span>{message.speaker === 'guide' ? 'AK' : 'You'}</span>
                <p>{message.text}</p>
              </article>
            ))}
          </div>
          <form className="ai-input-row" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="aaron-ai-question">Ask Aaron AI a question</label>
            <input
              id="aaron-ai-question"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about Aaron..."
              autoComplete="off"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </section>
    </ChannelLayout>
  );
}

export function HobbiesPage() {
  return (
    <ChannelLayout
      number="08"
      eyebrow="Beyond engineering"
      title="Hobbies"
      intro="The things that keep me curious, competitive, and away from a debugger once in a while."
    >
      <section className="hobby-grid" aria-label="Aaron's interests and hobbies">
        {interests.map((interest, index) => (
          <article className="hobby-card" key={interest.name}>
            <header><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true" /></header>
            <h2>{interest.name}</h2>
            <p>{interest.lead}</p>
            <ul>{interest.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </section>
      <aside className="hobby-wii-note">
        <img src="/images/wii/wii-logo.svg" alt="Wii" />
        <div><strong>The nostalgia is real.</strong><p>My childhood favourites were Mario Kart and Wii Sports - so this portfolio theme is personal.</p></div>
      </aside>
    </ChannelLayout>
  );
}

export function ContactPage() {
  const methods = [
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: 'mail' as IconName,
      note: 'Best for opportunities and collaborations',
      external: false,
    },
    {
      label: 'LinkedIn',
      value: 'Connect professionally',
      href: profile.linkedin,
      icon: 'linkedin' as IconName,
      note: 'Experience, updates, and messages',
      external: true,
    },
    {
      label: 'GitHub',
      value: '@aaronk2005',
      href: profile.github,
      icon: 'github' as IconName,
      note: 'Code, experiments, and repositories',
      external: true,
    },
  ];

  return (
    <ChannelLayout
      number="09"
      eyebrow="Contact"
      title="Contact"
      intro="For software, systems, validation, developer-tooling, and AI infrastructure conversations, these are the direct routes."
    >
      <section className="contact-layout">
        <div className="contact-statement">
          <p className="eyebrow"><span className="signal-dot" aria-hidden="true" /> Toronto - Eastern Time</p>
          <h2>I'm especially interested in work where software touches real systems.</h2>
          <p>No contact form, no mystery backend. Choose a direct channel and your message goes where you expect.</p>
        </div>
        <div className="contact-methods">
          {methods.map((method) => (
            <a
              href={method.href}
              key={method.label}
              target={method.external ? '_blank' : undefined}
              rel={method.external ? 'noreferrer' : undefined}
            >
              <span className="contact-icon"><ChannelIcon name={method.icon} size={29} /></span>
              <span className="contact-copy">
                <small>{method.label}</small>
                <strong>{method.value}</strong>
                <span>{method.note}</span>
              </span>
              <ChannelIcon name={method.external ? 'external' : 'arrow'} size={20} />
              {method.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          ))}
        </div>
      </section>
    </ChannelLayout>
  );
}

export function NotFoundPage() {
  return (
    <ChannelLayout
      number="404"
      eyebrow="Channel unavailable"
      title="Channel unavailable"
      intro="The page may have moved, or the address may be incomplete. The main menu has every available channel."
    >
      <section className="empty-state">
        <ChannelIcon name="home" size={48} />
        <h2>Return to the channel menu</h2>
        <Link className="primary-button" to="/">Go home <ChannelIcon name="arrow" size={18} /></Link>
      </section>
    </ChannelLayout>
  );
}
