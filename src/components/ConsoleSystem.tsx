import { createContext, useCallback, useContext, useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function readLocal<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') ?? fallback; } catch { return fallback; }
}
export function writeLocal(key: string, value: unknown): boolean {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
}

const ConsoleContext = createContext({ paused: false, sound: false, chime: (_win?: boolean) => {} });
export const useConsole = () => useContext(ConsoleContext);

export function ConsoleSystem({ children, inactive }: PropsWithChildren<{ inactive: boolean }>) {
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(() => readLocal<boolean>('ak-sound', false) === true);
  const [hidden, setHidden] = useState(document.hidden);
  const dialog = useRef<HTMLDialogElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const location = useLocation();
  const chime = useCallback((win = false) => {
    if (!sound) return;
    try {
      const ctx = audio.current ??= new AudioContext();
      void ctx.resume().catch(() => {});
      [523.25, ...(win ? [659.25, 783.99] : [])].forEach((frequency, i) => {
        const osc = ctx.createOscillator(), gain = ctx.createGain(), start = ctx.currentTime + i * .085;
        osc.type = 'sine'; osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(.055, start + .008);
        gain.gain.exponentialRampToValueAtTime(.001, start + .18);
        osc.connect(gain); gain.connect(ctx.destination); osc.start(start); osc.stop(start + .2);
      });
    } catch { /* Sound is optional when browser audio is unavailable. */ }
  }, [sound]);
  useEffect(() => {
    const handle = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', handle);
    return () => document.removeEventListener('visibilitychange', handle);
  }, []);
  useEffect(() => {
    if (open) dialog.current?.showModal(); else dialog.current?.close();
  }, [open]);
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !open && !inactive && !(event.target instanceof HTMLElement && event.target.closest('input,textarea,select,[contenteditable]'))) {
        event.preventDefault(); setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inactive, open]);
  useEffect(() => () => { void audio.current?.close().catch(() => {}); }, []);
  return <ConsoleContext.Provider value={{ paused: open || hidden || inactive, sound, chime }}>
    {children}
    {!inactive && <button className="console-home" onClick={() => setOpen(true)} aria-label="Open HOME Menu (Escape)"><span aria-hidden="true">⌂</span> HOME</button>}
    <dialog ref={dialog} className="console-dialog" onCancel={event => { event.preventDefault(); setOpen(false); }} aria-labelledby="home-menu-title">
      <header><h2 id="home-menu-title">HOME Menu</h2><button onClick={() => setOpen(false)} aria-label="Close HOME Menu">Close</button></header>
      <p>Take a breather. Your game is paused.</p>
      <div className="console-home-actions">
        <button onClick={() => setOpen(false)}>Resume</button>
        <Link to="/" onClick={() => setOpen(false)}>Wii Menu</Link>
        <Link to="/mii" onClick={() => setOpen(false)}>Mii Plaza</Link>
      </div>
      <label className="sound-setting"><span>Menu & game sounds</span><input type="checkbox" checked={sound} onChange={e => { setSound(e.target.checked); writeLocal('ak-sound', e.target.checked); }} /></label>
      <p className="console-instructions">Arrow keys: select a channel. Enter: open. + / -: change page. Escape: HOME.</p>
      <footer><span className="player-light" /> Player 1 <span>Portfolio edition</span></footer>
    </dialog>
  </ConsoleContext.Provider>;
}

/** Active play time: hidden tabs and the HOME overlay do not consume the clock. */
export function usePlayClock(active: boolean, paused: boolean, tick: () => void, delay = 100) {
  const callback = useRef(tick); callback.current = tick;
  useEffect(() => {
    if (!active || paused) return;
    const timer = window.setInterval(() => callback.current(), delay);
    return () => window.clearInterval(timer);
  }, [active, paused, delay]);
}
