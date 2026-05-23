export function wordDelayMs(word: string, baseWpm: number): number {
  const base = Math.round(60000 / Math.max(baseWpm, 1));
  const lastChar = word[word.length - 1] ?? "";

  let multiplier = 1;
  if (".!?…".includes(lastChar)) multiplier = 1.8;
  else if (",;:—".includes(lastChar)) multiplier = 1.3;

  if (word.length >= 9) multiplier = Math.max(multiplier, 1.2);

  return Math.round(base * multiplier);
}
