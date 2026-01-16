import { describe, expect, it, vi } from "vitest";
import { extractPdfTextFromArrayBuffer } from "./pdfExtract";
import { getDocument } from "pdfjs-dist";

vi.mock("pdfjs-dist", () => {
  return {
    GlobalWorkerOptions: { workerSrc: "" },
    getDocument: vi.fn()
  };
});

const getDocumentMock = getDocument as unknown as ReturnType<typeof vi.fn>;

describe("extractPdfTextFromArrayBuffer", () => {
  it("returns empty string when no text is found", async () => {
    getDocumentMock.mockReturnValue({
      promise: Promise.resolve({
        numPages: 1,
        getPage: async () => ({
          getTextContent: async () => ({ items: [{ str: "" }] })
        })
      })
    });

    const result = await extractPdfTextFromArrayBuffer(new ArrayBuffer(8));
    expect(result).toBe("");
  });

  it("concatenates text across pages", async () => {
    getDocumentMock.mockReturnValue({
      promise: Promise.resolve({
        numPages: 2,
        getPage: async (pageNumber: number) => ({
          getTextContent: async () => ({
            items: [{ str: pageNumber === 1 ? "Hello" : "World" }]
          })
        })
      })
    });

    const result = await extractPdfTextFromArrayBuffer(new ArrayBuffer(8));
    expect(result).toBe("Hello\nWorld");
  });
});
