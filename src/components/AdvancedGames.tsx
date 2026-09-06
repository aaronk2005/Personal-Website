import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { useConsole, usePlayClock } from './ConsoleSystem';
import { brickLevel, chooseReversi, initialBreaker, initialReversi, makeMines, neighbors, playReversi, revealMines, reversiMoves, snakeFood, stepBreaker, stepSnake, type Point, type SnakeState } from './advancedRules';

type GameProps={onFinish:(score:number)=>void};
function Difficulty({value,onChange,disabled=false}:{value:number;onChange:(value:number)=>void;disabled?:boolean}){
  return <label className="advanced-difficulty">Difficulty<select value={value} disabled={disabled} onChange={e=>onChange(Number(e.target.value))}><option value={0}>Easy</option><option value={1}>Normal</option><option value={2}>Hard</option></select></label>;
}
function EndPanel({title,children,onAgain}:{title:string;children:ReactNode;onAgain:()=>void}){
  return <div className="advanced-result" role="status"><h3>{title}</h3><p>{children}</p><button className="play-button primary" onClick={onAgain}>Play again</button></div>;
}
function boardKeys(e:KeyboardEvent<HTMLDivElement>,size:number){
  const target=e.target as HTMLButtonElement;const index=Number(target.dataset.cell);
  if(!Number.isInteger(index)||target.dataset.cell===undefined)return;
  const direction:Record<string,number>={ArrowLeft:-1,ArrowRight:1,ArrowUp:-size,ArrowDown:size};
  if(e.key in direction){e.preventDefault();const next=Math.max(0,Math.min(size*size-1,index+direction[e.key]));e.currentTarget.querySelector<HTMLButtonElement>(`button[data-cell="${next}"]`)?.focus();}
}

// Let overlay buttons receive their normal click; only the playing surface captures a drag.
function isOverlayControl(target:EventTarget|null){return target instanceof Element&&!!target.closest('button');}

export function Minesweeper({onFinish}:GameProps){
  const [difficulty,setDifficulty]=useState(0),[board,setBoard]=useState<number[]|null>(null);
  const [opened,setOpened]=useState<number[]>([]),[flags,setFlags]=useState<number[]>([]),[seconds,setSeconds]=useState(0);
  const [mode,setMode]=useState(false),[status,setStatus]=useState<'ready'|'play'|'lost'|'won'>('ready'),[message,setMessage]=useState('Your first reveal and its neighbors are safe.');
  const {paused,chime}=useConsole();const size=9,count=[10,16,22][difficulty],finished=status==='lost'||status==='won';
  usePlayClock(status==='play',paused,()=>setSeconds(n=>n+1),1000);
  const reset=()=>{setBoard(null);setOpened([]);setFlags([]);setSeconds(0);setMode(false);setStatus('ready');setMessage('Your first reveal and its neighbors are safe.');};
  const flag=(index:number)=>{if(paused||finished||opened.includes(index))return;setFlags(old=>old.includes(index)?old.filter(i=>i!==index):old.length<count?[...old,index]:old);chime();};
  const reveal=(index:number)=>{
    if(paused||finished)return;
    if(mode&&!opened.includes(index)){flag(index);return;}
    if(flags.includes(index))return;
    const minefield=board??makeMines(size,count,index);if(!board){setBoard(minefield);setStatus('play');}
    let targets=[index];
    if(opened.includes(index)){
      const nearby=neighbors(index,size);if(minefield[index]<=0||nearby.filter(i=>flags.includes(i)).length!==minefield[index]){setMessage('Flag the matching number of neighbors, then select the number to clear around it.');return;}
      targets=nearby.filter(i=>!flags.includes(i)&&!opened.includes(i));
    }
    if(targets.some(i=>minefield[i]===-1)){setStatus('lost');setMessage('A mine was revealed.');onFinish(0);return;}
    let next=opened;targets.forEach(i=>next=revealMines(minefield,next,flags,i,size));setOpened(next);chime();
    if(next.length===size*size-count){setStatus('won');onFinish(Math.max(100,1500-seconds*3)*(difficulty+1));chime(true);setMessage('Every safe square is clear.');}
    else setMessage('Numbers count adjacent mines.');
  };
  return <section className="advanced-game mines-game"><div className="advanced-controls"><Difficulty value={difficulty} disabled={status==='play'} onChange={v=>{setDifficulty(v);reset();}}/><button className="play-button" aria-pressed={mode} onClick={()=>setMode(!mode)} disabled={finished}>Flag mode {mode?'on':'off'}</button></div>
    <div className="advanced-hud"><span>Flags <b>{flags.length} / {count}</b></span><span>Time <b>{seconds}s</b></span><span>Cleared <b>{opened.length} / {81-count}</b></span></div>
    <div className="mines-board" role="group" aria-label="Minesweeper board" onKeyDown={e=>{boardKeys(e,9);if(e.key.toLowerCase()==='f'&&(e.target as HTMLElement).dataset.cell!==undefined){e.preventDefault();flag(Number((e.target as HTMLElement).dataset.cell));}}}>
      {Array.from({length:81},(_,index)=>{const visible=opened.includes(index),mine=status==='lost'&&board?.[index]===-1,flagged=flags.includes(index);return <button key={index} data-cell={index} className={(visible?'revealed ':'')+(mine?'mine-hit ':'')+'mine-number-'+(board?.[index]??0)} aria-label={`Row ${Math.floor(index/9)+1}, column ${index%9+1}: ${mine?'mine':flagged?'flagged':visible?board?.[index]||'empty':'hidden'}`} aria-disabled={finished||paused} onClick={()=>reveal(index)} onContextMenu={e=>{e.preventDefault();flag(index);}}>{mine?'✹':flagged?'⚑':visible?board?.[index]||'':''}</button>;})}
    </div>
    {finished&&<EndPanel title={status==='won'?'Field cleared!':'Mine hit'} onAgain={reset}>{status==='won'?`Completed in ${seconds} seconds.`:'Try again with a new field.'}</EndPanel>}
    <p className="game-status" role="status">{message}</p><p className="game-rules">Reveal safe squares. Right-click or use Flag mode to mark mines. Select a revealed number to clear its neighbors when the flag count matches. Keyboard: arrows, Enter to reveal, F to flag.</p>
  </section>;
}

