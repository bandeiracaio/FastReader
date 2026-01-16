import { describe, expect, it } from "vitest";
import { tokenizeText } from "./tokenize";

describe("tokenizeText", () => {
  it("returns empty array for empty input", () => {
    expect(tokenizeText("")).toEqual([]);
  });

  it("normalizes repeated whitespace", () => {
    expect(tokenizeText("Hello   world")).toEqual(["Hello", "world"]);
  });

  it("handles line breaks", () => {
    expect(tokenizeText("Hello\nworld")).toEqual(["Hello", "world"]);
  });
});
