export type Point = { x: number; y: number };
export function neighbors(index: number, size: number): number[] {
  const x=index%size,y=Math.floor(index/size),result:number[]=[];
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if((dx||dy)&&x+dx>=0&&x+dx<size&&y+dy>=0&&y+dy<size)result.push((y+dy)*size+x+dx);
  return result;
}
export function makeMines(size:number,count:number,safe:number,random=Math.random):number[] {
  const excluded=new Set([safe,...neighbors(safe,size)]);
  const slots=Array.from({length:size*size},(_,i)=>i).filter(i=>!excluded.has(i));
  for(let i=slots.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[slots[i],slots[j]]=[slots[j],slots[i]];}
  const board=Array(size*size).fill(0);slots.slice(0,Math.min(count,slots.length)).forEach(i=>board[i]=-1);
  for(let i=0;i<board.length;i++)if(board[i]!==-1)board[i]=neighbors(i,size).filter(n=>board[n]===-1).length;
  return board;
}
export function revealMines(board:readonly number[],opened:readonly number[],flags:readonly number[],index:number,size:number):number[] {
  const revealed=new Set(opened),blocked=new Set(flags),queue=[index];
  while(queue.length){const cell=queue.pop()!;if(revealed.has(cell)||blocked.has(cell)||board[cell]===-1)continue;revealed.add(cell);if(board[cell]===0)queue.push(...neighbors(cell,size));}
  return [...revealed];
}
export type SnakeState={ body:Point[]; food:Point|null; direction:Point; score:number; dead:boolean; won:boolean };
export function snakeFood(body:readonly Point[],walls:readonly Point[],size:number,random=Math.random):Point|null {
  const busy=new Set([...body,...walls].map(p=>p.y*size+p.x));
  const free=Array.from({length:size*size},(_,i)=>i).filter(i=>!busy.has(i));
  if(!free.length)return null;const i=free[Math.floor(random()*free.length)];return{x:i%size,y:Math.floor(i/size)};
}
export function stepSnake(state:SnakeState,direction:Point,walls:readonly Point[],size:number,wrap:boolean,random=Math.random):SnakeState {
  if(state.dead||state.won)return state;
  const dir=direction.x===-state.direction.x&&direction.y===-state.direction.y?state.direction:direction;
  const raw={x:state.body[0].x+dir.x,y:state.body[0].y+dir.y};
  const head=wrap?{x:(raw.x+size)%size,y:(raw.y+size)%size}:raw;
  const eat=!!state.food&&head.x===state.food.x&&head.y===state.food.y;
  const occupied=eat?state.body:state.body.slice(0,-1);
  if(head.x<0||head.y<0||head.x>=size||head.y>=size||[...occupied,...walls].some(p=>p.x===head.x&&p.y===head.y))return{...state,direction:dir,dead:true};
  const body=[head,...state.body];if(!eat)body.pop();const food=eat?snakeFood(body,walls,size,random):state.food;
  return{body,food,direction:dir,score:state.score+(eat?10:0),dead:false,won:food===null};
}

export function initialReversi():number[]{const b=Array(64).fill(0);b[27]=2;b[28]=1;b[35]=1;b[36]=2;return b;}
export function reversiFlips(board:readonly number[],index:number,player:number):number[]{
  if(index<0||index>=64||board[index])return[];
  const result:number[]=[],x=index%8,y=Math.floor(index/8);
  for(const [dx,dy] of [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]){
    let nx=x+dx,ny=y+dy;const line:number[]=[];
    while(nx>=0&&nx<8&&ny>=0&&ny<8&&board[ny*8+nx]===3-player){line.push(ny*8+nx);nx+=dx;ny+=dy;}
    if(line.length&&nx>=0&&nx<8&&ny>=0&&ny<8&&board[ny*8+nx]===player)result.push(...line);
  }
  return result;
}
export function reversiMoves(board:readonly number[],player:number):number[]{return board.flatMap((_,i)=>reversiFlips(board,i,player).length?[i]:[]);}
export function playReversi(board:readonly number[],index:number,player:number):number[]|null{
  const flips=reversiFlips(board,index,player);if(!flips.length)return null;const next=[...board];[index,...flips].forEach(i=>next[i]=player);return next;
}
function evaluateReversi(board:readonly number[],player:number):number{
  const count=board.reduce((score,n)=>score+(n===player?1:n===3-player?-1:0),0);
  if(!reversiMoves(board,player).length&&!reversiMoves(board,3-player).length)return Math.sign(count)*10000+count;
  let value=count;
  const corners=[0,7,56,63];
  board.forEach((n,i)=>{if(!n)return;const sign=n===player?1:-1;value+=sign*(corners.includes(i)?120:(i%8===0||i%8===7||i<8||i>55)?8:0);});
  for(const [corner,adjacent] of [[0,[1,8,9]],[7,[6,14,15]],[56,[48,49,57]],[63,[54,55,62]]] as const){if(!board[corner])for(const i of adjacent)if(board[i])value+=board[i]===player?-30:30;}
  return value+5*(reversiMoves(board,player).length-reversiMoves(board,3-player).length);
}
export function chooseReversi(board:readonly number[],player:number,depth:number):number{
  function search(b:readonly number[],turn:number,remaining:number,alpha:number,beta:number):number{
    const moves=reversiMoves(b,turn);
    if(remaining<=0||(!moves.length&&!reversiMoves(b,3-turn).length))return evaluateReversi(b,player);
    if(!moves.length)return search(b,3-turn,remaining-1,alpha,beta);
    let best=turn===player?-Infinity:Infinity;
    for(const move of moves){const value=search(playReversi(b,move,turn)!,3-turn,remaining-1,alpha,beta);best=turn===player?Math.max(best,value):Math.min(best,value);if(turn===player)alpha=Math.max(alpha,best);else beta=Math.min(beta,best);if(beta<=alpha)break;}
    return best;
  }
  let best=-Infinity,choice=-1;
  for(const move of reversiMoves(board,player)){const value=search(playReversi(board,move,player)!,3-player,depth-1,-Infinity,Infinity);if(value>best){best=value;choice=move;}}
  return choice;
}

