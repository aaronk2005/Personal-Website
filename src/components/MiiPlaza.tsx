import { useId, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ChannelLayout } from './AppShell';
import { readLocal, writeLocal, useConsole } from './ConsoleSystem';

export const SHIRTS = ['#318fd0', '#df514a', '#edb63e', '#45a46f', '#9466b8', '#ed899f'];
const SKIN = ['#f6d7bc', '#dfb18a', '#bc8159', '#875536', '#57382c'];
const HAIR = ['#30251f', '#65432d', '#c28c49', '#ba582e', '#939393'];
export type Mii = { id: string; name: string; skin: number; hair: number; style: number; shirt: number; glasses: boolean; smile: boolean; face?: number; eyes?: number; brows?: number; nose?: number; mouth?: number; spacing?: number; eyeHeight?: number; height?: number; build?: number; favorite?: boolean };
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
    typeof m.glasses === 'boolean' && typeof m.smile === 'boolean' &&
    ['face','eyes','brows','nose','mouth'].every(key => {const n=m[key as keyof Mii];return n===undefined || typeof n==='number'&&Number.isInteger(n)&&n>=0&&n<=3;}) &&
    ['spacing','eyeHeight','height','build'].every(key=>{const n=m[key as keyof Mii];return n===undefined||typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=100;}) &&
    (m.favorite===undefined||typeof m.favorite==='boolean');
}
export function loadMiis(): Mii[] {
  const saved = readLocal<unknown>('ak-plaza-v1', []);
  return Array.isArray(saved) ? saved.filter(isMii).filter((m,i,all)=>m.id!=='aaron'&&all.findIndex(other=>other.id===m.id)===i).slice(0, 99) : [];
}
export function loadPlayer(): Mii {
  const id = readLocal<unknown>('ak-player', '');
  return loadMiis().find(m => m.id === id) ?? DEFAULT_MII;
}

