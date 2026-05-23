import { useCallback, useEffect, useMemo, useState } from "react";
import { computeProgress } from "./lib/progress";
import {
  createReaderState,
  pauseReader,
  playReader,
  stepBack,
  stepForward,
  type ReaderState,
} from "./lib/readerState";
import { getHighlightParts } from "./lib/highlight";
import { clampWpm } from "./lib/wpm";
import { tokenizeText } from "./lib/tokenize";
import { wordDelayMs } from "./lib/pacing";
import { loadHistory, upsertHistory, type HistoryEntry } from "./lib/history";
import { loadGutenbergBook } from "./lib/gutenberg";
import { DEFAULT_THEME } from "./data/themes";
import { LONG_SAMPLE_CATEGORIES } from "./data/samples";
import type { ChapterOption, SampleSource, Screen, ThemePreset, ThemeSettings } from "./types";
import Reader from "./screens/Reader";
import Library from "./screens/Library";
import Settings from "./screens/Settings";

const HOTKEYS_STORAGE_KEY = "fastreader:hotkeys-enabled";
const THEME_STORAGE_KEY = "fastreader:theme-settings";
const APP_VERSION = __APP_VERSION__;
const DEFAULT_WPM = 300;

const extractChapters = (text: string): ChapterOption[] => {
  const matches = Array.from(text.matchAll(/^\s*chapter\s+[^\n]+/gim));
  if (matches.length < 2) return [];
  return matches
    .map((match, index) => {
      const startIndex = match.index ?? 0;
      const endIndex = matches[index + 1]?.index ?? text.length;
      const chapterText = text.slice(startIndex, endIndex).trim();
      return { id: `chapter-${index + 1}`, label: match[0].trim(), text: chapterText };
    })
    .filter((ch) => ch.text.length > 0);
};

