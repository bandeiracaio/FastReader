import { assertCondition } from "./assert";

export type HighlightParts = {
  leading: string;
  focus: string;
  trailing: string;
};

export function getHighlightParts(word: string): HighlightParts {
  assertCondition(typeof word === "string", "Word must be a string");

  if (!word) {
    return { leading: "", focus: "", trailing: "" };
  }

  const focusIndex = Math.max(Math.floor(word.length / 2) - 1, 0);

  return {
    leading: word.slice(0, focusIndex),
    focus: word.slice(focusIndex, focusIndex + 1),
    trailing: word.slice(focusIndex + 1)
  };
}