export function Reversi({onFinish}:GameProps){
  const [board,setBoard]=useState(initialReversi),[turn,setTurn]=useState(1),[difficulty,setDifficulty]=useState(1),[hints,setHints]=useState(true),[message,setMessage]=useState('You are black. Black moves first.');
  const {paused,chime}=useConsole();const black=board.filter(n=>n===1).length,white=board.filter(n=>n===2).length;
  const legal=reversiMoves(board,turn),over=!legal.length&&!reversiMoves(board,3-turn).length;
  const reset=()=>{setBoard(initialReversi());setTurn(1);setMessage('You are black. Black moves first.');};
  const move=(index:number,player:number)=>{
    if(paused||over||turn!==player)return;const next=playReversi(board,index,player);if(!next)return;
    setBoard(next);chime();const other=reversiMoves(next,3-player),same=reversiMoves(next,player);
    if(!other.length&&!same.length){const b=next.filter(n=>n===1).length,w=next.filter(n=>n===2).length;onFinish(b*10+(b>w?200:b===w?100:0));setMessage(b>w?'You win!':b<w?'Computer wins.':'A draw.');chime(true);}
    else if(!other.length){setTurn(player);setMessage(player===1?'Computer has no legal move. Your turn again.':'You have no legal move. Computer plays again.');}
    else{setTurn(3-player);setMessage(player===1?'Computer is thinking…':'Your turn.');}
  };
  usePlayClock(turn===2&&!over,paused,()=>move(chooseReversi(board,2,difficulty+1),2),450);
  return <section className="advanced-game reversi-game"><div className="advanced-controls"><Difficulty value={difficulty} disabled={board.filter(Boolean).length>4&&!over} onChange={v=>{setDifficulty(v);reset();}}/><label className="advanced-check"><input type="checkbox" checked={hints} onChange={e=>setHints(e.target.checked)}/> Show legal moves</label></div>
    <div className="advanced-hud"><span>You · black <b>{black}</b></span><span>Computer · white <b>{white}</b></span></div>
    <p className="game-status" role="status">{message}</p>
    <div className="reversi-board" role="group" aria-label="Reversi board" onKeyDown={e=>boardKeys(e,8)}>{board.map((value,index)=><button key={index} data-cell={index} aria-label={`${String.fromCharCode(65+index%8)}${Math.floor(index/8)+1}: ${value===1?'black':value===2?'white':legal.includes(index)&&turn===1?'legal move':'empty'}`} aria-disabled={paused||over||turn!==1||!legal.includes(index)} onClick={()=>move(index,1)}>{value?<i className={'reversi-disc piece-'+value}/>:hints&&turn===1&&legal.includes(index)?<i className="reversi-hint"/>:null}</button>)}</div>
    {over&&<EndPanel title={black>white?'You win!':black<white?'Computer wins':'A draw'} onAgain={reset}>{black} black discs · {white} white discs.</EndPanel>}
    <p className="game-rules">Place a disc to trap white discs between yours in any direction. Trapped discs flip. A player with no legal move passes automatically. Most discs at the end wins. Hard mode looks three moves ahead.</p>
  </section>;
}

