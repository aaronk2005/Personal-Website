import { useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChannelLayout } from './AppShell';
import { DEMO_MIIS, loadPlayer, MiiAvatar } from './MiiPlaza';
import { readLocal, writeLocal, useConsole, usePlayClock } from './ConsoleSystem';
import { bowl, scoreMatch, shuffled } from './gameRules';
import { FourInARow, TableTennis } from './MoreGames';

type Game = 'bowling' | 'targets' | 'memory' | 'tennis' | 'four';
const games: { id: Game; name: string; summary: string; label: string }[] = [
  { id: 'bowling', name: 'Pocket Bowling', summary: 'Line it up. Let it roll.', label: '5 frames / one roll each' },
  { id: 'targets', name: 'Target Rally', summary: 'Point, tap, repeat.', label: '20 seconds / beat your best' },
  { id: 'memory', name: 'Mii Match', summary: 'A familiar face. Twice.', label: '6 pairs / take your time' },
  { id: 'tennis', name: 'Table Tennis', summary: 'Keep the rally going.', label: 'First to 5' },
  { id: 'four', name: 'Four in a Row', summary: 'Make your next move.', label: 'You vs. the computer' },
];
function savedRecords(): Record<Game, number> {
  const data = readLocal<Partial<Record<Game, number>>>('ak-arcade-records', {});
  return Object.fromEntries(games.map(({ id }) => [id, typeof data[id] === 'number' && Number.isFinite(data[id]) && data[id]! >= 0 ? data[id] : 0])) as Record<Game, number>;
}
export function ArcadePage() {
  const { gameId } = useParams();
  const game = games.find(g => g.id === gameId)?.id;
  const [records, setRecords] = useState(savedRecords);
  const [round, setRound] = useState(0);
  const [player] = useState(loadPlayer);
  const onFinish = (value: number) => {
    if (!game) return;
    setRecords(old => {
      const next = { ...old, [game]: Math.max(old[game], value) };
      writeLocal('ak-arcade-records', next);
      return next;
    });
  };
  if (!game) return <Navigate to="/?page=play" replace />;
  return <ChannelLayout key={game} number="PLAY" eyebrow="Player 1" title={games.find(g => g.id === game)!.name} intro={games.find(g => g.id === game)!.label} compact>
    <section className="arcade-workspace">
      <div className="play-toolbar"><div><span className="eyebrow">Pick up & play</span><h2>{game ? games.find(g => g.id === game)!.name : 'Choose a game'}</h2></div>
        <Link to="/mii" className="arcade-player" aria-label={'Change player, currently ' + player.name}><MiiAvatar mii={player} bust /><span><small>PLAYER 1</small>{player.name}</span></Link>
      </div>
      <>
        <div className="arcade-session-controls"><Link className="play-button" to="/?page=play">Play channels</Link><span>Best: {records[game]}{game === 'bowling' ? ' / 50' : ' pts'}</span><button className="play-button" onClick={() => setRound(r => r + 1)}>Restart</button></div>
        <div key={game + round}>{game === 'bowling' ? <Bowling onFinish={onFinish} /> : game === 'targets' ? <Targets onFinish={onFinish} /> : game === 'memory' ? <MemoryGame onFinish={onFinish} /> : game === 'tennis' ? <TableTennis onFinish={onFinish} /> : <FourInARow onFinish={onFinish} />}</div>
      </>
      <p className="arcade-note">Mouse, touch, or keyboard. HOME pauses play. Records stay on this device.</p>
    </section>
  </ChannelLayout>;
}

function Result({ title, text, onAgain }: { title: string; text: string; onAgain: () => void }) {
  return <div className="game-result" role="status"><span>Nice playing!</span><h3>{title}</h3><p>{text}</p><button className="play-button primary" onClick={onAgain}>Play again</button></div>;
}

