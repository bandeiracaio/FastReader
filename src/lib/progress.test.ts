import { describe, expect, it } from "vitest";
import { computeProgress } from "./progress";

describe("computeProgress", () => {
  it("returns 0% at start", () => {
    expect(computeProgress(0, 10).percent).toBe(0);
  });

  it("returns 50% at midpoint", () => {
    expect(computeProgress(5, 10).percent).toBe(50);
  });

  it("returns 100% at end", () => {
    expect(computeProgress(10, 10).percent).toBe(100);
  });

  it("returns 0% for empty text", () => {
    expect(computeProgress(0, 0).percent).toBe(0);
  });
});
