import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { extractEpubTextFromArrayBuffer } from "./lib/epubExtract";
import { extractPdfTextFromArrayBuffer } from "./lib/pdfExtract";
import { tokenizeText } from "./lib/tokenize";

vi.mock("./lib/pdfExtract", () => {
  return {
    extractPdfTextFromArrayBuffer: vi.fn()
  };
});

vi.mock("./lib/epubExtract", () => {
  return {
    extractEpubTextFromArrayBuffer: vi.fn()
  };
});

const originalFileReader = globalThis.FileReader;
const originalFetch = globalThis.fetch;

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
  globalThis.FileReader = originalFileReader;
  globalThis.fetch = originalFetch;
});

const createMockFileReader = () =>
  class MockFileReader {
    result: ArrayBuffer | null = null;
    onload: ((event: Event) => void) | null = null;
    onerror: ((event: Event) => void) | null = null;

    readAsArrayBuffer() {
      this.result = new ArrayBuffer(8);
      queueMicrotask(() => {
        this.onload?.(new Event("load"));
      });
    }
  };

describe("App", () => {
  it("shows the initial word count", () => {
    render(<App />);

    const expectedCount = tokenizeText(
      "FastReader will display words one at a time for focused reading."
    ).length;

    expect(screen.getByText(`Words: ${expectedCount}`)).toBeInTheDocument();
  });

  it("shows the app version", () => {
    render(<App />);

    const expectedVersion = process.env.npm_package_version ?? "0.1.0";
    expect(screen.getByTestId("app-version")).toHaveTextContent(
      `v${expectedVersion}`
    );
  });

  it("steps forward and back through words", () => {
    render(<App />);

    expect(screen.getByTestId("current-word")).toHaveTextContent("FastReader");
    const focusElement = screen
      .getByTestId("current-word")
      .querySelector(".app__word-focus");
    expect(focusElement).not.toBeNull();

    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("current-word")).toHaveTextContent("will");

    fireEvent.click(screen.getByTestId("back-button"));

    expect(screen.getByTestId("current-word")).toHaveTextContent("FastReader");
  });

  it("toggles play and pause", () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("play-toggle"));
    expect(screen.getByTestId("playback-status")).toHaveTextContent(
      "Status: Playing"
    );
    expect(screen.getByTestId("progress-status")).toHaveTextContent(
      "Progress: 0%"
    );

    fireEvent.click(screen.getByTestId("play-toggle"));
    expect(screen.getByTestId("playback-status")).toHaveTextContent(
      "Status: Paused"
    );
  });

  it("disables controls when input is empty", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText("Input text"), {
      target: { value: "" }
    });

    expect(screen.getByTestId("play-toggle")).toBeDisabled();
    expect(screen.getByTestId("next-button")).toBeDisabled();
    expect(screen.getByTestId("back-button")).toBeDisabled();
    expect(screen.getByTestId("progress-status")).toHaveTextContent(
      "Progress: 0% (0/0)"
    );
  });

  it("rejects unsupported file types", () => {
    render(<App />);

    const fileInput = screen.getByTestId("file-input");
    const invalidFile = new File(["oops"], "notes.txt", {
      type: "text/plain"
    });

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Only .pdf and .epub files are supported."
    );
    expect(screen.getByTestId("import-status")).toHaveTextContent(
      "Import status: error"
    );
  });

  it("rejects files above the size limit", () => {
    render(<App />);

    const fileInput = screen.getByTestId("file-input");
    const largeFile = new File(["large"], "book.pdf", {
      type: "application/pdf"
    });

    Object.defineProperty(largeFile, "size", {
      value: 10 * 1024 * 1024 + 1
    });

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(screen.getByRole("alert")).toHaveTextContent(
      "File is too large. Max size is 10 MB."
    );
    expect(screen.getByTestId("import-status")).toHaveTextContent(
      "Import status: error"
    );
  });

  it("shows file metadata after PDF import", async () => {
    const pdfExtractMock =
      extractPdfTextFromArrayBuffer as unknown as ReturnType<typeof vi.fn>;
    pdfExtractMock.mockResolvedValueOnce("Hello world");

    globalThis.FileReader = createMockFileReader();

    render(<App />);

    const fileInput = screen.getByTestId("file-input");
    const pdfFile = new File(["pdf"], "book.pdf", {
      type: "application/pdf"
    });

    fireEvent.change(fileInput, { target: { files: [pdfFile] } });

    await screen.findByTestId("file-metadata");

    expect(screen.getByTestId("import-status")).toHaveTextContent(
      "Import status: success"
    );
    expect(screen.getByTestId("file-metadata")).toHaveTextContent(
      "File: book.pdf"
    );
    expect(screen.getByTestId("file-metadata")).toHaveTextContent("Type: pdf");
    expect(screen.getByTestId("file-metadata")).toHaveTextContent(
      "Extracted words: 2"
    );
  });

  it("toggles distraction-free mode", () => {
    render(<App />);

    const toggleButton = screen.getByTestId("distraction-toggle");
    expect(toggleButton).toHaveTextContent("Enter focus mode");

    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Exit focus mode");
  });

  it("updates theme settings", () => {
    render(<App />);

    const fontSizeSelect = screen.getByTestId("font-size-select");
    fireEvent.change(fontSizeSelect, { target: { value: "20" } });

    const fontFamilySelect = screen.getByTestId("font-family-select");
    fireEvent.change(fontFamilySelect, {
      target: { value: "Georgia, serif" }
    });

    const textColorInput = screen.getByTestId("text-color-input");
    fireEvent.change(textColorInput, { target: { value: "#111111" } });

    const backgroundColorInput = screen.getByTestId("background-color-input");
    fireEvent.change(backgroundColorInput, { target: { value: "#ffffff" } });

    const highlightColorInput = screen.getByTestId("highlight-color-input");
    fireEvent.change(highlightColorInput, { target: { value: "#ff0000" } });

    const highlightOutlineColorInput = screen.getByTestId(
      "highlight-outline-color-input"
    );
    fireEvent.change(highlightOutlineColorInput, {
      target: { value: "#00ff00" }
    });

    expect(fontSizeSelect).toHaveValue("20");
    expect(fontFamilySelect).toHaveValue("Georgia, serif");
    expect(textColorInput).toHaveValue("#111111");
    expect(backgroundColorInput).toHaveValue("#ffffff");
    expect(highlightColorInput).toHaveValue("#ff0000");
    expect(highlightOutlineColorInput).toHaveValue("#00ff00");
  });

  it("resets theme settings", () => {
    render(<App />);

    fireEvent.change(screen.getByTestId("font-size-select"), {
      target: { value: "20" }
    });

    fireEvent.click(screen.getByTestId("theme-reset"));

    expect(screen.getByTestId("font-size-select")).toHaveValue("16");
    expect(screen.getByTestId("font-family-select")).toHaveValue("system-ui");
    expect(screen.getByTestId("highlight-color-input")).toHaveValue("#111827");
    expect(screen.getByTestId("highlight-outline-color-input")).toHaveValue(
      "#000000"
    );
  });

  it("applies theme presets", () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("theme-sunset-orange"));

    expect(screen.getByTestId("font-family-select")).toHaveValue(
      "Georgia, serif"
    );
    expect(screen.getByTestId("text-color-input")).toHaveValue("#3e2723");
    expect(screen.getByTestId("background-color-input")).toHaveValue("#fff3e0");
    expect(screen.getByTestId("highlight-color-input")).toHaveValue("#ff5722");
    expect(screen.getByTestId("highlight-outline-color-input")).toHaveValue(
      "#e64a19"
    );
  });

  it("runs the reading speed test", () => {
    vi.spyOn(Date, "now").mockReturnValueOnce(0).mockReturnValueOnce(60_000);

    render(<App />);

    fireEvent.click(screen.getByTestId("speed-test-start"));
    fireEvent.click(screen.getByTestId("speed-test-finish"));

    expect(screen.getByTestId("speed-test-result")).toBeInTheDocument();
  });

  it("loads a long sample text", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "Long form public domain sample."
    }) as typeof fetch;

    render(<App />);

    fireEvent.click(screen.getByTestId("sample-pride-and-prejudice"));

    expect(
      await screen.findByDisplayValue("Long form public domain sample.")
    ).toBeInTheDocument();
  });

  it("loads a Gutenberg book by ID", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => "Gutenberg sample text."
    }) as typeof fetch;

    render(<App />);

    fireEvent.change(screen.getByTestId("gutenberg-id"), {
      target: { value: "1342" }
    });
    fireEvent.click(screen.getByTestId("gutenberg-sample"));

    expect(
      await screen.findByDisplayValue("Gutenberg sample text.")
    ).toBeInTheDocument();
  });

  it("allows selecting chapters after Gutenberg load", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () =>
        "CHAPTER 1\nChapter one text.\nCHAPTER 2\nChapter two text."
    }) as typeof fetch;

    render(<App />);

    fireEvent.click(screen.getByTestId("gutenberg-sample"));

    const chapterSelect = await screen.findByTestId("chapter-select");
    fireEvent.change(chapterSelect, { target: { value: "chapter-2" } });

    await waitFor(() => {
      expect(chapterSelect).toHaveValue("chapter-2");
    });
  });

  it("auto-advances at selected WPM", () => {
    vi.useFakeTimers();
    render(<App />);

    fireEvent.change(screen.getByTestId("wpm-input"), {
      target: { value: "600" }
    });
    fireEvent.click(screen.getByTestId("wpm-start"));

    act(() => {
      vi.advanceTimersByTime(120);
    });

    expect(screen.getByTestId("current-word")).not.toHaveTextContent(
      "FastReader"
    );

    vi.useRealTimers();
  });

  it("toggles fullscreen label", async () => {
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    const exitFullscreen = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(document.documentElement, "requestFullscreen", {
      value: requestFullscreen,
      configurable: true
    });
    Object.defineProperty(document, "exitFullscreen", {
      value: exitFullscreen,
      configurable: true
    });

    render(<App />);

    const fullscreenToggle = screen.getByTestId("fullscreen-toggle");
    expect(fullscreenToggle).toHaveTextContent("Enter fullscreen");

    fireEvent.click(fullscreenToggle);
    expect(requestFullscreen).toHaveBeenCalled();

    Object.defineProperty(document, "fullscreenElement", {
      value: document.documentElement,
      configurable: true
    });
    fireEvent(document, new Event("fullscreenchange"));

    expect(fullscreenToggle).toHaveTextContent("Exit fullscreen");
  });

  it("toggles word focus mode", () => {
    render(<App />);

    const focusToggle = screen.getByTestId("word-focus-toggle");
    expect(focusToggle).toHaveTextContent("Focus current word");

    fireEvent.click(focusToggle);
    expect(focusToggle).toHaveTextContent("Exit word focus");
  });

  it("shows WPM controls in word focus mode", () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("word-focus-toggle"));

    expect(screen.getByTestId("focus-panel")).toBeInTheDocument();
    expect(screen.getByTestId("focus-wpm-input")).toHaveValue(300);
    expect(screen.getByTestId("focus-play-toggle")).toHaveTextContent("Play");
  });

  it("shows elapsed time in word focus mode", () => {
    vi.useFakeTimers();
    render(<App />);

    fireEvent.click(screen.getByTestId("word-focus-toggle"));
    fireEvent.click(screen.getByTestId("focus-play-toggle"));

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByTestId("focus-panel")).toHaveTextContent("Time: 2s");

    vi.useRealTimers();
  });

  it("locks file upload when using pasted text", () => {
    render(<App />);

    const pasteToggle = screen.getByTestId("paste-toggle");
    const fileInput = screen.getByTestId("file-input");

    fireEvent.click(pasteToggle);

    expect(pasteToggle).toBeDisabled();
    expect(fileInput).toBeDisabled();
  });

  it("clears input and resets import state", () => {
    render(<App />);

    const textarea = screen.getByLabelText("Input text");
    fireEvent.change(textarea, { target: { value: "Hello" } });

    fireEvent.click(screen.getByTestId("clear-text"));

    expect(textarea).toHaveValue("");
    expect(screen.getByTestId("import-status")).toHaveTextContent(
      "Import status: idle"
    );
  });

  it("handles hotkeys for play and step", () => {
    render(<App />);

    fireEvent.keyDown(window, { key: " " });
    expect(screen.getByTestId("playback-status")).toHaveTextContent(
      "Status: Playing"
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByTestId("current-word")).toHaveTextContent("will");
  });

  it("disables hotkeys when toggled off", () => {
    render(<App />);

    const hotkeysToggle = screen.getByTestId("hotkeys-toggle");
    fireEvent.click(hotkeysToggle);

    fireEvent.keyDown(window, { key: " " });
    expect(screen.getByTestId("playback-status")).toHaveTextContent(
      "Status: Paused"
    );
  });

  it("ignores hotkeys when typing in input", () => {
    render(<App />);

    const textarea = screen.getByLabelText("Input text");
    fireEvent.keyDown(textarea, { key: " " });

    expect(screen.getByTestId("playback-status")).toHaveTextContent(
      "Status: Paused"
    );
  });

  it("rejects epub when no text is extracted", async () => {
    const epubExtractMock =
      extractEpubTextFromArrayBuffer as unknown as ReturnType<typeof vi.fn>;
    epubExtractMock.mockResolvedValueOnce("");
    globalThis.FileReader = createMockFileReader();

    render(<App />);

    const fileInput = screen.getByTestId("file-input");
    const epubFile = new File(["epub"], "book.epub", {
      type: "application/epub+zip"
    });

    fireEvent.change(fileInput, { target: { files: [epubFile] } });
    await screen.findByText("No extractable text found in this EPUB.");
    expect(screen.getByTestId("import-status")).toHaveTextContent(
      "Import status: error"
    );
  });
});