export type Brick={x:number;y:number;hp:number;max:number;power:'wide'|'slow'|null};
export type BreakerState={x:number;y:number;vx:number;vy:number;paddle:number;bricks:Brick[];drops:{x:number;y:number;kind:'wide'|'slow'}[];wide:number;slow:number;score:number;lives:number;level:number;combo:number;phase:'serve'|'play'|'clear'|'over'|'won'};
export function brickLevel(level:number):Brick[]{return Array.from({length:40},(_,i)=>({x:18+(i%8)*71,y:38+Math.floor(i/8)*27,hp:level>1&&i<16?2:1,max:level>1&&i<16?2:1,power:i%13===0?'wide':i%17===0?'slow':null}));}
export function initialBreaker():BreakerState{return{x:300,y:354,vx:3,vy:-4,paddle:300,bricks:brickLevel(1),drops:[],wide:0,slow:0,score:0,lives:3,level:1,combo:0,phase:'serve'};}
export function stepBreaker(current:BreakerState,difficulty:number):BreakerState{
  if(current.phase!=='play')return current;
  const s={...current,bricks:current.bricks.map(b=>({...b})),drops:current.drops.map(d=>({...d})),wide:Math.max(0,current.wide-1),slow:Math.max(0,current.slow-1)};
  const speed=(.85+difficulty*.18+(s.level-1)*.06)*(s.slow>0?.7:1);
  const oldX=s.x,oldY=s.y;s.x+=s.vx*speed;s.y+=s.vy*speed;
  if(s.x<7||s.x>593){s.vx*=-1;s.x=Math.max(7,Math.min(593,s.x));}if(s.y<7){s.vy=Math.abs(s.vy);s.y=7;}
  const half=s.wide>0?64:43;
  if(s.vy>0&&oldY<=365&&s.y>=358&&s.y<=375&&Math.abs(s.x-s.paddle)<half+6){const angle=(s.x-s.paddle)/half*1.05;s.vx=5*Math.sin(angle);s.vy=-Math.max(2.3,5*Math.cos(angle));s.y=357;s.combo=0;}
  for(const brick of s.bricks){if(brick.hp<=0)continue;if(s.x+6>=brick.x&&s.x-6<=brick.x+65&&s.y+6>=brick.y&&s.y-6<=brick.y+20){
    if(oldY+6<=brick.y||oldY-6>=brick.y+20){s.vy*=-1;s.y=oldY;}else{s.vx*=-1;s.x=oldX;}
    brick.hp--;s.score+=10;if(!brick.hp){s.combo++;s.score+=20+Math.min(s.combo,5)*5;if(brick.power)s.drops.push({x:brick.x+32,y:brick.y+10,kind:brick.power});}break;
  }}
  s.drops=s.drops.filter(drop=>{drop.y+=2;if(drop.y>=351&&drop.y<=380&&Math.abs(drop.x-s.paddle)<half+9){if(drop.kind==='wide')s.wide=700;else s.slow=500;return false;}return drop.y<405;});
  if(s.bricks.every(b=>b.hp===0)){s.phase=s.level===5?'won':'clear';s.score+=s.level*100;}
  else if(s.y>410){s.lives--;s.phase=s.lives?'serve':'over';s.x=s.paddle;s.y=354;s.vx=3;s.vy=-4;s.combo=0;s.drops=[];s.wide=0;s.slow=0;}
  return s;
}