/** Parametric character preview shared by the editor, plaza, and game pieces. */
export function MiiAvatar({ mii, bust = false }: { mii: Mii; bust?: boolean }) {
  const skin = SKIN[mii.skin], hair = HAIR[mii.hair], shirt = SHIRTS[mii.shirt];
  const id=useId();
  const eyeGap=((mii.spacing??50)-50)*.13, eyeY=((mii.eyeHeight??50)-50)*.13;
  const mouth=mii.mouth??(mii.smile?0:1);
  return <svg className="mii-avatar" viewBox={bust ? '14 0 112 124' : '0 0 140 212'} aria-hidden="true">
    <defs><radialGradient id={id+'skin'} cx="35%" cy="30%" r="80%"><stop stopColor={skin}/><stop offset=".65" stopColor={skin}/><stop offset="1" stopColor={`color-mix(in srgb, ${skin} 78%, #806653)`}/></radialGradient><linearGradient id={id+'shirt'}><stop stopColor={shirt}/><stop offset=".5" stopColor={shirt}/><stop offset="1" stopColor="#20313a"/></linearGradient></defs>
    <g transform={!bust?`translate(70 201) scale(${.82+(mii.build??50)*.0022} ${.84+(mii.height??50)*.0016}) translate(-70 -201)`:undefined}>
    {!bust && <>
      <ellipse cx="70" cy="201" rx="33" ry="7" fill="#546575" opacity=".14" />
      <path d="M52 161 49 192M87 161 91 192" stroke="#3b3e44" strokeWidth="15" strokeLinecap="round" />
      <path d="M48 194 39 197M92 194 102 197" stroke="#34363a" strokeWidth="13" strokeLinecap="round" />
      <path d="M42 124 32 161M97 124 108 161" stroke={shirt} strokeWidth="17" strokeLinecap="round" />
      <circle cx="32" cy="165" r="8" fill={skin} /><circle cx="108" cy="165" r="8" fill={skin} />
      <path d="M51 111Q70 101 89 111L94 166Q70 178 46 166Z" fill={'url(#'+id+'shirt)'} />
      <path d="M49 115 45 163" stroke="white" strokeOpacity=".22" strokeWidth="5" />
      <rect x="61" y="99" width="18" height="17" rx="6" fill={skin} />
    </>}
    <ellipse cx="70" cy="59" rx="45" ry="49" fill={hair} />
    <ellipse cx="29" cy="65" rx="8" ry="12" fill={skin} /><ellipse cx="111" cy="65" rx="8" ry="12" fill={skin} />
    <path d={[
      'M32 44Q35 16 70 17Q105 16 108 44L105 78Q101 108 70 111Q38 106 35 78Z',
      'M29 48Q29 15 70 15Q111 15 111 48L111 79Q108 113 70 113Q32 113 29 79Z',
      'M36 43Q38 16 70 17Q102 16 104 43L101 83Q90 111 70 117Q50 111 39 83Z',
      'M32 44Q35 16 70 17Q105 16 108 44L104 96Q98 110 70 110Q42 110 36 96Z',
    ][mii.face??0]} fill={'url(#'+id+'skin)'} />
    {mii.style === 0 && <path d="M30 55Q26 9 70 8Q115 9 110 55L96 30Q76 42 43 32Z" fill={hair} />}
    {mii.style === 1 && <path d="M29 58 25 31 38 32 38 16 52 21 64 4 74 17 92 9 95 25 111 28 113 57 98 38 85 42 72 31 44 43Z" fill={hair} />}
    {mii.style === 2 && <path d="M28 84Q17 34 37 19Q71 -5 102 20Q121 40 112 99L101 95 103 42Q66 50 54 27Q48 44 37 50L39 98 26 98Z" fill={hair} />}
    {mii.style === 3 && <path d="M29 53Q30 9 70 8Q110 8 111 53L105 51Q99 20 70 21Q40 20 35 51Z" fill={hair} />}
    <g transform={`translate(0 ${eyeY})`}>
      <path d={['M43 53 57 51M83 51 97 53','M42 51H58M82 51H98','M43 48 58 54M82 54 97 48','M43 53Q50 45 58 52M82 52Q90 45 97 53'][mii.brows??0]} stroke={hair} strokeWidth="3" strokeLinecap="round" fill="none" />
      {[51-eyeGap,89+eyeGap].map((x,i)=><g key={i} transform={`translate(${x} 65)`}>{(mii.eyes??0)===3?<path d="M-6 1Q0-6 6 1" stroke="#272629" strokeWidth="2.8" fill="none"/>:<><ellipse rx={(mii.eyes??0)===2?7:4.5} ry={(mii.eyes??0)===1?4:(mii.eyes??0)===2?5:7} fill={(mii.eyes??0)===2?'white':'#272629'}/>{(mii.eyes??0)===2&&<ellipse rx="3" ry="4" fill="#39352f"/>}</>}</g>)}
    </g>
    <path d={['m70 70-4 11h7','M65 77Q70 83 75 77','m70 70-6 12h12Z','M69 75h2'][mii.nose??0]} stroke="#8e634e" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d={['M58 91Q70 100 82 91','M61 94H79','M57 91Q70 104 83 91Z','M65 91Q70 86 75 91Q76 100 70 100Q64 100 65 91'][mouth]} stroke="#754333" strokeWidth="2.5" strokeLinecap="round" fill={mouth===2?'#fff':mouth===3?'#754333':'none'} />
    {mii.glasses && <g fill="none" stroke="#34363a" strokeWidth="3"><rect x="36" y="56" width="27" height="20" rx="6" /><rect x="77" y="56" width="27" height="20" rx="6" /><path d="M63 63H77M30 60H36M104 60H110" /></g>}
    </g>
  </svg>;
}

