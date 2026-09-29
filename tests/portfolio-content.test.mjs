import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import ts from 'typescript';

async function loadTypeScript(path) {
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import('data:text/javascript;base64,' + Buffer.from(output).toString('base64'));
}

test('one main menu has twelve channels with Mii replacing Now Building', async () => {
  const { channels } = await loadTypeScript('../src/data/portfolio.ts');
  assert.equal(channels.length, 12);
  assert.equal(channels[5].to, '/mii');
  assert.equal(channels.filter(c => c.to === '/mii').length, 1);
  assert.ok(channels.every(c => !c.page && !c.to.startsWith('/play') && c.to !== '/now'));
  assert.equal(new Set(channels.map(c => c.to)).size, 12);
});

test('startup completion is tab-local and tolerates blocked storage', async () => {
  const { hasCompletedStartup, rememberStartup } = await loadTypeScript('../src/startup.ts');
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  assert.equal(hasCompletedStartup(storage), false);
  rememberStartup(storage);
  assert.equal(hasCompletedStartup(storage), true);
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); } };
  assert.equal(hasCompletedStartup(blocked), false);
  assert.doesNotThrow(() => rememberStartup(blocked));
});

test('startup does not mount hidden interactive routes and old Play routes redirect', () => {
  const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  assert.match(app, /showBoot \? <BootSequence[^\n]+: <AppFrame>/);
  assert.doesNotMatch(app, /ArcadePage|NowPage/);
  assert.match(app, /path="\/play\/\*" element={<Navigate to="\/" replace/);
  assert.match(app, /path="\/now" element={<Navigate to="\/mii" replace/);
});

test('retired project is absent from shipped site source', () => {
  const root = fileURLToPath(new URL('../src/', import.meta.url));
  for (const file of readdirSync(root, { recursive: true })) {
    if (!/\.(tsx?|css)$/.test(file)) continue;
    assert.doesNotMatch(readFileSync(join(root, file), 'utf8'), /agentbench/i, file);
  }
});

test('shared app shell displays the construction banner', () => {
  const shell = readFileSync(new URL('../src/components/AppShell.tsx', import.meta.url), 'utf8');
  const appFrame = shell.slice(shell.indexOf('export function AppFrame'));
  assert.match(appFrame, /className="building-banner"/);
  assert.match(appFrame, /Currently building/);
  assert.match(appFrame, /This site is a work in progress/);
});