function positionKey(text: string): string {
  return `fastreader:pos:${text.length}:${text.slice(0, 64)}`;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("reader");
  const [inputText, setInputText] = useState("");
  const [readerState, setReaderState] = useState<ReaderState>(() => createReaderState(0));
  const [wpm, setWpm] = useState(DEFAULT_WPM);
  const [isWordFocusMode, setIsWordFocusMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionElapsedMs, setSessionElapsedMs] = useState(0);
  const [loadedSampleText, setLoadedSampleText] = useState<string | null>(null);
  const [chapterOptions, setChapterOptions] = useState<ChapterOption[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState("full");
  const [loadedBookTitle, setLoadedBookTitle] = useState<string | null>(null);
  const [loadedBookSource, setLoadedBookSource] = useState<{ gutenbergId?: number; sampleId?: string } | null>(null);
  const [sampleLoadingId, setSampleLoadingId] = useState<string | null>(null);
  const [sampleError, setSampleError] = useState<string | null>(null);
  const [readingHistory, setReadingHistory] = useState<HistoryEntry[]>(() => loadHistory());
  const [areHotkeysEnabled, setAreHotkeysEnabled] = useState(() => {
    try { return localStorage.getItem(HOTKEYS_STORAGE_KEY) !== "false"; } catch { return true; }
  });
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored ? (JSON.parse(stored) as ThemeSettings) : DEFAULT_THEME;
    } catch { return DEFAULT_THEME; }
  });

  const tokens = useMemo(() => tokenizeText(inputText), [inputText]);
  const tokenCount = tokens.length;
  const hasTokens = tokenCount > 0;

  const maxLeadingLength = useMemo(() => {
    if (tokens.length === 0) return 0;
    return tokens.reduce((max, token) => {
      const parts = getHighlightParts(token);
      return Math.max(max, parts.leading.length);
    }, 0);
  }, [tokens]);

  // Sync reader state when text changes
  useEffect(() => {
    setReaderState(createReaderState(tokenCount));
    setSessionElapsedMs(0);
  }, [tokenCount]);

  // Restore saved position when text changes
  useEffect(() => {
    if (!inputText.trim() || tokenCount === 0) return;
    try {
      const saved = localStorage.getItem(positionKey(inputText));
      if (saved) {
        const index = parseInt(saved, 10);
        if (index > 0 && index < tokenCount) {
          setReaderState((prev) => ({ ...prev, currentIndex: index }));
        }
      }
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  // Save position as reading progresses; keep history in sync
  useEffect(() => {
    if (!inputText.trim() || readerState.currentIndex === 0) return;
    try {
      localStorage.setItem(positionKey(inputText), String(readerState.currentIndex));
    } catch { /* ignore */ }
    if (loadedBookTitle && tokenCount > 0) {
      const next = upsertHistory({
        title: loadedBookTitle,
        wordCount: tokenCount,
        progress: readerState.currentIndex / tokenCount,
        lastReadAt: Date.now(),
        ...loadedBookSource ?? {},
      });
      setReadingHistory(next);
    }
  }, [inputText, readerState.currentIndex, loadedBookTitle, tokenCount, loadedBookSource]);

  // Playback — per-word timeout so each word can have its own delay
  useEffect(() => {
    if (!readerState.isPlaying || !hasTokens) return;
    const currentWord = tokens[readerState.currentIndex] ?? "";
    const ms = wordDelayMs(currentWord, wpm);
    const id = window.setTimeout(() => {
      setReaderState((prev) => stepForward(prev));
    }, ms);
    return () => window.clearTimeout(id);
  }, [readerState.isPlaying, hasTokens, wpm, readerState.currentIndex, tokens]);

  // Session elapsed timer
  useEffect(() => {
    if (!readerState.isPlaying) return;
    const id = window.setInterval(() => {
      setSessionElapsedMs((prev) => prev + 1000);
    }, 1000);
    return () => window.clearInterval(id);
  }, [readerState.isPlaying]);

  // Fullscreen change listener
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const handlePlayToggle = useCallback(() => {
    if (!hasTokens) return;
    setReaderState((prev) => (prev.isPlaying ? pauseReader(prev) : playReader(prev)));
  }, [hasTokens]);

  // Hotkeys
  useEffect(() => {
    if (!areHotkeysEnabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;
      if (isEditable) return;
      if (e.key === " " || e.key === "Space") {
        e.preventDefault();
        handlePlayToggle();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setReaderState((prev) => stepBack(prev));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setReaderState((prev) => stepForward(prev));
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setWpm((prev) => clampWpm(prev + 25));
      } else if (e.key === "-") {
        e.preventDefault();
        setWpm((prev) => clampWpm(prev - 25));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [areHotkeysEnabled, handlePlayToggle]);

  // Chapter selection effect
  useEffect(() => {
    if (!loadedSampleText) return;
    if (selectedChapterId === "full") {
      setInputText(loadedSampleText);
      return;
    }
    const chapters = chapterOptions.length > 0 ? chapterOptions : extractChapters(loadedSampleText);
    const selected = chapters.find((ch) => ch.id === selectedChapterId);
    if (selected) setInputText(selected.text);
  }, [chapterOptions, loadedSampleText, selectedChapterId]);

  const handleTextChange = (text: string) => {
    setInputText(text);
    setLoadedBookTitle(null);
    setLoadedBookSource(null);
    if (loadedSampleText) {
      setLoadedSampleText(null);
      setChapterOptions([]);
      setSelectedChapterId("full");
    }
  };

  const handleChangeText = () => {
    setInputText("");
    setLoadedBookTitle(null);
    setLoadedBookSource(null);
    setLoadedSampleText(null);
    setChapterOptions([]);
    setSelectedChapterId("full");
  };

  const handleBookLoad = (text: string, title: string, source?: { gutenbergId?: number; sampleId?: string }) => {
    const chapters = extractChapters(text);
    setLoadedSampleText(text);
    setLoadedBookTitle(title);
    setLoadedBookSource(source ?? null);
    setChapterOptions(chapters);
    setSelectedChapterId("full");
    setInputText(text);
    setSampleError(null);
    const next = upsertHistory({
      title,
      wordCount: tokenizeText(text).length,
      progress: 0,
      lastReadAt: Date.now(),
      ...source,
    });
    setReadingHistory(next);
  };

  const handleSampleSourceSelect = async (sample: SampleSource) => {
    setSampleLoadingId(sample.id);
    setSampleError(null);
    try {
      const baseUrl = new URL(import.meta.env.BASE_URL ?? "/", window.location.origin);
      const sampleUrl = new URL(sample.url, baseUrl).toString();
      const response = await fetch(sampleUrl);
      if (!response.ok) throw new Error("Failed to load sample.");
      const text = await response.text();
      if (!text.trim()) throw new Error("Sample was empty.");
      handleBookLoad(text, sample.label, { sampleId: sample.id });
    } catch (err) {
      setSampleError(err instanceof Error ? err.message : "Load failed.");
    } finally {
      setSampleLoadingId(null);
    }
  };

  const updateTheme = (next: ThemeSettings) => {
    setThemeSettings(next);
    try { localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const handleThemePresetSelect = (preset: ThemePreset) => {
    updateTheme({ ...themeSettings, ...preset.theme });
  };

  const handleThemeSettingChange = (patch: Partial<ThemeSettings>) => {
    updateTheme({ ...themeSettings, ...patch });
  };

  const handleFullscreenToggle = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch { /* ignore */ }
  };

  const handleHotkeysToggle = () => {
    setAreHotkeysEnabled((prev) => {
      const next = !prev;
      try { localStorage.setItem(HOTKEYS_STORAGE_KEY, String(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const handleScrub = (index: number) => {
    setReaderState((prev) => ({ ...prev, currentIndex: index, isPlaying: false }));
  };

  const handleResumeFromHistory = useCallback(async (entry: HistoryEntry) => {
    if (entry.gutenbergId != null) {
      setSampleLoadingId(`history:${entry.title}`);
      setSampleError(null);
      try {
        const text = await loadGutenbergBook(entry.gutenbergId);
        handleBookLoad(text, entry.title, { gutenbergId: entry.gutenbergId });
        setScreen("reader");
      } catch (err) {
        setSampleError(err instanceof Error ? err.message : "Load failed.");
      } finally {
        setSampleLoadingId(null);
      }
    } else if (entry.sampleId != null) {
      const sample = LONG_SAMPLE_CATEGORIES.flatMap((c) => c.samples).find((s) => s.id === entry.sampleId);
      if (sample) {
        await handleSampleSourceSelect(sample);
        setScreen("reader");
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = computeProgress(readerState.currentIndex, tokenCount);
  void progress;

  return (
    <div
      className="app"
      style={{
        color: themeSettings.textColor,
        backgroundColor: themeSettings.backgroundColor,
        fontSize: `${themeSettings.fontSize}px`,
        fontFamily: themeSettings.fontFamily
      }}
    >
      <nav className="nav">
        <span className="nav__brand">FastReader</span>
        <div className="nav__links">
          {(["reader", "library", "settings"] as Screen[]).map((s) => (
            <button
              key={s}
              type="button"
              className={`nav__link${screen === s ? " nav__link--active" : ""}`}
              onClick={() => setScreen(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <span className="nav__version" data-testid="app-version">v{APP_VERSION}</span>
      </nav>

      {screen === "reader" ? (
        <Reader
          inputText={inputText}
          tokens={tokens}
          maxLeadingLength={maxLeadingLength}
          readerState={readerState}
          wpm={wpm}
          sessionElapsedMs={sessionElapsedMs}
          isWordFocusMode={isWordFocusMode}
          isFullscreen={isFullscreen}
          areHotkeysEnabled={areHotkeysEnabled}
          themeSettings={themeSettings}
          chapterOptions={chapterOptions}
          selectedChapterId={selectedChapterId}
          loadedBookTitle={loadedBookTitle}
          featuredSamples={LONG_SAMPLE_CATEGORIES.flatMap((c) => c.samples).slice(0, 3)}
          sampleLoadingId={sampleLoadingId}
          onTextChange={handleTextChange}
          onChangeText={handleChangeText}
          onSampleSelect={handleSampleSourceSelect}
          onChapterChange={(id) => setSelectedChapterId(id)}
          onPlayToggle={handlePlayToggle}
          onBack={() => setReaderState((prev) => stepBack(prev))}
          onNext={() => setReaderState((prev) => stepForward(prev))}
          onScrub={handleScrub}
          onWpmChange={(v) => setWpm(clampWpm(v))}
          onWordFocusToggle={() => setIsWordFocusMode((prev) => !prev)}
          onFullscreenToggle={handleFullscreenToggle}
          onHotkeysToggle={handleHotkeysToggle}
          onNavigateToLibrary={() => setScreen("library")}
        />
      ) : screen === "library" ? (
        <Library
          sampleCategories={LONG_SAMPLE_CATEGORIES}
          onBookLoad={(text, title, gutenbergId) => handleBookLoad(text, title, gutenbergId != null ? { gutenbergId } : undefined)}
          onNavigateToReader={() => setScreen("reader")}
          onSampleSourceSelect={handleSampleSourceSelect}
          sampleLoadingId={sampleLoadingId}
          sampleError={sampleError}
          readingHistory={readingHistory}
          onResumeFromHistory={handleResumeFromHistory}
        />
      ) : (
        <Settings
          themeSettings={themeSettings}
          onThemePresetSelect={handleThemePresetSelect}
          onThemeSettingChange={handleThemeSettingChange}
          onReset={() => updateTheme(DEFAULT_THEME)}
        />
      )}
    </div>
  );
}
