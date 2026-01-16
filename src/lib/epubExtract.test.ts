import { describe, expect, it, vi } from "vitest";
import { extractEpubTextFromArrayBuffer } from "./epubExtract";
import ePub from "epubjs";

vi.mock("epubjs", () => {
  return {
    default: vi.fn()
  };
});

const ePubMock = ePub as unknown as ReturnType<typeof vi.fn>;

describe("extractEpubTextFromArrayBuffer", () => {
  it("returns empty string when no text is found", async () => {
    ePubMock.mockReturnValue({
      ready: Promise.resolve(),
      spine: {
        items: [
          {
            load: async () => undefined,
            document: { body: { textContent: "" } }
          }
        ]
      },
      load: async () => ""
    });

    const result = await extractEpubTextFromArrayBuffer(new ArrayBuffer(8));
    expect(result).toBe("");
  });

  it("concatenates text across sections", async () => {
    ePubMock.mockReturnValue({
      ready: Promise.resolve(),
      spine: {
        items: [
          {
            load: async () => undefined,
            document: { body: { textContent: "Hello" } }
          },
          {
            load: async () => undefined,
            document: { body: { textContent: "World" } }
          }
        ]
      },
      load: async () => ""
    });

    const result = await extractEpubTextFromArrayBuffer(new ArrayBuffer(8));
    expect(result).toBe("Hello\nWorld");
  });
});
