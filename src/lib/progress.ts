import { assertCondition } from "./assert";

export type ReadingProgress = {
  percent: number;
  currentIndex: number;
  totalWords: number;
};

export function computeProgress(
  currentIndex: number,
  totalWords: number
): ReadingProgress {
  assertCondition(Number.isFinite(currentIndex), "Current index must be a number");
  assertCondition(Number.isFinite(totalWords), "Total words must be a number");
  assertCondition(currentIndex >= 0, "Current index must be non-negative");
  assertCondition(totalWords >= 0, "Total words must be non-negative");
  assertCondition(
    currentIndex <= totalWords,
    "Current index cannot exceed total words"
  );

  const percent =
    totalWords === 0
      ? 0
      : Math.round((currentIndex / totalWords) * 100);

  return { percent, currentIndex, totalWords };
}
