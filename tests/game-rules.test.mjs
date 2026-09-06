import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/components/gameRules.ts', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { bowl, shuffled, scoreMatch } = await import('data:text/javascript;base64,' + Buffer.from(output).toString('base64'));

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
