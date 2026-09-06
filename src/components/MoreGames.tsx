import { useRef, useState } from 'react';
import { computerColumn, dropDisc, fourWinner, strategicColumn } from './gameRules';
import { useConsole, usePlayClock } from './ConsoleSystem';

export function FourInARow({ onFinish }: { onFinish: (score: number) => void }) {
  const [board, setBoard] = useState<number[]>(Array(42).fill(0));
  const [turn, setTurn] = useState(1);
  const [difficulty,setDifficulty]=useState('Normal');
  const { paused, chime } = useConsole();
  const winner = fourWinner(board), draw = !winner && board.every(Boolean);
  const move = (column: number, player: number) => {
    const next = dropDisc(board, column, player);
    if (!next) return;
    setBoard(next); chime();
    if (fourWinner(next)) { chime(true); onFinish(player === 1 ? 100 : 0); }
    setTurn(player === 1 ? 2 : 1);
  };
  usePlayClock(turn === 2 && !winner && !draw, paused, () => move(difficulty==='Easy'?computerColumn(board):strategicColumn(board,difficulty==='Hard'?5:3), 2), 550);
  return <div className="four-game">
    <label className="advanced-difficulty">Difficulty<select value={difficulty} disabled={board.some(Boolean)&&!winner&&!draw} onChange={e=>{setDifficulty(e.target.value);setBoard(Array(42).fill(0));setTurn(1);}}><option>Easy</option><option>Normal</option><option>Hard</option></select></label>
    <p className="game-status" role="status">{winner ? winner === 1 ? 'You win! Four in a row.' : 'Computer wins. Try another round.' : draw ? 'A draw. The board is full.' : turn === 1 ? 'Your turn — choose a column.' : 'Computer is thinking…'}</p>
    <div className="four-columns" aria-label="Four in a Row board">{Array.from({length:7}, (_,col) => <button key={col} aria-label={'Drop disc in column ' + (col+1)} disabled={paused || turn !== 1 || !!winner || draw || !!board[col]} onClick={() => move(col,1)}>
      <span className="four-arrow" aria-hidden="true">↓</span>
      {Array.from({length:6},(_,row) => <span className={'four-disc disc-' + board[row*7+col]} key={row}><span className="sr-only">Row {row+1}: {['empty','your disc','computer disc'][board[row*7+col]]}. </span></span>)}
    </button>)}</div>
    <div className="four-legend"><span><i className="disc-1" /> You</span><span><i className="disc-2" /> Computer</span></div>
    {(!!winner || draw) && <button className="play-button primary" onClick={() => { setBoard(Array(42).fill(0)); setTurn(1); }}>Play again</button>}
    <p className="game-rules">Connect four horizontally, vertically, or diagonally. Tap a column, or Tab to one and press Enter.</p>
  </div>;
}

type Rally = { x:number; y:number; vx:number; vy:number; player:number; cpu:number; points:number; opponent:number };
const initialRally = (): Rally => ({x:400,y:200,vx:-6,vy:2,player:200,cpu:200,points:0,opponent:0});
export function TableTennis({ onFinish }: { onFinish:(score:number)=>void }) {
  const state = useRef(initialRally());
  const [frame,setFrame] = useState(state.current);
  const [phase,setPhase] = useState<'ready'|'play'|'serve'|'done'>('ready');
  const [message,setMessage] = useState('First to five points.');
  const {paused,chime} = useConsole();
  const paddle = (y:number) => { state.current = {...state.current,player:Math.max(44,Math.min(356,y))}; setFrame({...state.current}); };
  usePlayClock(phase === 'play',paused,()=>{
    const s = {...state.current};
    s.x += s.vx; s.y += s.vy;
    s.cpu += Math.max(-3.6,Math.min(3.6,s.y-s.cpu)); s.cpu = Math.max(44,Math.min(356,s.cpu));
    if (s.y<10 || s.y>390) { s.vy *= -1; s.y=Math.max(10,Math.min(390,s.y)); }
    if (s.vx<0 && s.x<=45 && s.x>=28 && Math.abs(s.y-s.player)<52) { s.x=46; s.vx=Math.min(11,-s.vx+.25); s.vy=(s.y-s.player)*.12; chime(); }
    if (s.vx>0 && s.x>=755 && s.x<=772 && Math.abs(s.y-s.cpu)<52) { s.x=754; s.vx=-Math.min(11,s.vx+.25); s.vy=(s.y-s.cpu)*.12; }
    if (s.x<0 || s.x>800) {
      const won = s.x>800;
      if(won) s.points++; else s.opponent++;
      const finished = s.points===5 || s.opponent===5;
      setMessage(finished ? s.points===5 ? 'You win the match!' : 'Computer wins the match.' : won ? 'Your point!' : 'Point to the computer.');
      if(finished) onFinish(s.points*20);
      s.x=400;s.y=200;s.vx=won?-6:6;s.vy=2;setPhase(finished?'done':'serve');chime(won);
    }
    state.current=s;setFrame(s);
  },20);
  const reset = () => { state.current=initialRally();setFrame(state.current);setMessage('First to five points.');setPhase('ready'); };
  return <div className="tennis-game">
    <div className="tennis-score"><span>You <b>{frame.points}</b></span><span>First to 5</span><span><b>{frame.opponent}</b> Computer</span></div>
    <div className="tennis-court" tabIndex={0} role="group" aria-label="Table Tennis court. Use up and down arrow keys to move your paddle."
      onKeyDown={e=>{if(!paused && ['ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();paddle(state.current.player+(e.key==='ArrowUp'?-24:24));}}}
      onPointerDown={e=>{if(paused)return;e.currentTarget.setPointerCapture(e.pointerId);const r=e.currentTarget.getBoundingClientRect();paddle((e.clientY-r.top)/r.height*400);e.currentTarget.focus();}}
      onPointerMove={e=>{if(paused || (e.pointerType==='touch'&&!e.buttons))return;const r=e.currentTarget.getBoundingClientRect();paddle((e.clientY-r.top)/r.height*400);}}>
      <svg viewBox="0 0 800 400" preserveAspectRatio="none" aria-hidden="true"><rect x="5" y="5" width="790" height="390" rx="5" fill="#287d77" stroke="#dceceb" strokeWidth="4"/><path d="M400 5V395" stroke="#edf9f4" strokeWidth="3" strokeDasharray="9 8"/><path d="M7 200H793" stroke="#fff" opacity=".14"/><rect x="27" y={frame.player-44} width="15" height="88" rx="7" fill="#fff"/><rect x="758" y={frame.cpu-44} width="15" height="88" rx="7" fill="#efd784"/><circle cx={frame.x} cy={frame.y} r="9" fill="#fff" /></svg>
    </div>
    <div className="tennis-actions"><p role="status">{message}</p>{phase==='done'?<button className="play-button primary" onClick={reset}>Play again</button>:phase!=='play'&&<button className="play-button primary" disabled={paused} onClick={()=>setPhase('play')}>{phase==='ready'?'Start match':'Serve'}</button>}</div>
    <p className="game-rules">Move your pointer or drag anywhere on the table to control the white paddle. Keyboard: focus the court and use ↑ / ↓. HOME pauses the rally.</p>
  </div>;
}