const SNAKE_SIZE=20;
function snakeWalls(difficulty:number):Point[]{return difficulty===2?[...Array.from({length:6},(_,i)=>({x:i+7,y:5})),...Array.from({length:6},(_,i)=>({x:i+7,y:14}))]:[];}
function newSnake(difficulty:number):SnakeState{const body=[{x:7,y:10},{x:6,y:10},{x:5,y:10}];return{body,food:snakeFood(body,snakeWalls(difficulty),20),direction:{x:1,y:0},score:0,dead:false,won:false};}
export function Snake({onFinish}:GameProps){
  const [difficulty,setDifficulty]=useState(1),[state,setState]=useState(()=>newSnake(1)),[started,setStarted]=useState(false),[resting,setResting]=useState(false);
  const current=useRef(state),queue=useRef<Point[]>([]),touch=useRef<Point|null>(null);
  const {paused,chime}=useConsole();const walls=snakeWalls(difficulty),finished=state.dead||state.won;
  const reset=(level=difficulty)=>{const next=newSnake(level);current.current=next;setState(next);queue.current=[];setStarted(false);setResting(false);};
  const steer=(direction:Point)=>{
    if(!started||finished||paused||resting||queue.current.length>=2)return;
    const last=queue.current.at(-1)??current.current.direction;
    if(direction.x===-last.x&&direction.y===-last.y||direction.x===last.x&&direction.y===last.y)return;
    queue.current.push(direction);
  };
  usePlayClock(started&&!finished,paused||resting,()=>{
    const next=stepSnake(current.current,queue.current.shift()??current.current.direction,walls,SNAKE_SIZE,difficulty===0);
    if(next.score>current.current.score)chime();current.current=next;setState(next);
    if(next.dead||next.won){onFinish(next.score*(difficulty+1));if(next.won)chime(true);}
  },Math.max(45,[145,110,90][difficulty]-Math.floor(state.score/50)*7));
  const keys:Record<string,Point>={ArrowUp:{x:0,y:-1},w:{x:0,y:-1},ArrowDown:{x:0,y:1},s:{x:0,y:1},ArrowLeft:{x:-1,y:0},a:{x:-1,y:0},ArrowRight:{x:1,y:0},d:{x:1,y:0}};
  return <section className="advanced-game snake-game"><div className="advanced-controls"><Difficulty value={difficulty} disabled={started&&!finished} onChange={v=>{setDifficulty(v);reset(v);}}/>{started&&!finished&&<button className="play-button" aria-pressed={resting} onClick={()=>setResting(!resting)}>{resting?'Continue':'Pause'}</button>}</div>
    <div className="advanced-hud"><span>Score <b>{state.score*(difficulty+1)}</b></span><span>Length <b>{state.body.length}</b></span><span>Speed <b>{1+Math.floor(state.score/50)}</b></span></div>
    <div className="snake-court" role="group" tabIndex={0} aria-label="Snake board. Arrow keys or WASD to steer." onKeyDown={e=>{const key=e.key.length===1?e.key.toLowerCase():e.key;if(keys[key]){e.preventDefault();steer(keys[key]);}}} onPointerDown={e=>{if(isOverlayControl(e.target))return;e.currentTarget.setPointerCapture(e.pointerId);touch.current={x:e.clientX,y:e.clientY};e.currentTarget.focus();}} onPointerCancel={()=>{touch.current=null;}} onPointerUp={e=>{if(!touch.current)return;const dx=e.clientX-touch.current.x,dy=e.clientY-touch.current.y;touch.current=null;if(Math.max(Math.abs(dx),Math.abs(dy))<12)return;steer(Math.abs(dx)>Math.abs(dy)?{x:Math.sign(dx),y:0}:{x:0,y:Math.sign(dy)});}}>
      <svg viewBox="0 0 400 400" aria-hidden="true"><defs><pattern id="snake-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#bdd4b0" strokeWidth=".5"/></pattern></defs><rect width="400" height="400" fill="#e9f2df"/><rect width="400" height="400" fill="url(#snake-grid)"/>{walls.map(p=><rect key={p.x+','+p.y} x={p.x*20+1} y={p.y*20+1} width="18" height="18" rx="3" fill="#788578"/>)}{state.food&&<circle cx={state.food.x*20+10} cy={state.food.y*20+10} r="7" fill="#d36550"/>}{state.body.map((p,i)=><rect key={i} x={p.x*20+1} y={p.y*20+1} width="18" height="18" rx={i?4:6} fill={i?'#729f5d':'#395e3b'}/>)}<circle cx={state.body[0].x*20+10+state.direction.x*4} cy={state.body[0].y*20+10+state.direction.y*4} r="2" fill="#fff"/></svg>
      {(!started||finished||resting)&&<div className="court-overlay">{finished?<EndPanel title={state.won?'Board complete!':'Game over'} onAgain={()=>reset()}>{state.score*(difficulty+1)} points · length {state.body.length}</EndPanel>:<><h3>{resting?'Paused':'Ready to grow?'}</h3><button className="play-button primary" onClick={e=>{setStarted(true);setResting(false);e.currentTarget.closest('.snake-court')?.querySelector('svg')?.parentElement?.focus();}}>{resting?'Continue game':'Start snake'}</button></>}</div>}
    </div>
    <div className="snake-dpad" aria-label="Snake direction controls">{[['↑',0,-1,'Up'],['←',-1,0,'Left'],['↓',0,1,'Down'],['→',1,0,'Right']].map(([label,x,y,name])=><button key={name} className="play-button" aria-label={'Steer '+name} disabled={!started||finished||paused||resting} onClick={()=>steer({x:Number(x),y:Number(y)})}>{label}</button>)}</div>
    <p className="game-rules">Arrow keys, WASD, swipe, or direction buttons. Eat the red food; speed increases every five bites. Easy wraps at the edges. Normal adds walls at the edges. Hard adds obstacles and a faster pace.</p>
  </section>;
}

