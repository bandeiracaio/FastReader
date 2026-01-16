import { assertCondition } from "./assert";

export function tokenizeText(rawText: string): string[] {
  assertCondition(typeof rawText === "string", "Text input must be a string");

  const normalizedText = rawText.replace(/\s+/g, " ").trim();
  if (!normalizedText) {
    return [];
  }

  return normalizedText.split(" ");
}
