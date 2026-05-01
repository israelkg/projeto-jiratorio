export function pickRandom(arr) {
  if (!arr || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Sorteio com peso decrescente por participação anterior.
 * Cada item recebe peso = max(0.1, 1 - victimCount * 0.2).
 */
export function pickWeighted(students) {
  if (!students || students.length === 0) return undefined;
  const weights = students.map((s) => Math.max(0.1, 1 - (s.victimCount ?? 0) * 0.2));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < students.length; i++) {
    r -= weights[i];
    if (r <= 0) return students[i];
  }
  return students[students.length - 1];
}