export function BrickBreaker({onFinish}:GameProps){
  const [state,setState]=useState(initialBreaker),[difficulty,setDifficulty]=useState(1),[resting,setResting]=useState(false);
  const current=useRef(state),{paused,chime}=useConsole();const ended=state.phase==='over'||state.phase==='won';
  const update=(next:typeof state)=>{current.current=next;setState(next);};
  const reset=()=>{update(initialBreaker());setResting(false);};
  const paddle=(x:number)=>{if(paused||resting||ended)return;const half=current.current.wide>0?64:43;const value=Math.max(half,Math.min(600-half,x));update({...current.current,paddle:value,...(current.current.phase==='serve'?{x:value}:{})});};
  const launch=()=>{if(paused)return;update({...current.current,phase:'play'});setResting(false);};
  usePlayClock(state.phase==='play',paused||resting,()=>{
    const next=stepBreaker(current.current,difficulty);if(next.score>current.current.score)chime();update(next);if(next.phase==='over'||next.phase==='won'){onFinish(next.score);chime(next.phase==='won');}
  },16);
  return <section className="advanced-game breaker-game"><div className="advanced-controls"><Difficulty value={difficulty} disabled={state.phase==='play'||state.level>1||state.lives<3} onChange={v=>{setDifficulty(v);reset();}}/>{state.phase==='play'&&<button className="play-button" aria-pressed={resting} onClick={()=>setResting(!resting)}>{resting?'Continue':'Pause'}</button>}</div>
    <div className="advanced-hud"><span>Stage <b>{state.level} / 5</b></span><span>Score <b>{state.score}</b></span><span>Lives <b>{state.lives}</b></span><span>Combo <b>×{Math.min(state.combo,5)}</b></span></div>
    <div className="breaker-court" tabIndex={0} role="group" aria-label="Brick Breaker court. Left and right arrows move the paddle. Space launches the ball." onKeyDown={e=>{if(isOverlayControl(e.target))return;if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();paddle(current.current.paddle+(e.key==='ArrowLeft'?-30:30));}if(e.key===' '){e.preventDefault();if(state.phase==='serve')launch();else if(state.phase==='play')setResting(!resting);}}} onPointerDown={e=>{if(isOverlayControl(e.target))return;e.currentTarget.setPointerCapture(e.pointerId);const r=e.currentTarget.getBoundingClientRect();paddle((e.clientX-r.left)/r.width*600);e.currentTarget.focus();}} onPointerMove={e=>{if(e.pointerType==='touch'&&!e.buttons)return;const r=e.currentTarget.getBoundingClientRect();paddle((e.clientX-r.left)/r.width*600);}}>
      <svg viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true"><rect width="600" height="400" fill="#eff5fa"/>{state.bricks.filter(b=>b.hp>0).map((b,i)=><g key={b.x+','+b.y}><rect x={b.x} y={b.y} width="65" height="20" rx="4" fill={['#548ea7','#80b6b0','#d8b774','#c67e70','#8c91b5'][Math.floor((b.y-38)/27)]} stroke={b.hp>1?'#455b70':'#fff'} strokeWidth={b.hp>1?2:1}/>{b.hp>1&&<path d={`M${b.x+23} ${b.y+10}h19`} stroke="#fff" strokeWidth="2"/>}</g>)}{state.drops.map((d,i)=><g key={i}><rect x={d.x-13} y={d.y-9} width="26" height="18" rx="7" fill={d.kind==='wide'?'#779c57':'#638fb3'}/><text x={d.x} y={d.y+4} textAnchor="middle" fill="white" fontSize="12">{d.kind==='wide'?'W':'S'}</text></g>)}<rect x={state.paddle-(state.wide?64:43)} y="365" width={state.wide?128:86} height="12" rx="6" fill="#456f90"/><circle cx={state.x} cy={state.y} r="6" fill="#344c64"/></svg>
      {(state.phase!=='play'||resting)&&<div className="court-overlay">{ended?<EndPanel title={state.phase==='won'?'All five stages cleared!':'Game over'} onAgain={reset}>{state.score} points.</EndPanel>:state.phase==='clear'?<><h3>Stage {state.level} cleared</h3><button className="play-button primary" onClick={()=>update({...state,level:state.level+1,bricks:brickLevel(state.level+1),drops:[],x:state.paddle,y:354,vx:3,vy:-4,phase:'serve',wide:0,slow:0,combo:0})}>Next stage</button></>:<><h3>{resting?'Paused':state.lives<3?'Ready for another ball?':'Clear the bricks'}</h3><button className="play-button primary" onClick={()=>{if(resting)setResting(false);else launch();}}>{resting?'Continue game':'Launch ball'}</button></>}</div>}
    </div>
    <label className="breaker-slider">Paddle position<input aria-label="Brick Breaker paddle" type="range" min="43" max="557" value={state.paddle} disabled={paused||resting||ended} onChange={e=>paddle(Number(e.target.value))}/></label>
    <p className="game-rules">Mouse, drag, arrow keys, or the slider. Hit with the paddle edge to change the angle. Armored bricks take two hits. Catch W for a wider paddle or S to slow the ball. Consecutive brick hits build a combo. Five stages, three lives.</p>
  </section>;
}
