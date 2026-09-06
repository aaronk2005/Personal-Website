import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { channels, type Channel } from '../data/portfolio';
import { ChannelIcon } from './ChannelIcon';
import { ChannelArtwork } from './ChannelArtwork';
import { useConsole } from './ConsoleSystem';

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
      if (event.key.toLowerCase() === 'a' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        onComplete();
      }
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
          <span>Aaron's Portfolio Edition</span>
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


function ChannelTile({ channel }: { channel: Channel }) {
  const { chime } = useConsole();
  const content = (
    <>
      <div className="channel-face">
        <ChannelArtwork channel={channel} />
        <span className="channel-gloss" aria-hidden="true" />
      </div>
      <span className="channel-hover-label" aria-hidden="true">{channel.title}{channel.external ? ' ->' : ''}</span>
    </>
  );

  if (channel.external) {
    return (
      <a className="menu-channel" onClick={() => chime()} href={channel.to} target="_blank" rel="noreferrer" aria-label={`${channel.title} channel (opens in a new tab)`}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return <Link className="menu-channel" onClick={() => chime()} to={channel.to} aria-label={`${channel.title} channel`}>{content}</Link>;
}

function MenuPager({ page, onChange }: { page: number; onChange: (page: number) => void }) {
  return (
    <nav className="menu-pager" aria-label={'Menu page ' + (page + 1) + ' of 2'}>
      <button className="pager-left" type="button" disabled={page === 0} onClick={() => onChange(0)} aria-label="Previous menu page"><span>&lt;</span></button>
      <div className="page-dots" aria-hidden="true"><i className={page === 0 ? 'active' : ''} /><i className={page === 1 ? 'active' : ''} /></div>
      <button className="pager-right" type="button" disabled={page === 1} onClick={() => onChange(1)} aria-label="Next menu page"><span>&gt;</span></button>
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
  const timeParts = timeFormatter.formatToParts(now);

  return (
    <footer className="wii-footer">
      <div className="footer-sculpture" aria-hidden="true" />
      <Link to="/about" className="footer-side footer-left" aria-label="Open Aaron's profile">
        <span className="round-control"><img className="wii-footer-logo" src="/images/wii/wii-logo.svg" alt="" /></span>
        <small>Aaron Menu</small>
      </Link>
      <div className="footer-clock">
        <time dateTime={now.toISOString()} aria-label={`${time}, Toronto time`} title="Toronto time">
          {timeParts.map((part, index) => <span key={index} className={'clock-part' + (part.type === 'dayPeriod' ? ' clock-period' : '')} style={part.value === ':' ? { visibility: colonVisible ? 'visible' : 'hidden' } : undefined} aria-hidden="true">{part.value}</span>)}
        </time>
        <span className="clock-date">{dateFormatter.format(now)}</span>
      </div>
      <Link to="/contact" className="footer-side footer-right" aria-label="Open contact channel">
        <span className="round-control"><ChannelIcon name="mail" size={31} /></span>
        <small>Message Board</small>
      </Link>
    </footer>
  );
}

export function HomeScreen() {
  const location = useLocation();
  const [page, setPage] = useState(() => { if (new URLSearchParams(location.search).get('page') === 'play') return 1; try { return sessionStorage.getItem('ak-menu-page') === '1' ? 1 : 0; } catch { return 0; } });
  const grid = useRef<HTMLElement>(null);
  const lastPage = useRef(page);
  const { chime } = useConsole();
  const changePage = (next: number) => { setPage(next); chime(); try { sessionStorage.setItem('ak-menu-page', String(next)); } catch {} };
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input,textarea,select,dialog')) return;
      if (event.key === '+' || event.key === '=' || event.key === '-') {
        event.preventDefault(); changePage(event.key === '-' ? 0 : 1);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  });
  const visibleChannels = channels.filter(channel => (channel.page === 'play') === (page === 1));
  useEffect(() => {
    if (lastPage.current !== page) grid.current?.querySelector<HTMLElement>('.menu-channel')?.focus({ preventScroll: true });
    lastPage.current = page;
  }, [page]);
  const moveSelection = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    const links = [...event.currentTarget.querySelectorAll<HTMLAnchorElement>('.menu-channel')];
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (current < 0) return;
    const columns = getComputedStyle(event.currentTarget).gridTemplateColumns.split(' ').length;
    const offset = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -columns, ArrowDown: columns }[event.key] ?? 0;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : Math.max(0, Math.min(links.length - 1, current + offset));
    event.preventDefault();
    links[next].focus({ preventScroll: false });
  };

  return (
    <main id="main-content" className="wii-home-screen">
      <div className="menu-section-switch" aria-label="Channel pages"><button aria-pressed={page === 0} onClick={() => changePage(0)}>Portfolio</button><button aria-pressed={page === 1} onClick={() => changePage(1)}>Play</button></div>
      <MenuPager page={page} onChange={changePage} />
      <section ref={grid} key={page} className="wii-channel-grid" aria-label={page ? 'Play channels' : 'Portfolio channels'} onKeyDown={moveSelection}>
        {visibleChannels.map((channel) => <ChannelTile key={channel.title} channel={channel} />)}
        {Array.from({ length: Math.max(0, 12 - visibleChannels.length) }, (_, i) => <div key={'empty-'+i} className="empty-channel-slot" aria-hidden="true"><span>Wii</span></div>)}
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
  compact = false,
  children,
}: PropsWithChildren<{ number: string; eyebrow: string; title: string; intro: string; compact?: boolean }>) {
  const [started, setStarted] = useState(false);

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
      <section className={'wii-channel-window channel-content-window' + (compact ? ' play-channel-window' : '')} aria-labelledby="channel-title">
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
          {!compact && <p className="channel-intro">{intro}</p>}
          <div className="page-content">{children}</div>
        </div>
        <footer className="wii-channel-footer">
          <button type="button" className="wii-action-button" onClick={() => setStarted(false)}><span>Back</span></button>
          <Link to="/" className="wii-action-button primary"><span>Wii Menu</span></Link>
        </footer>
      </section>
    </main>
  );
}

export function AppFrame({ children, inactive = false }: PropsWithChildren<{ inactive?: boolean }>) {
  const location = useLocation();
  const home = location.pathname === '/';
  const frame = useRef<HTMLDivElement>(null);
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (!frame.current) return;
    frame.current.inert = inactive;
    if (!inactive) frame.current.querySelector<HTMLElement>('.menu-channel, .wii-action-button.primary')?.focus({ preventScroll: true });
  }, [inactive]);

  useEffect(() => {
    if (!inactive && home && previousPath.current !== '/') {
      const links = frame.current?.querySelectorAll<HTMLAnchorElement>('.menu-channel');
      [...(links ?? [])].find((link) => link.getAttribute('href') === previousPath.current)?.focus({ preventScroll: true });
    }
    previousPath.current = location.pathname;
  }, [home, inactive, location.pathname]);

  return (
    <div ref={frame} aria-hidden={inactive || undefined} className={home ? 'app-frame wii-menu-mode' : 'app-frame wii-channel-mode'}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {children}
      {home && <WiiFooter />}
    </div>
  );
}
