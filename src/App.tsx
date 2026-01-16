import { useCallback, useEffect, useMemo, useState } from "react";
import { computeProgress } from "./lib/progress";
import {
  createReaderState,
  pauseReader,
  playReader,
  stepBack,
  stepForward
} from "./lib/readerState";
import { assertCondition } from "./lib/assert";
import { extractEpubTextFromArrayBuffer } from "./lib/epubExtract";
import { extractPdfTextFromArrayBuffer } from "./lib/pdfExtract";
import { getHighlightParts } from "./lib/highlight";
import { computeWpmFromDuration } from "./lib/speedTest";
import { clampWpm, MAX_WPM, MIN_WPM, wpmToIntervalMs } from "./lib/wpm";
import { tokenizeText } from "./lib/tokenize";

const DEFAULT_SAMPLE_TEXT =
  "FastReader will display words one at a time for focused reading.";
const SUPPORTED_FILE_TYPES = [".pdf", ".epub"];
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const IMPORT_STATUSES = ["idle", "loading", "success", "error"] as const;
const DISRACTION_FREE_STORAGE_KEY = "fastreader:distraction-free";
const HOTKEYS_STORAGE_KEY = "fastreader:hotkeys-enabled";
const THEME_STORAGE_KEY = "fastreader:theme-settings";

const FONT_SIZE_OPTIONS = ["14", "16", "18", "20", "24"] as const;
const FONT_FAMILY_OPTIONS = [
  "system-ui",
  "Georgia, serif",
  "\"Times New Roman\", serif",
  "Arial, sans-serif",
  "\"Trebuchet MS\", sans-serif",
  "Verdana, sans-serif"
] as const;
const DEFAULT_THEME = {
  fontSize: "16",
  fontFamily: "system-ui",
  textColor: "#1f2937",
  backgroundColor: "#ffffff",
  highlightColor: "#111827",
  highlightOutlineColor: "#000000"
};
type ThemeSettings = typeof DEFAULT_THEME;
type ThemePreset = {
  id: string;
  label: string;
  description: string;
  theme: Omit<ThemeSettings, "fontSize">;
  swatches: string[];
};
const THEME_PRESETS: ThemePreset[] = [
  {
    id: "midnight-blue",
    label: "Midnight Blue",
    description: "High-contrast dark mode with electric blue accents.",
    theme: {
      fontFamily: "system-ui",
      textColor: "#ffffff",
      backgroundColor: "#1a237e",
      highlightColor: "#448aff",
      highlightOutlineColor: "#2979ff"
    },
    swatches: ["#1a237e", "#448aff", "#2979ff", "#ffffff"]
  },
  {
    id: "sunset-orange",
    label: "Sunset Orange",
    description: "Warm, bright palette for energetic reading sessions.",
    theme: {
      fontFamily: "Georgia, serif",
      textColor: "#3e2723",
      backgroundColor: "#fff3e0",
      highlightColor: "#ff5722",
      highlightOutlineColor: "#e64a19"
    },
    swatches: ["#fff3e0", "#ff5722", "#e64a19", "#3e2723"]
  },
  {
    id: "digital-lavender",
    label: "Digital Lavender",
    description: "Soft lavender tones with a crisp, modern contrast.",
    theme: {
      fontFamily: "\"Trebuchet MS\", sans-serif",
      textColor: "#4a148c",
      backgroundColor: "#fff0f6",
      highlightColor: "#b39ddb",
      highlightOutlineColor: "#9575cd"
    },
    swatches: ["#fff0f6", "#b39ddb", "#9575cd", "#4a148c"]
  },
  {
    id: "earth-neutrals",
    label: "Earth Neutrals",
    description: "Muted neutrals with a warm, grounded feel.",
    theme: {
      fontFamily: "\"Times New Roman\", serif",
      textColor: "#3e2723",
      backgroundColor: "#efebe9",
      highlightColor: "#8d6e63",
      highlightOutlineColor: "#6d4c41"
    },
    swatches: ["#efebe9", "#8d6e63", "#6d4c41", "#3e2723"]
  },
  {
    id: "high-contrast-dark",
    label: "High-Contrast Dark",
    description: "Bold cyan highlights on a deep charcoal backdrop.",
    theme: {
      fontFamily: "Arial, sans-serif",
      textColor: "#eeeeee",
      backgroundColor: "#212121",
      highlightColor: "#00e5ff",
      highlightOutlineColor: "#00b8d4"
    },
    swatches: ["#212121", "#00e5ff", "#00b8d4", "#eeeeee"]
  }
];
const SPEED_TEST_TEXT =
  "Reading speed tests help you find a comfortable words per minute pace.";
