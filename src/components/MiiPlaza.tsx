import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ChannelLayout } from './AppShell';
import { readLocal, writeLocal, useConsole } from './ConsoleSystem';

export const SHIRTS = ['#318fd0', '#df514a', '#edb63e', '#45a46f', '#9466b8', '#ed899f'];
const SKIN = ['#f6d7bc', '#dfb18a', '#bc8159', '#875536', '#57382c'];
const HAIR = ['#30251f', '#65432d', '#c28c49', '#ba582e', '#939393'];
export type Mii = { id: string; name: string; skin: number; hair: number; style: number; shirt: number; glasses: boolean; smile: boolean };
export const DEFAULT_MII: Mii = { id: 'aaron', name: 'Aaron', skin: 0, hair: 1, style: 1, shirt: 0, glasses: false, smile: true };
export const DEMO_MIIS: Mii[] = Array.from({ length: 6 }, (_, i) => ({
  ...DEFAULT_MII, id: 'guest-' + i, name: ['Alex', 'Sam', 'Jamie', 'Riley', 'Casey', 'Morgan'][i],
  skin: i % 5, hair: i % 5, style: i % 4, shirt: i, glasses: i === 2, smile: i !== 3,
}));
function isMii(value: unknown): value is Mii {
  if (!value || typeof value !== 'object') return false;
  const m = value as Mii;
  return typeof m.id === 'string' && typeof m.name === 'string' && m.name.trim().length > 0 && m.name.length <= 12 &&
    [m.skin, m.hair].every(v => Number.isInteger(v) && v >= 0 && v < 5) &&
    Number.isInteger(m.style) && m.style >= 0 && m.style < 4 && Number.isInteger(m.shirt) && m.shirt >= 0 && m.shirt < 6 &&
    typeof m.glasses === 'boolean' && typeof m.smile === 'boolean';
}
export function loadMiis(): Mii[] {
  const saved = readLocal<unknown>('ak-plaza-v1', []);
  return Array.isArray(saved) ? saved.filter(isMii).slice(0, 12) : [];
}
export function loadPlayer(): Mii {
  const id = readLocal<unknown>('ak-player', '');
  return loadMiis().find(m => m.id === id) ?? DEFAULT_MII;
}

