import { useEffect, useState, type PropsWithChildren } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { channels, type Channel } from '../data/portfolio';
import { ChannelIcon } from './ChannelIcon';

const timeFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Toronto',
  hour: 'numeric',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Toronto',
  weekday: 'short',
  month: 'numeric',
  day: 'numeric',
});

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'splash' | 'safety'>('splash');

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('safety'), 950);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase !== 'safety') return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'a' || event.key === 'Enter' || event.key === ' ') onComplete();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete, phase]);

  return (
    <div
      className={`boot-screen boot-phase-${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label={phase === 'splash' ? 'Portfolio startup' : undefined}
      aria-labelledby={phase === 'safety' ? 'boot-title' : undefined}
      aria-live="polite"
    >
      {phase === 'splash' ? (
        <div className="boot-splash">
          <img src="/images/wii/wii-logo.svg" alt="Wii" />
          <span>Aaron’s Portfolio Edition</span>
        </div>
      ) : (
        <>
          <div className="safety-screen">
            <p className="safety-kicker"><span>!</span> IMPORTANT</p>
            <h1 id="boot-title">Before using this portfolio, read the following information.</h1>
            <p>This site contains projects involving software, hardware, robotics, GPU systems, and AI tooling.</p>
            <p className="safety-blue">Select a channel to learn more. External channels may open in a new browser tab.</p>
            <a href="mailto:aaron.kleiman@queensu.ca">aaron.kleiman@queensu.ca</a>
          </div>
          <button type="button" className="boot-enter" onClick={onComplete} autoFocus>
            <span>A</span> Press A to continue
          </button>
        </>
      )}
    </div>
  );
}

function ChannelArtwork({ channel }: { channel: Channel }) {
  const label = <span className="portfolio-channel-name">{channel.title}</span>;

  switch (channel.icon) {
    case 'profile':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-profile" aria-hidden="true">
          <span className="channel-profile-photo"><img src="/images/linkedin-headshot.jpg" alt="" /></span>
          <span className="profile-rings"><i /><i /><i /></span>
          <strong>AK</strong>
          {label}
        </div>
      );
    case 'experience':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-experience" aria-hidden="true">
          <div className="company-channel-logos">
            <img src="/images/logos/amd.jpg" alt="" />
            <img src="/images/logos/tallysight.jpg" alt="" />
            <img src="/images/logos/qset.jpg" alt="" />
          </div>
          {label}
        </div>
      );
    case 'projects':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-projects" aria-hidden="true">
          <div className="project-channel-photos">
            <img src="/images/projects/odysseywalk.png" alt="" />
            <img src="/images/projects/spin2dine.png" alt="" />
          </div>
          {label}
        </div>
      );
    case 'toolbox':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-toolbox" aria-hidden="true">
          <div className="toolbox-channel-cloud"><b>PY</b><b>TS</b><b>C++</b><b>ROCm</b></div>
          {label}
        </div>
      );
    case 'resume':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-resume" aria-hidden="true">
          <div className="resume-channel-sheet"><b>AK</b><i /><i /><i /></div>
          {label}
        </div>
      );
    case 'spark':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-spark" aria-hidden="true">
          <div className="building-channel-mark">
            <header><span>AGENTBENCH</span><i /></header>
            <p><b>trace_review</b><small>building</small></p>
            <p><b>scenario_run</b><small>ready</small></p>
          </div>
          {label}
        </div>
      );
    case 'ai':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-ai" aria-hidden="true">
          <div className="ai-channel-screen">
            <p><b>AK</b><span>Ask me about Aaron.</span></p>
            <p><span>Projects?</span><b>YOU</b></p>
          </div>
          {label}
        </div>
      );
    case 'hobbies':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-hobbies" aria-hidden="true">
          <div className="hobby-channel-dots">
            <i><b>Hockey</b><small>sport</small></i>
            <i><b>Travel</b><small>explore</small></i>
            <i><b>Cooking</b><small>food</small></i>
            <i><b>Music</b><small>listen</small></i>
          </div>
          {label}
        </div>
      );
    case 'bonus':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-bonus" aria-hidden="true">
          <div className="bonus-channel-score">
            <span><b>#1</b><small>QHacks</small></span>
            <span><b>$1K+</b><small>Robot</small></span>
            <span><b>20K</b><small>Drawings</small></span>
          </div>
          {label}
        </div>
      );
    case 'contact':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-contact" aria-hidden="true">
          <span className="contact-channel-envelope"><ChannelIcon name="mail" size={54} /></span>
          {label}
        </div>
      );
    case 'github':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-github" aria-hidden="true">
          <span className="social-channel-mark"><ChannelIcon name="github" size={54} /></span>
          {label}
        </div>
      );
    case 'linkedin':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-linkedin" aria-hidden="true">
          <span className="social-channel-mark linkedin-mark">in</span>
          {label}
        </div>
      );
    default:
      return null;
  }
}

function ChannelTile({ channel }: { channel: Channel }) {
  const content = (
    <>
      <div className="channel-face">
        <ChannelArtwork channel={channel} />
        <span className="channel-gloss" aria-hidden="true" />
      </div>
      <span className="channel-hover-label">{channel.title}</span>
    </>
  );

  if (channel.external) {
    return (
      <a className="menu-channel" href={channel.to} target="_blank" rel="noreferrer" aria-label={`${channel.title} channel (opens in a new tab)`}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return <Link className="menu-channel" to={channel.to} aria-label={`${channel.title} channel`}>{content}</Link>;
}

function MenuPager() {
  return (
    <nav className="menu-pager" aria-label="Menu page 1 of 1">
      <button className="pager-left" type="button" disabled aria-label="Previous menu page"><span>‹</span></button>
      <div className="page-dots" aria-hidden="true"><i className="active" /><i /><i /><i /></div>
      <button className="pager-right" type="button" disabled aria-label="Next menu page"><span>›</span></button>
    </nav>
  );
}

function WiiFooter() {
  const [now, setNow] = useState(() => new Date());
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
      setColonVisible((value) => !value);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const time = timeFormatter.format(now);
  const blinkingTime = time.replace(':', colonVisible ? ':' : ' ');

  return (
    <footer className="wii-footer">
      <div className="footer-sculpture" aria-hidden="true" />
      <Link to="/about" className="footer-side footer-left" aria-label="Open Aaron’s profile">
        <span className="round-control"><img className="wii-footer-logo" src="/images/wii/wii-logo.svg" alt="" /></span>
        <small>Aaron Menu</small>
      </Link>
      <div className="footer-clock">
        <time dateTime={now.toISOString()}>{blinkingTime}</time>
        <span>{dateFormatter.format(now)} · Toronto</span>
      </div>
      <Link to="/contact" className="footer-side footer-right" aria-label="Open contact channel">
        <span className="round-control"><ChannelIcon name="mail" size={31} /></span>
        <small>Message Board</small>
      </Link>
    </footer>
  );
}

export function HomeScreen() {
  return (
    <main id="main-content" className="wii-home-screen">
      <MenuPager />
      <section className="wii-channel-grid" aria-label="Portfolio channels">
        {channels.map((channel) => <ChannelTile key={channel.title} channel={channel} />)}
      </section>
      <p className="menu-help">Select a channel</p>
    </main>
  );
}

function LaunchArtwork({ number, title }: { number: string; title: string }) {
  const channel = channels.find((item) => item.title === title);

  if (channel) {
    return <div className={`launch-wii-tile launch-custom-channel launch-wii-tile-${number}`}><ChannelArtwork channel={channel} /></div>;
  }

  return (
    <div className={`launch-symbol launch-symbol-${number}`} aria-hidden="true">
      <i /><i /><span>{number}</span><b>{title.slice(0, 1)}</b>
    </div>
  );
}

export function ChannelLayout({
  number,
  eyebrow,
  title,
  intro,
  children,
}: PropsWithChildren<{ number: string; eyebrow: string; title: string; intro: string }>) {
  const navigate = useNavigate();
  const location = useLocation();
  const [started, setStarted] = useState(false);

  const goBack = () => {
    if (location.key === 'default') navigate('/');
    else navigate(-1);
  };

  if (!started) {
    return (
      <main id="main-content" className="wii-channel-screen">
        <section className="wii-channel-window channel-launch-window" aria-labelledby="channel-title">
          <div className={`channel-launch channel-launch-${number}`}>
            <LaunchArtwork number={number} title={title} />
            <div className="launch-copy">
              <p>{eyebrow}</p>
              <h1 id="channel-title">{title}</h1>
              <span>{intro}</span>
            </div>
          </div>
          <footer className="wii-channel-footer launch-footer">
            <Link to="/" className="wii-action-button"><span>Wii Menu</span></Link>
            <button type="button" className="wii-action-button primary" onClick={() => setStarted(true)} autoFocus><span>Start</span></button>
          </footer>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" className="wii-channel-screen">
      <section className="wii-channel-window channel-content-window" aria-labelledby="channel-title">
        <header className="wii-channel-header">
          <div className="channel-header-band">
            <span>{number}</span>
            <div>
              <p>{eyebrow}</p>
              <h1 id="channel-title">{title}</h1>
            </div>
          </div>
        </header>
        <div className="wii-channel-scroll">
          <p className="channel-intro">{intro}</p>
          <div className="page-content">{children}</div>
        </div>
        <footer className="wii-channel-footer">
          <button type="button" className="wii-action-button" onClick={goBack}><span>Back</span></button>
          <Link to="/" className="wii-action-button primary"><span>Wii Menu</span></Link>
        </footer>
      </section>
    </main>
  );
}

export function AppFrame({ children }: PropsWithChildren) {
  const location = useLocation();
  const home = location.pathname === '/';

  return (
    <div className={home ? 'app-frame wii-menu-mode' : 'app-frame wii-channel-mode'}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {children}
      {home && <WiiFooter />}
    </div>
  );
}
