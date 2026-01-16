import { assertCondition } from "./assert";

const MILLISECONDS_PER_MINUTE = 60_000;

export function computeWpmFromDuration(
  wordCount: number,
  durationMs: number
): number {
  assertCondition(Number.isFinite(wordCount), "Word count must be a number");
  assertCondition(Number.isFinite(durationMs), "Duration must be a number");
  assertCondition(wordCount >= 0, "Word count must be non-negative");
  assertCondition(durationMs > 0, "Duration must be positive");

  return Math.round((wordCount / durationMs) * MILLISECONDS_PER_MINUTE);
}