/** Parametric character preview shared by the editor, plaza, and game pieces. */
export function MiiAvatar({ mii, bust = false }: { mii: Mii; bust?: boolean }) {
  const skin = SKIN[mii.skin], hair = HAIR[mii.hair], shirt = SHIRTS[mii.shirt];
  return <svg className="mii-avatar" viewBox={bust ? '14 0 112 124' : '0 0 140 212'} aria-hidden="true">
    {!bust && <>
      <ellipse cx="70" cy="201" rx="33" ry="7" fill="#546575" opacity=".14" />
      <path d="M52 161 49 192M87 161 91 192" stroke="#3b3e44" strokeWidth="15" strokeLinecap="round" />
      <path d="M48 194 39 197M92 194 102 197" stroke="#34363a" strokeWidth="13" strokeLinecap="round" />
      <path d="M42 124 32 161M97 124 108 161" stroke={shirt} strokeWidth="17" strokeLinecap="round" />
      <circle cx="32" cy="165" r="8" fill={skin} /><circle cx="108" cy="165" r="8" fill={skin} />
      <path d="M51 111Q70 101 89 111L97 169Q70 178 43 169Z" fill={shirt} />
      <path d="M49 115 45 163" stroke="white" strokeOpacity=".22" strokeWidth="5" />
      <rect x="61" y="99" width="18" height="17" rx="6" fill={skin} />
    </>}
    <ellipse cx="70" cy="59" rx="45" ry="49" fill={hair} />
    <ellipse cx="29" cy="65" rx="8" ry="12" fill={skin} /><ellipse cx="111" cy="65" rx="8" ry="12" fill={skin} />
    <path d="M32 44Q35 16 70 17Q105 16 108 44L105 78Q101 108 70 111Q38 106 35 78Z" fill={skin} />
    {mii.style === 0 && <path d="M30 55Q26 9 70 8Q115 9 110 55L96 30Q76 42 43 32Z" fill={hair} />}
    {mii.style === 1 && <path d="M29 58 25 31 38 32 38 16 52 21 64 4 74 17 92 9 95 25 111 28 113 57 98 38 85 42 72 31 44 43Z" fill={hair} />}
    {mii.style === 2 && <path d="M28 84Q17 34 37 19Q71 -5 102 20Q121 40 112 99L101 95 103 42Q66 50 54 27Q48 44 37 50L39 98 26 98Z" fill={hair} />}
    {mii.style === 3 && <path d="M29 53Q30 9 70 8Q110 8 111 53L105 51Q99 20 70 21Q40 20 35 51Z" fill={hair} />}
    <path d="M43 53 57 51M83 51 97 53" stroke={hair} strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="51" cy="65" rx="4.5" ry="7" fill="#272629" /><ellipse cx="89" cy="65" rx="4.5" ry="7" fill="#272629" />
    <circle cx="52" cy="63" r="1.5" fill="white" /><circle cx="90" cy="63" r="1.5" fill="white" />
    <path d="m70 68-4 13h7" stroke="#8e634e" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d={mii.smile ? 'M57 89Q70 103 83 89' : 'M60 94H80'} stroke="#754333" strokeWidth="3" strokeLinecap="round" fill={mii.smile ? '#fff' : 'none'} />
    {mii.glasses && <g fill="none" stroke="#34363a" strokeWidth="3"><rect x="36" y="56" width="27" height="20" rx="6" /><rect x="77" y="56" width="27" height="20" rx="6" /><path d="M63 63H77M30 60H36M104 60H110" /></g>}
  </svg>;
}

