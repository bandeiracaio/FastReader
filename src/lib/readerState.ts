import { assertCondition } from "./assert";

export type ReaderState = {
  currentIndex: number;
  isPlaying: boolean;
  totalWords: number;
};

export function createReaderState(totalWords: number): ReaderState {
  assertCondition(Number.isFinite(totalWords), "Total words must be a number");
  assertCondition(totalWords >= 0, "Total words must be non-negative");

  return {
    currentIndex: 0,
    isPlaying: false,
    totalWords
  };
}

export function playReader(state: ReaderState): ReaderState {
  assertCondition(state.totalWords > 0, "Cannot play with empty text");
  return { ...state, isPlaying: true };
}

export function pauseReader(state: ReaderState): ReaderState {
  return { ...state, isPlaying: false };
}

export function stepForward(state: ReaderState): ReaderState {
  const nextIndex = Math.min(state.currentIndex + 1, state.totalWords);
  const isFinished = nextIndex >= state.totalWords;

  return {
    ...state,
    currentIndex: nextIndex,
    isPlaying: isFinished ? false : state.isPlaying
  };
}

export function stepBack(state: ReaderState): ReaderState {
  const nextIndex = Math.max(state.currentIndex - 1, 0);
  return { ...state, currentIndex: nextIndex };
}

export function finishReader(state: ReaderState): ReaderState {
  return { ...state, currentIndex: state.totalWords, isPlaying: false };
}
