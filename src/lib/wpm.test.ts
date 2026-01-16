import { describe, expect, it } from "vitest";
import { clampWpm, MAX_WPM, MIN_WPM, wpmToIntervalMs } from "./wpm";

describe("clampWpm", () => {
  it("clamps values below minimum", () => {
    expect(clampWpm(MIN_WPM - 50)).toBe(MIN_WPM);
  });

  it("clamps values above maximum", () => {
    expect(clampWpm(MAX_WPM + 500)).toBe(MAX_WPM);
  });

  it("rounds values within range", () => {
    expect(clampWpm(349.6)).toBe(350);
  });
});

describe("wpmToIntervalMs", () => {
  it("returns milliseconds per word", () => {
    expect(wpmToIntervalMs(300)).toBe(200);
  });

  it("uses clamped values for interval calculation", () => {
    expect(wpmToIntervalMs(10)).toBe(Math.round(60000 / MIN_WPM));
  });
});
