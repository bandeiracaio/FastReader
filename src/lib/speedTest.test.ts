import { describe, expect, it } from "vitest";
import { computeWpmFromDuration } from "./speedTest";

describe("computeWpmFromDuration", () => {
  it("calculates wpm from duration", () => {
    expect(computeWpmFromDuration(120, 60_000)).toBe(120);
  });

  it("rounds to the nearest integer", () => {
    expect(computeWpmFromDuration(90, 45_000)).toBe(120);
  });
});