const DEFAULT_WPM = 300;
const APP_VERSION = __APP_VERSION__;
type SampleText = {
  id: string;
  label: string;
  text: string;
};
type SampleSource = {
  id: string;
  label: string;
  description: string;
  url: string;
};
const SAMPLE_TEXTS: SampleText[] = [
  {
    id: "quick-demo",
    label: "Quick demo",
    text: "Speed reading works best with short bursts of focused attention."
  },
  {
    id: "productivity",
    label: "Productivity tip",
    text:
      "Try increasing your pace gradually while maintaining comprehension and comfort."
  }
];
const LONG_SAMPLE_SOURCES: SampleSource[] = [
  {
    id: "pride-and-prejudice",
    label: "Pride and Prejudice",
    description: "Jane Austen",
    url: "samples/pride-and-prejudice.txt"
  },
  {
    id: "moby-dick",
    label: "Moby-Dick",
    description: "Herman Melville",
    url: "samples/moby-dick.txt"
  },
  {
    id: "dracula",
    label: "Dracula",
    description: "Bram Stoker",
    url: "samples/dracula.txt"
  },
  {
    id: "frankenstein",
    label: "Frankenstein",
    description: "Mary Shelley",
    url: "samples/frankenstein.txt"
  },
  {
    id: "alice-wonderland",
    label: "Alice’s Adventures in Wonderland",
    description: "Lewis Carroll",
    url: "samples/alice-wonderland.txt"
  },
  {
    id: "sherlock-holmes",
    label: "The Adventures of Sherlock Holmes",
    description: "Arthur Conan Doyle",
    url: "samples/sherlock-holmes.txt"
  },
  {
    id: "tale-of-two-cities",
    label: "A Tale of Two Cities",
    description: "Charles Dickens",
    url: "samples/tale-of-two-cities.txt"
  },
  {
    id: "dorian-gray",
    label: "The Picture of Dorian Gray",
    description: "Oscar Wilde",
    url: "samples/dorian-gray.txt"
  },
  {
    id: "time-machine",
    label: "The Time Machine",
    description: "H. G. Wells",
    url: "samples/time-machine.txt"
  },
  {
    id: "war-of-worlds",
    label: "The War of the Worlds",
    description: "H. G. Wells",
    url: "samples/war-of-worlds.txt"
  }
];
const DEFAULT_WIKIPEDIA_LANGUAGE = "en";

type ImportStatus = (typeof IMPORT_STATUSES)[number];

type ImportedFileMetadata = {
  fileName: string;
  fileType: "pdf" | "epub";
  fileSizeBytes: number;
  extractedWordCount: number;
};