function Bowling({ onFinish }: { onFinish: (score: number) => void }) {
  const [aim, setAim] = useState(50), [power, setPower] = useState(75);
  const [manualPower, setManualPower] = useState(false);
  const powerDirection = useRef(1);
  const [rolls, setRolls] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pins, setPins] = useState(0);
  const [message, setMessage] = useState('Aim, then time your roll near 75% power.');
  const { paused, chime } = useConsole();
  const total = rolls.reduce((a, b) => a + b, 0), finished = rolls.length === 5;
  const pending = useRef(0);
  usePlayClock(!rolling && !finished && !manualPower, paused, () => {
    setPower(value => {
      if (value >= 98) powerDirection.current = -1;
      if (value <= 2) powerDirection.current = 1;
      return Math.max(0, Math.min(100, value + powerDirection.current * 4));
    });
  });
  const reset = () => { setRolls([]); setPins(0); setProgress(0); setRolling(false); setMessage('New game. Line up your first roll.'); };
  const roll = () => {
    if (rolling || paused || finished) return;
    pending.current = bowl(aim, power); setProgress(0); setPins(0); setRolling(true); setMessage('Rolling...'); chime();
  };
  usePlayClock(rolling, paused, () => {
    if (progress < 9) { setProgress(p => p + 1); return; }
    setRolling(false); setPins(pending.current);
    const next = [...rolls, pending.current]; setRolls(next);
    setMessage(pending.current === 10 ? 'Strike! All ten down.' : pending.current === 0 ? 'Gutter ball. Bring your aim closer to the center.' : pending.current + ' pins down!');
    chime(pending.current === 10);
    if (next.length === 5) onFinish(next.reduce((a, b) => a + b, 0));
  });
  const pinPositions = [[44,47],[48,47],[52,47],[56,47],[46,53],[50,53],[54,53],[48,59],[52,59],[50,65]];
  return <div className="bowling-game">
    <div className="bowling-lane" role="img" aria-label={rolling ? 'Ball rolling down the lane' : pins + ' pins knocked down'}>
      <svg viewBox="0 0 100 160" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><linearGradient id="lane-wood" x2="0" y2="1"><stop stopColor="#d4b790" /><stop offset="1" stopColor="#f2ddad" /></linearGradient></defs>
        <path d="M28 24H72L98 160H2Z" fill="#85999c" /><path d="M32 24H68L89 160H11Z" fill="url(#lane-wood)" />
        {[36,42,48,54,60,66].map((x,i) => <path key={x} d={'M'+x+' 24L'+(18+i*13)+' 160'} stroke="#bd9468" strokeWidth=".3" opacity=".5" />)}
        <path d="M15 140H85" stroke="#fff" strokeWidth="1.5" />
        {[30,40,50,60,70].map(x => <path key={x} d={'M'+x+' 117l-1.5 3h3Z'} fill="#8c745b" />)}
        {pinPositions.map(([x,y],i) => <g key={i} opacity={i < pins ? .12 : 1} transform={'translate('+x+' '+y+')'+(i<pins?' rotate(70)':'')}><ellipse cy="2" rx="2.3" ry="1.1" fill="#5a5443" opacity=".3" /><path d="M-1.3-7Q-2-10 0-10Q2-10 1.3-7L.8-5Q3 0 1 1H-1Q-3 0-.8-5Z" fill="#fff" stroke="#b7bab7" strokeWidth=".2" /><path d="M-1-6H1M-1-5H1" stroke="#de5654" strokeWidth=".7" /></g>)}
        <path d={'M'+(15+aim*.7)+' 145L'+(25+aim*.5)+' 65'} stroke="#319dca" strokeWidth=".6" strokeDasharray="2 3" opacity={rolling?0:.8} />
        <circle cx={15+aim*.7+((25+aim*.5)-(15+aim*.7))*progress/9} cy={143-progress*8.67} r={6-progress*.3} fill="#326bad" />
        <circle cx={14+aim*.7+((25+aim*.5)-(15+aim*.7))*progress/9} cy={141-progress*8.67} r=".8" fill="#163756" />
      </svg>
      <span className="lane-label">AK LANES <b>01</b></span>
    </div>
    <div className="bowling-panel"><div className="game-score"><span>{finished ? 'Final score' : 'Frame ' + (rolls.length + 1) + ' / 5'}</span><strong>{total}<small> / 50</small></strong></div>
      <div className="frame-scores" aria-label="Frame scores">{Array.from({length:5},(_,i)=><span key={i}><small>{i+1}</small><b>{rolls[i] === 10 ? 'X' : rolls[i] ?? '-'}</b></span>)}</div>
      {finished ? <Result title={total + ' pins'} text={total === 50 ? 'Perfect game. Five strikes!' : 'Five frames complete. Can you beat it?'} onAgain={reset} /> : <>
        <label className="game-slider">Aim <output>{aim}%</output><input aria-label="Bowling aim" type="range" min="0" max="100" value={aim} disabled={rolling} onChange={e=>setAim(Number(e.target.value))} /><span>Left <span>Right</span></span></label>
        <label className="game-slider">Power <output>{power}%</output>{manualPower ? <input aria-label="Bowling power" type="range" min="0" max="100" value={power} disabled={rolling} onChange={e=>setPower(Number(e.target.value))} /> : <span className="power-meter" role="meter" aria-label="Bowling power" aria-valuenow={power} aria-valuemin={0} aria-valuemax={100}><i style={{left:power+'%'}} /></span>}<span>Soft <span>Strong</span></span></label>
        <label className="manual-power"><input type="checkbox" checked={manualPower} disabled={rolling} onChange={e=>setManualPower(e.target.checked)} /> Set power manually</label>
        <button className="play-button primary bowl-button" disabled={rolling || paused} onClick={roll}>{rolling ? 'Rolling...' : 'Roll ball'}</button>
      </>}
      <p className="play-notice" role="status">{message}</p><p className="game-rules">One roll per frame. One point per pin. Stop the power meter in the green zone, or set power manually.</p>
    </div>
  </div>;
}