export function MiiPlazaPage() {
  const [miis, setMiis] = useState(loadMiis);
  const [player, setPlayer] = useState(loadPlayer);
  const [editing, setEditing] = useState<Mii | null>(null);
  const [parade, setParade] = useState(false);
  const [notice, setNotice] = useState('');
  const [arranged,setArranged] = useState(false);
  const [removing,setRemoving] = useState(false);
  const { paused, chime } = useConsole();
  const crowd = parade ? DEMO_MIIS : [DEFAULT_MII, ...miis];
  if(arranged) crowd.sort((a,b)=>Number(!!b.favorite)-Number(!!a.favorite)||a.name.localeCompare(b.name));
  const editMii=(mii:Mii)=>{setRemoving(false);setNotice('');setEditing(mii.id==='aaron'||mii.id.startsWith('guest-')?{...mii,id:crypto.randomUUID()}:mii);};
  const remove=()=>{const next=miis.filter(m=>m.id!==player.id);const stored=writeLocal('ak-plaza-v1',next);setMiis(next);setPlayer(DEFAULT_MII);writeLocal('ak-player','aaron');setRemoving(false);setNotice(stored?'Mii removed from this device.':'Mii removed for this visit; browser storage is unavailable.');};
  const save = () => {
    if (!editing?.name.trim()) return;
    const clean = { ...editing, name: editing.name.trim() };
    if(!miis.some(m=>m.id===clean.id)&&miis.length>=99){setNotice('The plaza is full. Remove a character before adding another.');return;}
    const next = [...miis.filter(m => m.id !== clean.id), clean].slice(0, 99);
    const stored = writeLocal('ak-plaza-v1', next);
    writeLocal('ak-player', clean.id);
    setMiis(next); setPlayer(clean); setEditing(null); chime(true);
    setNotice(stored ? clean.name + ' joined your plaza. Ready to play!' : 'Ready to play. Browser storage is unavailable, so this character will not survive a reload.');
  };
  const select = (mii: Mii) => {
    if (mii.id.startsWith('guest-')) {
      if (miis.length >= 99) { setNotice('Your plaza is full. Edit an existing character to change their look.'); return; }
      const invited = { ...mii, id: crypto.randomUUID() };
      const next = [...miis, invited]; const stored = writeLocal('ak-plaza-v1', next);
      setMiis(next); setPlayer(invited); writeLocal('ak-player', invited.id); chime(true);
      setNotice(stored ? invited.name + ' joined your plaza as Player 1.' : 'Character invited for this visit. Browser storage is unavailable.');
      setParade(false); return;
    }
    setRemoving(false);setPlayer(mii); writeLocal('ak-player', mii.id); chime(); setNotice(mii.name + ' is Player 1.');
  };
  return <ChannelLayout number="10" eyebrow="Your characters" title="Mii Channel" intro="Mii Plaza, character editor, and Mii Parade." compact>
    <section className="plaza-workspace">
      <div className="play-toolbar">
        <div><span className="eyebrow">Your console</span><h2>{editing ? 'Create your Mii' : parade ? 'Mii Parade' : 'Mii Plaza'}</h2></div>
        {!editing && <div className="segmented"><button aria-pressed={!parade} onClick={() => setParade(false)}>Plaza</button><button aria-pressed={parade} onClick={() => setParade(true)}>Parade</button></div>}
      </div>
      {editing ? <MiiEditor mii={editing} onChange={setEditing} onSave={save} onCancel={()=>setEditing(null)} /> : <>
        <div className="plaza-floor">
        <nav className="plaza-tools" aria-label="Mii tools">
          <button disabled={miis.length>=99} onClick={()=>{setRemoving(false);setNotice('');setEditing({...DEFAULT_MII,id:crypto.randomUUID(),name:''});}}><b aria-hidden="true">＋</b>Create</button>
          <button onClick={()=>editMii(player)} disabled={miis.length>=99&&player.id==='aaron'} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const m=crowd.find(m=>m.id===e.dataTransfer.getData('text/plain'));if(m)editMii(m);}}><b aria-hidden="true">✎</b>Edit</button>
          <button disabled={player.id==='aaron'||parade} onClick={()=>setRemoving(true)}><b aria-hidden="true">−</b>Erase</button>
          <button aria-pressed={arranged} onClick={()=>setArranged(!arranged)}><b aria-hidden="true">▦</b>Arrange</button>
        </nav>
        <div className={'plaza-stage studio-stage' + (parade ? ' is-parade' : '') + (paused ? ' is-paused' : '')+(arranged?' is-arranged':'')}>
          <span className="plaza-count">{crowd.length} {crowd.length === 1 ? 'Mii' : 'Miis'}</span>
          <div className="plaza-crowd">{crowd.map((mii, i) => <button key={mii.id} draggable onDragStart={e=>e.dataTransfer.setData('text/plain',mii.id)} className="plaza-person" style={{ '--person': i,'--depth':i%3 } as CSSProperties} onClick={() => select(mii)} aria-label={mii.id.startsWith('guest-') ? 'Invite ' + mii.name + ' to your plaza' : 'Choose ' + mii.name + ' as Player 1'} aria-pressed={mii.id === player.id}><MiiAvatar mii={mii} /><span>{mii.favorite?'★ ':''}{mii.name}</span>{mii.id === player.id && <b>P1</b>}</button>)}</div>
        </div>
        </div>
        {removing&&<div className="mii-delete-confirm" role="group" aria-label="Confirm Mii removal"><p>Erase {player.name} from this device? This cannot be undone.</p><button className="play-button" onClick={()=>setRemoving(false)} autoFocus>Keep Mii</button><button className="play-button" onClick={remove}>Erase Mii</button></div>}
        <div className="plaza-bottom"><div className="button-row">
          <Link className="play-button primary" to="/?page=play">Play as {player.name}</Link>
        </div><p>Saved on this device. {miis.length+1} / 100 Miis.</p></div>
      </>}
      <p className="play-notice" role="status">{notice || (parade ? 'A local guest parade. Select a guest to invite them; no online Mii sharing.' : editing ? 'Changes stay in the preview until you save.' : 'Select a Mii, then choose Edit. You can also drag a Mii onto Edit.')}</p>
    </section>
  </ChannelLayout>;
}

