const STARTUP_KEY = 'ak-startup-complete';

/** Optional, tab-local convenience: blocked storage must never break startup. */
export function hasCompletedStartup(storage: Pick<Storage, 'getItem'>): boolean {
  try { return storage.getItem(STARTUP_KEY) === '1'; } catch { return false; }
}

export function rememberStartup(storage: Pick<Storage, 'setItem'>): void {
  try { storage.setItem(STARTUP_KEY, '1'); } catch { /* Keep the current visit usable. */ }
}