function Targets({ onFinish }: { onFinish: (score: number) => void }) {
  const [phase, setPhase] = useState<'ready'|'play'|'done'>('ready');
  const [ticks, setTicks] = useState(200), [hits, setHits] = useState(0);
  const [position, setPosition] = useState({x:50,y:50});
  const { paused, chime } = useConsole();
  const score = hits * 10;
  const hitLock = useRef(false);
  const start = () => { setTicks(200); setHits(0); setPosition({x:50,y:50}); hitLock.current=false; setPhase('play'); };
  usePlayClock(phase === 'play', paused, () => {
    hitLock.current=false;
    if (ticks <= 1) { setTicks(0); setPhase('done'); onFinish(score); chime(true); }
    else setTicks(v=>v-1);
  });
  const hit = () => {
    if (phase !== 'play' || paused || hitLock.current) return;
    hitLock.current=true; setHits(n=>n+1);
    setPosition({x:12+Math.random()*76,y:16+Math.random()*68}); chime();
  };
  return <div className="target-game">
    <div className="target-hud"><div><small>TIME</small><strong>{(ticks/10).toFixed(1)}<small>s</small></strong></div><div><small>SCORE</small><strong>{score}</strong></div></div>
    <div className="target-field">
      {phase === 'ready' ? <div className="game-center"><span className="target-symbol" aria-hidden="true" /><h3>Ready, aim, tap.</h3><p>Hit as many targets as you can in 20 seconds.<br />Each hit is worth 10 points.</p><button className="play-button primary" onClick={start}>Start rally</button></div> :
      phase === 'done' ? <Result title={score + ' points'} text={hits + ' targets hit in 20 seconds.'} onAgain={start} /> :
      <button className="rally-target" style={{left:position.x+'%',top:position.y+'%'}} aria-label="Hit target" onClick={hit} disabled={paused} autoFocus><span aria-hidden="true">+</span></button>}
    </div>
    <p className="game-rules">Tap or click the target. Keyboard: focus the target, then press Enter or Space. Escape pauses.</p>
  </div>;
}

function MemoryGame({ onFinish }: { onFinish: (score: number) => void }) {
  const [deck, setDeck] = useState(()=>shuffled([...Array(6).keys(),...Array(6).keys()]));
  const [open, setOpen] = useState<number[]>([]), [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0), [wait, setWait] = useState(0);
  const { paused, chime } = useConsole();
  const complete = matched.length === 6;
  const reset = () => { setDeck(shuffled([...Array(6).keys(),...Array(6).keys()])); setOpen([]); setMatched([]); setMoves(0); setWait(0); };
  usePlayClock(open.length === 2, paused, () => {
    if (wait < 6) { setWait(w=>w+1); return; }
    const [a,b] = open;
    if (deck[a] === deck[b]) {
      const next = [...matched,deck[a]]; setMatched(next); chime(true);
      if (next.length === 6) onFinish(scoreMatch(moves));
    }
    setOpen([]); setWait(0);
  });
  const flip = (i: number) => {
    if (paused || complete || open.length === 2 || open.includes(i) || matched.includes(deck[i])) return;
    if (open.length === 1) setMoves(m=>m+1);
    setOpen(v=>[...v,i]); chime();
  };
  return <div className="memory-game">
    <div className="memory-hud"><span>Pairs <b>{matched.length} / 6</b></span><span>Moves <b>{moves}</b></span><span>No time limit</span></div>
    {complete ? <Result title={scoreMatch(moves) + ' points'} text={'All six pairs found in ' + moves + ' moves.'} onAgain={reset} /> :
    <div className="memory-grid">{deck.map((face,i) => {
      const revealed = open.includes(i) || matched.includes(face);
      return <button key={i} className={'memory-card'+(revealed?' is-flipped':'')+(matched.includes(face)?' is-matched':'')} onClick={()=>flip(i)} aria-label={'Card '+(i+1)+(revealed?', '+DEMO_MIIS[face].name:' face down')} aria-pressed={revealed} disabled={paused || matched.includes(face)}>
        {revealed ? <><MiiAvatar mii={DEMO_MIIS[face]} bust /><span>{DEMO_MIIS[face].name}</span></> : <span className="card-back" aria-hidden="true">mii<span>?</span></span>}
      </button>;
    })}</div>}
    <p className="game-rules" role="status">{complete ? 'All pairs matched!' : 'Find two of the same character. Fewer moves earn more points.'}</p>
  </div>;
}
