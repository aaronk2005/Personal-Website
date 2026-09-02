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
  const label = (
    <span className="portfolio-channel-name">
      <b>{channel.title}</b>
      <small>{channel.label}</small>
    </span>
  );

  switch (channel.icon) {
    case 'profile':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-profile" aria-hidden="true">
          <img className="channel-photo channel-photo-headshot" src="/images/linkedin-headshot.jpg" alt="" />
          {label}
        </div>
      );
    case 'experience':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-experience" aria-hidden="true">
          <img className="channel-photo" src="/images/channels/qset-team.jpg" alt="" />
          <div className="channel-logo-rail">
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
          <div className="channel-photo-split">
            <img src="/images/channels/odyssey-amsterdam.jpg" alt="" />
            <img src="/images/channels/odyssey-tokyo.jpg" alt="" />
          </div>
          {label}
        </div>
      );
    case 'toolbox':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-toolbox" aria-hidden="true">
          <img className="channel-photo" src="/images/channels/qset-rover.jpg" alt="" />
          <span className="channel-image-note">Robotics · systems · software</span>
          {label}
        </div>
      );
    case 'resume':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-resume" aria-hidden="true">
          <img className="channel-photo channel-photo-screen" src="/images/channels/resume.png" alt="" />
          {label}
        </div>
      );
    case 'spark':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-spark" aria-hidden="true">
          <img className="channel-photo channel-photo-screen" src="/images/channels/now-building.png" alt="" />
          <span className="channel-live-badge"><i /> Building</span>
          {label}
        </div>
      );
    case 'ai':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-ai" aria-hidden="true">
          <img className="channel-photo channel-photo-screen" src="/images/channels/aaron-ai.png" alt="" />
          <span className="channel-live-badge"><i /> Ready</span>
          {label}
        </div>
      );
    case 'hobbies':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-hobbies" aria-hidden="true">
          <div className="channel-photo-collage">
            <img src="/images/channels/hockey.jpg" alt="" />
            <img src="/images/channels/cooking.jpg" alt="" />
            <img src="/images/channels/gaming.jpg" alt="" />
          </div>
          {label}
        </div>
      );
    case 'bonus':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-bonus" aria-hidden="true">
          <img className="channel-photo" src="/images/channels/odyssey-rome.jpg" alt="" />
          <span className="channel-achievement-badge"><b>#1</b> QHacks</span>
          {label}
        </div>
      );
    case 'contact':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-contact" aria-hidden="true">
          <img className="channel-photo" src="/images/channels/toronto.jpg" alt="" />
          <img className="channel-corner-portrait" src="/images/linkedin-headshot.jpg" alt="" />
          {label}
        </div>
      );
    case 'github':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-github" aria-hidden="true">
          <img className="channel-photo channel-photo-screen" src="/images/channels/github-profile.png" alt="" />
          {label}
        </div>
      );
    case 'linkedin':
      return (
        <div className="channel-art portfolio-wii-channel channel-art-linkedin" aria-hidden="true">
          <img className="channel-photo channel-photo-headshot" src="/images/linkedin-headshot.jpg" alt="" />
          <span className="channel-linkedin-mark">in</span>
          {label}
        </div>
      );
    default:
      return null;
  }
}

function ChannelTile({ channel, opening, onOpen }: { channel: Channel; opening: boolean; onOpen: (path: string) => void }) {
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

  return (
    <Link
      className={`menu-channel${opening ? ' channel-selected' : ''}`}
      to={channel.to}
      aria-label={`${channel.title} channel`}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onOpen(channel.to);
      }}
    >
      {content}
    </Link>
  );
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
  const navigate = useNavigate();
  const [openingPath, setOpeningPath] = useState<string | null>(null);

  useEffect(() => {
    if (!openingPath) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate(openingPath);
      return;
    }

    document.documentElement.classList.add('wii-opening-channel');
    const timer = window.setTimeout(() => navigate(openingPath), 360);

    return () => {
      document.documentElement.classList.remove('wii-opening-channel');
      window.clearTimeout(timer);
    };
  }, [navigate, openingPath]);

  return (
    <main id="main-content" className={`wii-home-screen${openingPath ? ' is-opening' : ''}`}>
      <MenuPager />
      <section className="wii-channel-grid" aria-label="Portfolio channels">
        {channels.map((channel) => (
          <ChannelTile
            key={channel.title}
            channel={channel}
            opening={openingPath === channel.to}
            onOpen={(path) => {
              if (!openingPath) setOpeningPath(path);
            }}
          />
        ))}
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
            <span className="launch-side-arrow launch-side-arrow-left" aria-hidden="true">‹</span>
            <LaunchArtwork number={number} title={title} />
            <div className="launch-copy">
              <p>{eyebrow}</p>
              <h1 id="channel-title">{title}</h1>
              <span>{intro}</span>
            </div>
            <span className="launch-side-arrow launch-side-arrow-right" aria-hidden="true">›</span>
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
