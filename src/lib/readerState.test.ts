import { describe, expect, it } from "vitest";
import {
  createReaderState,
  finishReader,
  pauseReader,
  playReader,
  stepBack,
  stepForward
} from "./readerState";

describe("readerState", () => {
  it("starts paused at index 0", () => {
    const state = createReaderState(5);
    expect(state.isPlaying).toBe(false);
    expect(state.currentIndex).toBe(0);
  });

  it("pause preserves index", () => {
    const state = createReaderState(5);
    const playing = playReader(state);
    const paused = pauseReader(playing);
    expect(paused.currentIndex).toBe(0);
    expect(paused.isPlaying).toBe(false);
  });

  it("steps forward within bounds", () => {
    const state = createReaderState(2);
    const stepped = stepForward(state);
    expect(stepped.currentIndex).toBe(1);
  });

  it("does not step past end", () => {
    const state = createReaderState(1);
    const stepped = stepForward(state);
    const steppedAgain = stepForward(stepped);
    expect(steppedAgain.currentIndex).toBe(1);
  });

  it("steps back within bounds", () => {
    const state = createReaderState(3);
    const stepped = stepForward(stepForward(state));
    const backed = stepBack(stepped);
    expect(backed.currentIndex).toBe(1);
  });

  it("does not step below zero", () => {
    const state = createReaderState(3);
    const backed = stepBack(state);
    expect(backed.currentIndex).toBe(0);
  });

  it("finish sets end state", () => {
    const state = createReaderState(4);
    const finished = finishReader(state);
    expect(finished.currentIndex).toBe(4);
    expect(finished.isPlaying).toBe(false);
  });
});
