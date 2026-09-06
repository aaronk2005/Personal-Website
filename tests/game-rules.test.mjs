import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/components/gameRules.ts', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { bowl, shuffled, scoreMatch, dropDisc, fourWinner, computerColumn, strategicColumn } = await import('data:text/javascript;base64,' + Buffer.from(output).toString('base64'));

test('bowling respects gutters, power limits, and a perfect five-frame game', () => {
  assert.equal(bowl(0,75), 0);
  assert.equal(bowl(100,75), 0);
  assert.equal(bowl(50,0), 0);
  assert.equal(bowl(50,75), 10);
  assert.equal(Array.from({ length:5 }, () => bowl(50,75)).reduce((a,b)=>a+b), 50);
  assert.ok(bowl(25,75) < bowl(50,75));
  assert.ok(bowl(50,100) < bowl(50,75));
  for (let aim=-10; aim<=110; aim+=5) for (let power=-10; power<=110; power+=5) {
    const pins=bowl(aim,power);
    assert.ok(Number.isInteger(pins) && pins>=0 && pins<=10);
  }
});

test('Four in a Row supports gravity, full columns, and every winning direction', () => {
  const empty=Array(42).fill(0);
  assert.equal(dropDisc(empty,-1,1),null);
  assert.equal(dropDisc(empty,7,1),null);
  assert.equal(dropDisc(empty,3,1)[38],1);
  assert.ok(empty.every(n=>n===0));
  let stack=empty;
  for(let i=0;i<6;i++)stack=dropDisc(stack,0,i%2+1);
  assert.equal(dropDisc(stack,0,1),null);
  for(const cells of [[35,36,37,38],[3,10,17,24],[0,8,16,24],[6,12,18,24]]){
    const board=Array(42).fill(0);cells.forEach(i=>board[i]=1);assert.equal(fourWinner(board),1);
  }
  const wrap=Array(42).fill(0);[5,6,7,8].forEach(i=>wrap[i]=1);assert.equal(fourWinner(wrap),0);
});

test('computer takes wins, blocks immediate losses, and returns a legal column',()=>{
  const board=Array(42).fill(0);[35,36,37].forEach(i=>board[i]=1);assert.equal(computerColumn(board),3);
  const winning=board.map(n=>n===1?2:0);assert.equal(computerColumn(winning),3);
  assert.equal(computerColumn(Array(42).fill(1)),-1);
  let game=Array(42).fill(0);
  for(let move=0;move<42&&!fourWinner(game);move++){
    const col=computerColumn(game);assert.ok(col>=0&&col<7);game=dropDisc(game,col,move%2+1);assert.ok(game);
  }
});

test('deeper Four in a Row search takes wins and blocks threats',()=>{
  const b=Array(42).fill(0);[35,36,37].forEach(i=>b[i]=1);assert.equal(strategicColumn(b,5),3);
  const win=b.map(n=>n===1?2:0);assert.equal(strategicColumn(win,3),3);
  assert.equal(strategicColumn(Array(42).fill(1),3),-1);
});

test('every shuffled memory board retains exactly six pairs without mutating input', () => {
  const deck=[0,1,2,3,4,5,0,1,2,3,4,5];
  const copy=[...deck];
  for (let run=0; run<50; run++) {
    const result=shuffled(deck);
    assert.equal(result.length,12);
    for (let face=0; face<6; face++) assert.equal(result.filter(i=>i===face).length,2);
  }
  assert.deepEqual(deck,copy);
  assert.equal(scoreMatch(6),180);
  assert.ok(scoreMatch(12)<scoreMatch(6));
  assert.equal(scoreMatch(500),10);
});
