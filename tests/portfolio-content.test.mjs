import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

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