export function MiiPlazaPage() {
  const [miis, setMiis] = useState(loadMiis);
  const [player, setPlayer] = useState(loadPlayer);
  const [editing, setEditing] = useState<Mii | null>(null);
  const [parade, setParade] = useState(false);
  const [notice, setNotice] = useState('');
  const { paused, chime } = useConsole();
  const crowd = [DEFAULT_MII, ...miis, ...(parade ? DEMO_MIIS : [])];
  const save = () => {
    if (!editing?.name.trim()) return;
    const clean = { ...editing, name: editing.name.trim() };
    const next = [...miis.filter(m => m.id !== clean.id), clean].slice(0, 12);
    const stored = writeLocal('ak-plaza-v1', next);
    writeLocal('ak-player', clean.id);
    setMiis(next); setPlayer(clean); setEditing(null); chime(true);
    setNotice(stored ? clean.name + ' joined your plaza. Ready to play!' : 'Ready to play. Browser storage is unavailable, so this character will not survive a reload.');
  };
  const select = (mii: Mii) => {
    if (mii.id.startsWith('guest-')) {
      if (miis.length >= 12) { setNotice('Your plaza is full. Edit an existing character to change their look.'); return; }
      const invited = { ...mii, id: crypto.randomUUID() };
      const next = [...miis, invited]; const stored = writeLocal('ak-plaza-v1', next);
      setMiis(next); setPlayer(invited); writeLocal('ak-player', invited.id); chime(true);
      setNotice(stored ? invited.name + ' joined your plaza as Player 1.' : 'Character invited for this visit. Browser storage is unavailable.');
      setParade(false); return;
    }
    setPlayer(mii); writeLocal('ak-player', mii.id); chime(); setNotice(mii.name + ' is Player 1.');
  };
  return <ChannelLayout number="10" eyebrow="Player studio" title="Mii Plaza" intro="Make a character, choose your player, and join the parade." compact>
    <section className="plaza-workspace">
      <div className="play-toolbar">
        <div><span className="eyebrow">Your console</span><h2>{editing ? 'Create your Mii' : parade ? 'Mii Parade' : 'Mii Plaza'}</h2></div>
        {!editing && <div className="segmented"><button aria-pressed={!parade} onClick={() => setParade(false)}>Plaza</button><button aria-pressed={parade} onClick={() => setParade(true)}>Parade</button></div>}
      </div>
      {editing ? <div className="mii-editor">
        <div className="mii-mirror"><MiiAvatar mii={editing} /><strong>{editing.name || 'Your Mii'}</strong><span>Player 1</span></div>
        <form className="mii-controls" onSubmit={e => { e.preventDefault(); save(); }}>
          <label>Nickname<input maxLength={12} required value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} placeholder="12 characters max" autoFocus /></label>
          <fieldset><legend>Hair style</legend><div className="style-choices">{['Classic', 'Spiky', 'Long', 'Cropped'].map((name, i) => <button type="button" key={name} aria-pressed={editing.style === i} onClick={() => setEditing({ ...editing, style: i })}>{name}</button>)}</div></fieldset>
          {(['Skin', 'Hair', 'Shirt'] as const).map(label => {
            const key = label.toLowerCase() as 'skin' | 'hair' | 'shirt';
            const colors = label === 'Skin' ? SKIN : label === 'Hair' ? HAIR : SHIRTS;
            return <fieldset key={label}><legend>{label} color</legend><div className="color-choices">{colors.map((color, i) => <button type="button" key={color} aria-label={label + ' color ' + (i + 1)} aria-pressed={editing[key] === i} style={{ background: color }} onClick={() => setEditing({ ...editing, [key]: i })}>{editing[key] === i ? <span aria-hidden="true">✓</span> : ''}</button>)}</div></fieldset>;
          })}
          <div className="mii-switches"><label><input type="checkbox" checked={editing.glasses} onChange={e => setEditing({ ...editing, glasses: e.target.checked })} /> Glasses</label><label><input type="checkbox" checked={editing.smile} onChange={e => setEditing({ ...editing, smile: e.target.checked })} /> Smile</label></div>
          <div className="button-row"><button type="button" className="play-button" onClick={() => setEditing(null)}>Cancel</button><button className="play-button primary" disabled={!editing.name.trim()}>Save Mii</button></div>
        </form>
      </div> : <>
        <div className={'plaza-stage' + (parade ? ' is-parade' : '') + (paused ? ' is-paused' : '')}>
          <span className="plaza-count">{crowd.length} {crowd.length === 1 ? 'Mii' : 'Miis'}</span>
          <div className="plaza-crowd">{crowd.map((mii, i) => <button key={mii.id} className="plaza-person" style={{ '--person': i } as CSSProperties} onClick={() => select(mii)} aria-label={mii.id.startsWith('guest-') ? 'Invite ' + mii.name + ' to your plaza' : 'Choose ' + mii.name + ' as Player 1'} aria-pressed={mii.id === player.id}><MiiAvatar mii={mii} /><span>{mii.name}</span>{mii.id === player.id && <b>P1</b>}</button>)}</div>
        </div>
        <div className="plaza-bottom"><div className="button-row">
          <button className="play-button primary" disabled={miis.length >= 12} onClick={() => { setNotice(''); setEditing({ ...DEFAULT_MII, id: crypto.randomUUID(), name: '' }); }}>+ Create Mii</button>
          {player.id !== 'aaron' && <button className="play-button" onClick={() => setEditing(player)}>Edit player</button>}
          <Link className="play-button" to="/arcade">Play as {player.name}</Link>
        </div><p>Saved on this device. Up to 12 custom characters.</p></div>
      </>}
      <p className="play-notice" role="status">{parade ? 'Six guest characters join the parade. Select one to invite them to your plaza.' : notice || (editing ? 'Make it yours.' : 'Choose a character to make them Player 1.')}</p>
    </section>
  </ChannelLayout>;
}
