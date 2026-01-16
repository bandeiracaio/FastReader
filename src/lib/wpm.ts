import { assertCondition } from "./assert";

export const MIN_WPM = 100;
export const MAX_WPM = 1200;
const MILLISECONDS_PER_MINUTE = 60_000;

export function clampWpm(wpm: number): number {
  assertCondition(Number.isFinite(wpm), "WPM must be a finite number");

  if (wpm < MIN_WPM) {
    return MIN_WPM;
  }

  if (wpm > MAX_WPM) {
    return MAX_WPM;
  }

  return Math.round(wpm);
}

export function wpmToIntervalMs(wpm: number): number {
  const clampedWpm = clampWpm(wpm);
  return Math.round(MILLISECONDS_PER_MINUTE / clampedWpm);
}