export default function App() {
  const [inputText, setInputText] = useState(DEFAULT_SAMPLE_TEXT);
  const [readerState, setReaderState] = useState(() => createReaderState(0));
  const [fileError, setFileError] = useState<string | null>(null);
  const [importedFile, setImportedFile] =
    useState<ImportedFileMetadata | null>(null);
  const [importStatus, setImportStatus] = useState<ImportStatus>("idle");
  const [isDistractionFree, setIsDistractionFree] = useState(() => {
    try {
      return localStorage.getItem(DISRACTION_FREE_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [areHotkeysEnabled, setAreHotkeysEnabled] = useState(() => {
    try {
      return localStorage.getItem(HOTKEYS_STORAGE_KEY) !== "false";
    } catch {
      return true;
    }
  });
  const [themeSettings, setThemeSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as typeof DEFAULT_THEME) : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });
  const [speedTestStartMs, setSpeedTestStartMs] = useState<number | null>(null);
  const [speedTestResult, setSpeedTestResult] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isImportLocked, setIsImportLocked] = useState(false);
  const [isPasteLocked, setIsPasteLocked] = useState(false);
  const [wpm, setWpm] = useState(DEFAULT_WPM);
  const [isWordFocusMode, setIsWordFocusMode] = useState(false);
  const [sessionElapsedMs, setSessionElapsedMs] = useState(0);
  const [sessionStartMs, setSessionStartMs] = useState<number | null>(null);
  const [wikipediaLanguage, setWikipediaLanguage] = useState(
    DEFAULT_WIKIPEDIA_LANGUAGE
  );
  const [sampleStatus, setSampleStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [sampleError, setSampleError] = useState<string | null>(null);

  const tokens = useMemo(() => {
    return tokenizeText(inputText);
  }, [inputText]);

  const tokenCount = tokens.length;
  const hasTokens = tokenCount > 0;
  const progress = computeProgress(readerState.currentIndex, tokenCount);

  useEffect(() => {
    setReaderState(createReaderState(tokenCount));
  }, [tokenCount]);

  const currentWord = tokens[readerState.currentIndex] ?? "";
  const statusLabel = readerState.isPlaying ? "Playing" : "Paused";
  const highlightedWord = getHighlightParts(currentWord);

  const handlePlayToggle = useCallback(() => {
    if (!hasTokens) {
      return;
    }

    setReaderState((prevState) => {
      return prevState.isPlaying ? pauseReader(prevState) : playReader(prevState);
    });
  }, [hasTokens]);

  const handleStartWpm = () => {
    if (!hasTokens) {
      return;
    }

    setReaderState((prevState) => playReader(prevState));
  };

  const handleStopWpm = () => {
    setReaderState((prevState) => pauseReader(prevState));
  };

  useEffect(() => {
    if (!readerState.isPlaying) {
      setSessionStartMs(null);
      return;
    }

    setSessionStartMs(Date.now());
  }, [readerState.isPlaying]);

  useEffect(() => {
    if (!readerState.isPlaying) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSessionElapsedMs((prevMs) => prevMs + 1000);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [readerState.isPlaying]);

  const sessionElapsedSeconds = Math.floor(sessionElapsedMs / 1000);

  const handleDistractionToggle = () => {
    setIsDistractionFree((previousValue) => {
      const nextValue = !previousValue;
      try {
        localStorage.setItem(
          DISRACTION_FREE_STORAGE_KEY,
          String(nextValue)
        );
      } catch {
        // Ignore storage errors.
      }
      return nextValue;
    });
  };

  const handleHotkeysToggle = () => {
    setAreHotkeysEnabled((previousValue) => {
      const nextValue = !previousValue;
      try {
        localStorage.setItem(HOTKEYS_STORAGE_KEY, String(nextValue));
      } catch {
        // Ignore storage errors.
      }
      return nextValue;
    });
  };

  const updateThemeSetting = (nextTheme: typeof DEFAULT_THEME) => {
    setThemeSettings(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(nextTheme));
    } catch {
      // Ignore storage errors.
    }
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateThemeSetting({
      ...themeSettings,
      fontSize: event.target.value
    });
  };

  const handleFontFamilyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    updateThemeSetting({
      ...themeSettings,
      fontFamily: event.target.value
    });
  };

  const handleTextColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateThemeSetting({
      ...themeSettings,
      textColor: event.target.value
    });
  };

  const handleBackgroundColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateThemeSetting({
      ...themeSettings,
      backgroundColor: event.target.value
    });
  };

  const handleHighlightColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateThemeSetting({
      ...themeSettings,
      highlightColor: event.target.value
    });
  };

  const handleHighlightOutlineColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateThemeSetting({
      ...themeSettings,
      highlightOutlineColor: event.target.value
    });
  };

  const handleThemeReset = () => {
    updateThemeSetting(DEFAULT_THEME);
  };

  const handleThemePresetSelect = (preset: ThemePreset) => {
    updateThemeSetting({
      ...themeSettings,
      ...preset.theme
    });
  };

  const speedTestWordCount = useMemo(() => {
    return tokenizeText(SPEED_TEST_TEXT).length;
  }, []);

  const handleSpeedTestStart = () => {
    setSpeedTestStartMs(Date.now());
    setSpeedTestResult(null);
  };

  const handleSpeedTestFinish = () => {
    if (speedTestStartMs === null) {
      return;
    }

    const durationMs = Date.now() - speedTestStartMs;
    const wpm = computeWpmFromDuration(speedTestWordCount, durationMs);
    setSpeedTestResult(wpm);
    setSpeedTestStartMs(null);
  };

  const handleFullscreenToggle = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Ignore fullscreen errors.
    }
  };

  const handleWordFocusToggle = () => {
    setIsWordFocusMode((previousValue) => !previousValue);
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (!areHotkeysEnabled) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if (isEditable) {
        return;
      }

      if (!hasTokens && (event.key === " " || event.key === "Space")) {
        return;
      }

      if (event.key === " " || event.key === "Space") {
        event.preventDefault();
        handlePlayToggle();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setReaderState((prevState) => stepBack(prevState));
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setReaderState((prevState) => stepForward(prevState));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [areHotkeysEnabled, handlePlayToggle, hasTokens]);

  useEffect(() => {
    if (!readerState.isPlaying || !hasTokens) {
      return;
    }

    const intervalMs = wpmToIntervalMs(wpm);
    const intervalId = window.setInterval(() => {
      setReaderState((prevState) => stepForward(prevState));
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [readerState.isPlaying, hasTokens, wpm]);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFileError(null);
    setImportedFile(null);
    setImportStatus("idle");
    setIsPasteLocked(false);

    if (!selectedFile) {
      return;
    }

    const fileName = selectedFile.name.toLowerCase();
    const isSupportedType = SUPPORTED_FILE_TYPES.some((extension) =>
      fileName.endsWith(extension)
    );

    if (!isSupportedType) {
      setFileError("Only .pdf and .epub files are supported.");
      setImportStatus("error");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_UPLOAD_BYTES) {
      setFileError("File is too large. Max size is 10 MB.");
      setImportStatus("error");
      event.target.value = "";
      return;
    }

    assertCondition(selectedFile.size >= 0, "File size must be non-negative");
    if (fileName.endsWith(".pdf")) {
      setImportStatus("loading");
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        try {
          const arrayBuffer = fileReader.result as ArrayBuffer;
          const extractedText =
            await extractPdfTextFromArrayBuffer(arrayBuffer);

          if (!extractedText) {
            setFileError("No extractable text found in this PDF.");
            setImportStatus("error");
          } else {
            setInputText(extractedText);
            setImportedFile({
              fileName: selectedFile.name,
              fileType: "pdf",
              fileSizeBytes: selectedFile.size,
              extractedWordCount: tokenizeText(extractedText).length
            });
            setIsImportLocked(true);
            setImportStatus("success");
          }
        } catch {
          setFileError("Failed to extract text from the PDF.");
          setImportStatus("error");
        } finally {
          event.target.value = "";
        }
      };
      fileReader.onerror = () => {
        setFileError("Failed to read the PDF file.");
        setImportStatus("error");
        event.target.value = "";
      };
      fileReader.readAsArrayBuffer(selectedFile);
      return;
    }

    if (fileName.endsWith(".epub")) {
      setImportStatus("loading");
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        try {
          const arrayBuffer = fileReader.result as ArrayBuffer;
          const extractedText =
            await extractEpubTextFromArrayBuffer(arrayBuffer);

          if (!extractedText) {
            setFileError("No extractable text found in this EPUB.");
            setImportStatus("error");
          } else {
            setInputText(extractedText);
            setImportedFile({
              fileName: selectedFile.name,
              fileType: "epub",
              fileSizeBytes: selectedFile.size,
              extractedWordCount: tokenizeText(extractedText).length
            });
            setIsImportLocked(true);
            setImportStatus("success");
          }
        } catch {
          setFileError("Failed to extract text from the EPUB.");
          setImportStatus("error");
        } finally {
          event.target.value = "";
        }
      };
      fileReader.onerror = () => {
        setFileError("Failed to read the EPUB file.");
        setImportStatus("error");
        event.target.value = "";
      };
      fileReader.readAsArrayBuffer(selectedFile);
      return;
    }

    event.target.value = "";
  };

  const handlePasteText = () => {
    setIsPasteLocked(true);
    setIsImportLocked(false);
    setImportedFile(null);
    setImportStatus("idle");
  };

  const handleWpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value);
    if (!Number.isFinite(nextValue)) {
      return;
    }

    setWpm(clampWpm(nextValue));
  };

  const handleClearInput = () => {
    setInputText("");
    setIsPasteLocked(false);
    setIsImportLocked(false);
    setImportedFile(null);
    setImportStatus("idle");
    setFileError(null);
  };

  const handleSampleSelect = (text: string) => {
    setInputText(text);
    setIsPasteLocked(true);
    setIsImportLocked(false);
    setImportedFile(null);
    setImportStatus("idle");
    setFileError(null);
  };

  const handleSampleSourceSelect = async (sample: SampleSource) => {
    setSampleStatus("loading");
    setSampleError(null);

    try {
      const baseUrl = new URL(import.meta.env.BASE_URL ?? "/", window.location.origin);
      const sampleUrl = new URL(sample.url, baseUrl).toString();
      const response = await fetch(sampleUrl);
      if (!response.ok) {
        throw new Error("Failed to load sample text.");
      }

      const text = await response.text();
      if (!text.trim()) {
        throw new Error("Sample text was empty.");
      }

      handleSampleSelect(text);
      setSampleStatus("success");
    } catch (error) {
      setSampleStatus("error");
      setSampleError(
        error instanceof Error ? error.message : "Sample load failed."
      );
    }
  };

  const handleWikipediaLanguageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWikipediaLanguage(event.target.value.trim().toLowerCase());
  };

  const handleLoadWikipediaSample = async () => {
    if (!wikipediaLanguage) {
      return;
    }

    setSampleStatus("loading");
    setSampleError(null);

    try {
      const response = await fetch(
        `https://${wikipediaLanguage}.wikipedia.org/api/rest_v1/page/summary/Jellyfish`
      );

      if (!response.ok) {
        throw new Error("Failed to load Wikipedia sample.");
      }

      const data = (await response.json()) as { extract?: string };
      if (!data.extract) {
        throw new Error("No summary found for this language.");
      }

      handleSampleSelect(data.extract);
      setSampleStatus("success");
    } catch (error) {
      setSampleStatus("error");
      setSampleError(
        error instanceof Error ? error.message : "Sample load failed."
      );
    }
  };

  return (
    <main
      className={`app ${isDistractionFree ? "app--minimal" : ""} ${
        isWordFocusMode ? "app--word-focus" : ""
      }`}
      style={{
        color: themeSettings.textColor,
        backgroundColor: themeSettings.backgroundColor,
        fontSize: `${themeSettings.fontSize}px`,
        fontFamily: themeSettings.fontFamily
      }}
    >
      <div className="app__version" data-testid="app-version">
        v{APP_VERSION}
      </div>
      <header className="app__header">
        <h1>FastReader</h1>
        <p>Paste text to prepare it for RSVP playback.</p>
      </header>
      <div className="app__toggle">
        <button
          type="button"
          className="app__button"
          onClick={handleDistractionToggle}
          data-testid="distraction-toggle"
        >
          {isDistractionFree ? "Exit focus mode" : "Enter focus mode"}
        </button>
        <button
          type="button"
          className="app__button"
          onClick={handleHotkeysToggle}
          data-testid="hotkeys-toggle"
        >
          {areHotkeysEnabled ? "Disable hotkeys" : "Enable hotkeys"}
        </button>
        <button
          type="button"
          className="app__button"
          onClick={handleFullscreenToggle}
          data-testid="fullscreen-toggle"
        >
          {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        </button>
        <button
          type="button"
          className="app__button"
          onClick={handleWordFocusToggle}
          data-testid="word-focus-toggle"
        >
          {isWordFocusMode ? "Exit word focus" : "Focus current word"}
        </button>
      </div>
      {isWordFocusMode ? (
        <div className="app__focus-panel" data-testid="focus-panel">
          <div className="app__focus-info">WPM: {wpm}</div>
          <div className="app__focus-info">
            Time: {sessionElapsedSeconds}s
          </div>
          <input
            className="app__input"
            type="number"
            min={MIN_WPM}
            max={MAX_WPM}
            value={wpm}
            onChange={handleWpmChange}
            data-testid="focus-wpm-input"
          />
          <button
            type="button"
            className="app__button"
            onClick={handlePlayToggle}
            disabled={!hasTokens}
            data-testid="focus-play-toggle"
          >
            {readerState.isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      ) : null}
      <section className="app__section">
        <div className="app__samples" data-testid="sample-panel">
          <h2 className="app__subtitle">Sample texts</h2>
          <div className="app__controls">
            {SAMPLE_TEXTS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                className="app__button"
                onClick={() => handleSampleSelect(sample.text)}
                data-testid={`sample-${sample.id}`}
              >
                {sample.label}
              </button>
            ))}
          </div>
          <div className="app__samples-row">
            <h3 className="app__subtitle">Long reads (public domain)</h3>
            <div className="app__controls">
              {LONG_SAMPLE_SOURCES.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  className="app__button"
                  onClick={() => handleSampleSourceSelect(sample)}
                  data-testid={`sample-${sample.id}`}
                >
                  {sample.label} · {sample.description}
                </button>
              ))}
            </div>
          </div>
          <div className="app__controls app__samples-row">
            <input
              className="app__input"
              type="text"
              value={wikipediaLanguage}
              onChange={handleWikipediaLanguageChange}
              placeholder="Language code (e.g., en, es, pt)"
              data-testid="wikipedia-language"
            />
            <button
              type="button"
              className="app__button"
              onClick={handleLoadWikipediaSample}
              data-testid="wikipedia-sample"
            >
              Load Jellyfish (Wikipedia)
            </button>
          </div>
          <div className="app__meta" data-testid="sample-status">
            Sample status: {sampleStatus}
          </div>
          {sampleError ? (
            <div className="app__error" role="alert">
              {sampleError}
            </div>
          ) : null}
        </div>
        <div className="app__speed-test" data-testid="speed-test">
          <h2 className="app__subtitle">Reading speed test</h2>
          <p className="app__text">{SPEED_TEST_TEXT}</p>
          <div className="app__controls">
            <button
              type="button"
              className="app__button"
              onClick={handleSpeedTestStart}
              disabled={speedTestStartMs !== null}
              data-testid="speed-test-start"
            >
              Start test
            </button>
            <button
              type="button"
              className="app__button"
              onClick={handleSpeedTestFinish}
              disabled={speedTestStartMs === null}
              data-testid="speed-test-finish"
            >
              Finish test
            </button>
          </div>
          {speedTestResult !== null ? (
            <div className="app__meta" data-testid="speed-test-result">
              Estimated WPM: {speedTestResult}
            </div>
          ) : null}
        </div>
        <div className="app__theme" data-testid="theme-panel">
          <h2 className="app__subtitle">Theme presets</h2>
          <div className="app__theme-presets">
            {THEME_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="app__theme-card"
                onClick={() => handleThemePresetSelect(preset)}
                data-testid={`theme-${preset.id}`}
                aria-label={`${preset.label}: ${preset.description}`}
              >
                <div
                  className="app__theme-title"
                  style={{ fontFamily: preset.theme.fontFamily }}
                >
                  {preset.label}
                </div>
                <div className="app__theme-description">{preset.description}</div>
                <div className="app__theme-swatches">
                  {preset.swatches.map((color) => (
                    <span
                      key={color}
                      className="app__theme-swatch"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div
                  className="app__theme-font"
                  style={{ fontFamily: preset.theme.fontFamily }}
                >
                  {preset.theme.fontFamily}
                </div>
              </button>
            ))}
          </div>
          <label className="app__label" htmlFor="fontSize">
            Font size
          </label>
          <select
            id="fontSize"
            className="app__select"
            value={themeSettings.fontSize}
            onChange={handleFontSizeChange}
            data-testid="font-size-select"
          >
            {FONT_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
          <label className="app__label" htmlFor="fontFamily">
            Font family
          </label>
          <div
            className="app__font-preview"
            style={{ fontFamily: themeSettings.fontFamily }}
            data-testid="font-family-preview"
          >
            {themeSettings.fontFamily}
          </div>
          <select
            id="fontFamily"
            className="app__select"
            value={themeSettings.fontFamily}
            onChange={handleFontFamilyChange}
            data-testid="font-family-select"
          >
            {FONT_FAMILY_OPTIONS.map((family) => (
              <option key={family} value={family}>
                {family}
              </option>
            ))}
          </select>
          <div className="app__theme-row">
            <label className="app__label" htmlFor="textColor">
              Text color
            </label>
            <input
              id="textColor"
              className="app__color-input"
              type="color"
              value={themeSettings.textColor}
              onChange={handleTextColorChange}
              data-testid="text-color-input"
            />
          </div>
          <div className="app__theme-row">
            <label className="app__label" htmlFor="backgroundColor">
              Background color
            </label>
            <input
              id="backgroundColor"
              className="app__color-input"
              type="color"
              value={themeSettings.backgroundColor}
              onChange={handleBackgroundColorChange}
              data-testid="background-color-input"
            />
          </div>
          <div className="app__theme-row">
            <label className="app__label" htmlFor="highlightColor">
              Highlight color
            </label>
            <input
              id="highlightColor"
              className="app__color-input"
              type="color"
              value={themeSettings.highlightColor}
              onChange={handleHighlightColorChange}
              data-testid="highlight-color-input"
            />
          </div>
          <div className="app__theme-row">
            <label className="app__label" htmlFor="highlightOutlineColor">
              Highlight outline color
            </label>
            <input
              id="highlightOutlineColor"
              className="app__color-input"
              type="color"
              value={themeSettings.highlightOutlineColor}
              onChange={handleHighlightOutlineColorChange}
              data-testid="highlight-outline-color-input"
            />
          </div>
          <button
            type="button"
            className="app__button"
            onClick={handleThemeReset}
            data-testid="theme-reset"
          >
            Reset theme
          </button>
        </div>
        <label className="app__label" htmlFor="inputText">
          Input text
        </label>
        <textarea
          id="inputText"
          className="app__textarea"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          rows={10}
          disabled={isImportLocked}
        />
        <div className="app__meta">Words: {tokenCount}</div>
        <div className="app__controls">
          <button
            type="button"
            className="app__button"
            onClick={handlePasteText}
            data-testid="paste-toggle"
            disabled={isPasteLocked}
          >
            Use pasted text
          </button>
          <button
            type="button"
            className="app__button"
            onClick={handleClearInput}
            data-testid="clear-text"
          >
            Clear text
          </button>
        </div>
        <div className="app__wpm">
          <label className="app__label" htmlFor="wpmInput">
            Words per minute
          </label>
          <div className="app__controls">
            <input
              id="wpmInput"
              className="app__input"
              type="number"
              min={MIN_WPM}
              max={MAX_WPM}
              value={wpm}
              onChange={handleWpmChange}
              data-testid="wpm-input"
            />
            <button
              type="button"
              className="app__button"
              onClick={handleStartWpm}
              disabled={!hasTokens}
              data-testid="wpm-start"
            >
              Start at WPM
            </button>
          </div>
        </div>
        <div className="app__upload">
          <label className="app__label" htmlFor="fileUpload">
            Upload PDF or EPUB
          </label>
          <input
            id="fileUpload"
            className="app__file-input"
            type="file"
            accept={SUPPORTED_FILE_TYPES.join(",")}
            onChange={handleFileSelection}
            data-testid="file-input"
            disabled={isPasteLocked}
          />
          <div className="app__import-status" data-testid="import-status">
            Import status: {importStatus}
          </div>
          {importedFile ? (
            <div className="app__file-meta" data-testid="file-metadata">
              <div>File: {importedFile.fileName}</div>
              <div>Type: {importedFile.fileType}</div>
              <div>Size: {importedFile.fileSizeBytes} bytes</div>
              <div>Extracted words: {importedFile.extractedWordCount}</div>
            </div>
          ) : null}
          {fileError ? (
            <div className="app__error" role="alert">
              {fileError}
            </div>
          ) : null}
        </div>
        <div className="app__controls">
          <button
            type="button"
            className="app__button"
            onClick={() => setReaderState((prevState) => stepBack(prevState))}
            disabled={!hasTokens}
            data-testid="back-button"
          >
            Back
          </button>
          <button
            type="button"
            className="app__button"
            onClick={handlePlayToggle}
            disabled={!hasTokens}
            data-testid="play-toggle"
          >
            {readerState.isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            className="app__button"
            onClick={() => setReaderState((prevState) => stepForward(prevState))}
            disabled={!hasTokens}
            data-testid="next-button"
          >
            Next
          </button>
        </div>
        <div className="app__status" data-testid="playback-status">
          Status: {statusLabel}
        </div>
        <div className="app__progress" data-testid="progress-status">
          Progress: {progress.percent}% ({progress.currentIndex}/{progress.totalWords})
        </div>
        <div className="app__word" data-testid="current-word">
          {hasTokens ? (
            currentWord ? (
              <>
                <span>{highlightedWord.leading}</span>
                <span
                  className="app__word-focus"
                  style={{
                    color: themeSettings.highlightColor,
                    textShadow: `-1px -1px 0 ${themeSettings.highlightOutlineColor}, 1px -1px 0 ${themeSettings.highlightOutlineColor}, -1px 1px 0 ${themeSettings.highlightOutlineColor}, 1px 1px 0 ${themeSettings.highlightOutlineColor}`
                  }}
                >
                  {highlightedWord.focus}
                </span>
                <span>{highlightedWord.trailing}</span>
              </>
            ) : (
              "End"
            )
          ) : (
            "None"
          )}
        </div>
      </section>
    </main>
  );
}
