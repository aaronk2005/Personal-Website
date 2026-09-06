export function shuffled<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// One roll per frame: an intentionally short ten-pin challenge, scored out of 50.
export function bowl(aim: number, power: number) {
  const offset = Math.abs(Math.max(0, Math.min(100, aim)) - 50);
  const strength = Math.max(0, Math.min(100, power));
  if (offset >= 44 || strength < 12) return 0;
  const accuracy = Math.max(0, 1 - offset / 48);
  const control = Math.max(.1, 1 - Math.abs(strength - 75) / 90);
  return Math.max(0, Math.min(10, Math.round(10 * accuracy * control)));
}
export function scoreMatch(moves: number) {
  return Math.max(10, 180 - Math.max(0, moves - 6) * 10);
}
