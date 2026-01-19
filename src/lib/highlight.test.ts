import { describe, expect, it } from "vitest";
import { getHighlightParts } from "./highlight";

describe("getHighlightParts", () => {
  it("returns empty parts for empty input", () => {
    expect(getHighlightParts("")).toEqual({
      leading: "",
      focus: "",
      trailing: ""
    });
  });

  it("highlights the center character", () => {
    expect(getHighlightParts("Fast")).toEqual({
      leading: "Fa",
      focus: "s",
      trailing: "t"
    });
  });

  it("handles single character words", () => {
    expect(getHighlightParts("A")).toEqual({
      leading: "",
      focus: "A",
      trailing: ""
    });
  });
});
