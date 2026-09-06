import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source=readFileSync(new URL('../src/components/advancedRules.ts',import.meta.url),'utf8');
const output=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {neighbors,makeMines,revealMines,stepSnake,snakeFood,initialReversi,reversiFlips,reversiMoves,playReversi,chooseReversi,initialBreaker,stepBreaker,brickLevel}=await import('data:text/javascript;base64,'+Buffer.from(output).toString('base64'));

test('Minesweeper keeps the first reveal safe at every board position and difficulty',()=>{
  for(const count of [10,16,22])for(let safe=0;safe<81;safe++){
    const board=makeMines(9,count,safe);assert.equal(board.filter(n=>n===-1).length,count);assert.equal(board[safe],0);
    for(const n of neighbors(safe,9))assert.notEqual(board[n],-1);
    for(let i=0;i<81;i++)if(board[i]!==-1)assert.equal(board[i],neighbors(i,9).filter(n=>board[n]===-1).length);
    const open=revealMines(board,[],[],safe,9);assert.ok(open.includes(safe));assert.ok(open.every(i=>board[i]!==-1));assert.equal(new Set(open).size,open.length);
  }
});
test('Minesweeper flood reveal preserves flags and does not wrap rows',()=>{
  assert.deepEqual(neighbors(0,3),[1,3,4]);
  const open=revealMines(Array(9).fill(0),[],[8],0,3);assert.equal(open.length,8);assert.ok(!open.includes(8));
});
test('Snake handles reversal, growth, wall collisions, wrapping, and a moving tail',()=>{
  const state={body:[{x:2,y:2},{x:1,y:2},{x:0,y:2}],food:{x:3,y:2},direction:{x:1,y:0},score:0,dead:false,won:false};
  const grow=stepSnake(state,{x:1,y:0},[],5,false);assert.equal(grow.body.length,4);assert.equal(grow.score,10);assert.ok(!grow.body.some(p=>p.x===grow.food.x&&p.y===grow.food.y));assert.equal(state.body.length,3);
  assert.deepEqual(stepSnake(state,{x:-1,y:0},[],5,false).direction,{x:1,y:0});
  assert.ok(stepSnake(state,{x:0,y:-1},[{x:2,y:1}],5,false).dead);
  const edge={...state,body:[{x:4,y:2},{x:3,y:2}],food:{x:2,y:0}};
  assert.ok(stepSnake(edge,{x:1,y:0},[],5,false).dead);assert.equal(stepSnake(edge,{x:1,y:0},[],5,true).body[0].x,0);
  const square={...state,body:[{x:1,y:1},{x:2,y:1},{x:2,y:2},{x:1,y:2}],direction:{x:-1,y:0},food:{x:0,y:0}};
  assert.equal(stepSnake(square,{x:0,y:1},[],4,false).dead,false);
  assert.equal(snakeFood([{x:0,y:0}],[],1),null);
});
test('Reversi validates moves, flips captured lines, and does not mutate boards',()=>{
  const board=initialReversi();assert.deepEqual(reversiMoves(board,1),[19,26,37,44]);assert.deepEqual(reversiFlips(board,19,1),[27]);
  const next=playReversi(board,19,1);assert.equal(next.filter(n=>n===1).length,4);assert.equal(next.filter(n=>n===2).length,1);assert.equal(board[27],2);assert.equal(playReversi(board,0,1),null);
  for(const depth of [1,2,3])assert.ok(reversiMoves(board,2).includes(chooseReversi(board,2,depth)));
});
test('Reversi can play a full legal game, including forced passes',()=>{
  let board=initialReversi(),turn=1,steps=0;
  while(steps++<125){const moves=reversiMoves(board,turn);if(!moves.length){if(!reversiMoves(board,3-turn).length)break;turn=3-turn;continue;}
    const index=chooseReversi(board,turn,1);assert.ok(moves.includes(index));const occupied=board.filter(Boolean).length;board=playReversi(board,index,turn);assert.equal(board.filter(Boolean).length,occupied+1);turn=3-turn;
  }
  assert.ok(steps<125);assert.equal(reversiMoves(board,1).length,0);assert.equal(reversiMoves(board,2).length,0);
});
test('Brick Breaker resolves armor, power-ups, stage completion, and lost lives',()=>{
  const initial=initialBreaker();assert.equal(stepBreaker(initial,1),initial);assert.equal(brickLevel(1).length,40);assert.ok(brickLevel(3).some(b=>b.hp===2));
  const armored={...initial,phase:'play',x:70,y:78,vx:0,vy:-6,bricks:[{x:50,y:50,hp:2,max:2,power:null}]};
  const hit=stepBreaker(armored,1);assert.equal(hit.bricks[0].hp,1);assert.ok(hit.vy>0);assert.equal(armored.bricks[0].hp,2);
  const clear=stepBreaker({...hit,x:70,y:78,vx:0,vy:-6},1);assert.equal(clear.phase,'clear');
  assert.equal(stepBreaker({...hit,x:70,y:78,vx:0,vy:-6,level:5},1).phase,'won');
  const power=stepBreaker({...initial,phase:'play',drops:[{x:300,y:350,kind:'wide'}]},1);assert.equal(power.wide,700);assert.equal(power.drops.length,0);
  const lost=stepBreaker({...initial,phase:'play',x:40,y:409,vy:6,lives:1},1);assert.equal(lost.phase,'over');assert.equal(lost.lives,0);
  const serve=stepBreaker({...initial,phase:'play',x:40,y:409,vy:6},1);assert.equal(serve.phase,'serve');assert.equal(serve.lives,2);
});