const MII_TABS=['Profile','Body','Face','Hair','Brows','Eyes','Nose','Mouth','Glasses'] as const;
function MiiEditor({mii,onChange,onSave,onCancel}:{mii:Mii;onChange:(mii:Mii)=>void;onSave:()=>void;onCancel:()=>void}) {
  const [tab,setTab]=useState<(typeof MII_TABS)[number]>('Profile');
  const [zoom,setZoom]=useState(false);
  const set=(key:keyof Mii,value:number|boolean|string)=>onChange({...mii,[key]:value});
  const swatches=(key:'skin'|'hair'|'shirt',colors:string[],label:string)=><fieldset><legend>{label}</legend><div className="color-choices">{colors.map((color,i)=><button type="button" key={color} aria-label={label+' '+(i+1)} aria-pressed={mii[key]===i} style={{background:color}} onClick={()=>set(key,i)}>{mii[key]===i&&<span aria-hidden="true">✓</span>}</button>)}</div></fieldset>;
  const choices=(key:'face'|'style'|'brows'|'eyes'|'nose'|'mouth',names:string[])=><div className="mii-feature-grid">{names.map((name,i)=><button type="button" key={name} aria-label={name} aria-pressed={(mii[key]??(key==='mouth'?(mii.smile?0:1):0))===i} onClick={()=>set(key,i)}><MiiAvatar mii={{...mii,[key]:i}} bust/><span>{name}</span></button>)}</div>;
  const slider=(key:'height'|'build'|'spacing'|'eyeHeight',label:string)=><label className="mii-range">{label}<input aria-label={label} type="range" min="0" max="100" value={mii[key]??50} onChange={e=>set(key,Number(e.target.value))}/></label>;
  return <form className="mii-studio" onSubmit={e=>{e.preventDefault();onSave();}}>
    <nav className="mii-tabs" aria-label="Character features">{MII_TABS.map((name,i)=><button type="button" key={name} aria-pressed={tab===name} onClick={()=>setTab(name)}><span aria-hidden="true">{['☺','↕','◯','▰','⌁','◉','△','⌣','∞'][i]}</span>{name}</button>)}</nav>
    <div className="mii-studio-body"><div className={'mii-mirror'+(zoom?' face-zoom':'')}><MiiAvatar mii={mii} bust={zoom}/><strong>{mii.name||'New Mii'}</strong><button type="button" className="play-button" aria-pressed={zoom} onClick={()=>setZoom(!zoom)}>{zoom?'Full body':'Face view'}</button></div>
    <div className="mii-controls"><h3>{tab}</h3>
      {tab==='Profile'&&<><label>Nickname<input maxLength={12} value={mii.name} onChange={e=>set('name',e.target.value)} placeholder="Up to 12 characters" autoFocus/></label><label className="mii-favorite"><input type="checkbox" checked={!!mii.favorite} onChange={e=>set('favorite',e.target.checked)}/> Favorite Mii</label>{swatches('shirt',SHIRTS,'Favorite color')}</>}
      {tab==='Body'&&<>{slider('height','Height')}{slider('build','Build')}</>}
      {tab==='Face'&&<>{choices('face',['Oval face','Round face','Tapered face','Square face'])}{swatches('skin',SKIN,'Skin tone')}</>}
      {tab==='Hair'&&<>{choices('style',['Classic hair','Spiky hair','Long hair','Cropped hair'])}{swatches('hair',HAIR,'Hair color')}</>}
      {tab==='Brows'&&choices('brows',['Soft brows','Straight brows','Angled brows','Arched brows'])}
      {tab==='Eyes'&&<>{choices('eyes',['Oval eyes','Dot eyes','Wide eyes','Smiling eyes'])}{slider('spacing','Eye spacing')}{slider('eyeHeight','Eye position')}</>}
      {tab==='Nose'&&choices('nose',['Angled nose','Round nose','Triangle nose','Small nose'])}
      {tab==='Mouth'&&choices('mouth',['Smile','Straight mouth','Grin','Open mouth'])}
      {tab==='Glasses'&&<div className="mii-feature-grid">{[false,true].map(value=><button type="button" key={String(value)} aria-pressed={mii.glasses===value} onClick={()=>set('glasses',value)}><MiiAvatar mii={{...mii,glasses:value}} bust/><span>{value?'Glasses':'No glasses'}</span></button>)}</div>}
    </div></div>
    <footer className="mii-studio-footer"><button type="button" className="play-button" onClick={onCancel}>Cancel</button><button type="button" className="play-button" onClick={()=>onChange({...mii,skin:Math.floor(Math.random()*5),hair:Math.floor(Math.random()*5),style:Math.floor(Math.random()*4),face:Math.floor(Math.random()*4),eyes:Math.floor(Math.random()*4),brows:Math.floor(Math.random()*4),shirt:Math.floor(Math.random()*6)})}>Mix it up</button><button type="submit" className="play-button primary" disabled={!mii.name.trim()}>Save and quit</button></footer>
  </form>;
}
