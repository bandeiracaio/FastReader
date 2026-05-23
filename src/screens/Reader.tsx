import type { ReaderState } from "../lib/readerState";
import { getHighlightParts } from "../lib/highlight";
import { MAX_WPM, MIN_WPM } from "../lib/wpm";
import type { ChapterOption, SampleSource, ThemeSettings } from "../types";
import { QUICK_DEMO_TEXT } from "../data/samples";

const MINUTES_DISPLAY_PRECISION = 0;
const CONTEXT_WINDOW = 6;
export const MIN_WORD_FONT_SIZE = 32;
export const MAX_WORD_FONT_SIZE = 160;

type Props = {
  inputText: string;
  tokens: string[];
  maxLeadingLength: number;
  readerState: ReaderState;
  wpm: number;
  sessionElapsedMs: number;
  isWordFocusMode: boolean;
  isImmersiveMode: boolean;
  areHotkeysEnabled: boolean;
  themeSettings: ThemeSettings;
  chapterOptions: ChapterOption[];
  selectedChapterId: string;
  loadedBookTitle: string | null;
  featuredSamples: SampleSource[];
  sampleLoadingId: string | null;
  wordFontSize: number;
  onTextChange: (text: string) => void;
  onChangeText: () => void;
  onChapterChange: (id: string) => void;
  onPlayToggle: () => void;
  onBack: () => void;
  onNext: () => void;
  onScrub: (index: number) => void;
  onWpmChange: (wpm: number) => void;
  onWordFocusToggle: () => void;
  onImmersiveModeToggle: () => void;
  onHotkeysToggle: () => void;
  onNavigateToLibrary: () => void;
  onSampleSelect: (sample: SampleSource) => void;
  onWordFontSizeChange: (size: number) => void;
};

export default function Reader({
  inputText,
  tokens,
  maxLeadingLength,
  readerState,
  wpm,
  sessionElapsedMs,
  isWordFocusMode,
  isImmersiveMode,
  areHotkeysEnabled,
  themeSettings,
  chapterOptions,
  selectedChapterId,
  loadedBookTitle,
  featuredSamples,
  sampleLoadingId,
  wordFontSize,
  onTextChange,
  onChangeText,
  onChapterChange,
  onPlayToggle,
  onBack,
  onNext,
  onScrub,
  onWpmChange,
  onWordFocusToggle,
  onImmersiveModeToggle,
  onHotkeysToggle,
  onNavigateToLibrary,
  onSampleSelect,
  onWordFontSizeChange,
}: Props) {
  const tokenCount = tokens.length;
  const hasTokens = tokenCount > 0;
  const currentIndex = readerState.currentIndex;
  const currentWord = tokens[currentIndex] ?? "";
  const highlightedWord = getHighlightParts(currentWord);

  const progressPercent = tokenCount > 0 ? Math.round((currentIndex / tokenCount) * 100) : 0;
  const remainingWords = Math.max(tokenCount - currentIndex, 0);
  const remainingMinutes = hasTokens ? remainingWords / Math.max(wpm, 1) : 0;
  const remainingLabel = `${remainingMinutes.toFixed(MINUTES_DISPLAY_PRECISION)} min left`;

  const elapsedSeconds = Math.floor(sessionElapsedMs / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedSecondsRemainder = elapsedSeconds % 60;
  const elapsedLabel = `${elapsedMinutes}:${String(elapsedSecondsRemainder).padStart(2, "0")}`;

  const wordStyle = {
    ["--orp-leading-width" as string]: `${maxLeadingLength}ch`,
    fontSize: `${wordFontSize}px`,
  };

  const focusLetterStyle = {
    color: themeSettings.highlightColor,
    textShadow: `-1px -1px 0 ${themeSettings.highlightOutlineColor}, 1px -1px 0 ${themeSettings.highlightOutlineColor}, -1px 1px 0 ${themeSettings.highlightOutlineColor}, 1px 1px 0 ${themeSettings.highlightOutlineColor}`
  };

  const contextStart = Math.max(0, currentIndex - CONTEXT_WINDOW);
  const contextEnd = Math.min(tokenCount, currentIndex + CONTEXT_WINDOW + 1);
  const contextTokens = tokens.slice(contextStart, contextEnd);
  const contextCurrentIdx = currentIndex - contextStart;

  const wordDisplay = currentWord ? (
    <div className="reader__word" style={wordStyle}>
      <div className="reader__word-inner">
        <span className="reader__word-leading">{highlightedWord.leading}</span>
        <span className="reader__word-focus" style={focusLetterStyle}>
          {highlightedWord.focus}
        </span>
        <span className="reader__word-trailing">{highlightedWord.trailing}</span>
      </div>
    </div>
  ) : (
    <div className="reader__word reader__word--end" style={{ fontSize: `${wordFontSize}px` }}>End</div>
  );

  if (isImmersiveMode && hasTokens) {
    return (
      <div className="screen reader reader--immersive" onClick={onPlayToggle}>
        {wordDisplay}
        <button
          type="button"
          className="reader__immersive-exit"
          onClick={(e) => { e.stopPropagation(); onImmersiveModeToggle(); }}
          aria-label="Exit immersive mode"
        >
          Exit
        </button>
      </div>
    );
  }

  return (
    <div className={`screen reader${isWordFocusMode ? " reader--word-focus" : ""}`}>
      {chapterOptions.length > 0 && !isWordFocusMode ? (
        <div className="reader__chapter-row">
          <label className="reader__chapter-label" htmlFor="chapterSelect">Chapter</label>
          <select
            id="chapterSelect"
            className="reader__chapter-select"
            value={selectedChapterId}
            onChange={(e) => onChapterChange(e.target.value)}
            data-testid="chapter-select"
          >
            <option value="full">Full book</option>
            {chapterOptions.map((ch) => (
              <option key={ch.id} value={ch.id}>{ch.label}</option>
            ))}
          </select>
        </div>
      ) : null}

      {hasTokens && !isWordFocusMode ? (
        <div className="reader__context" aria-hidden="true">
          {contextTokens.map((token, i) => (
            <span
              key={contextStart + i}
              className={i === contextCurrentIdx ? "reader__context-current" : "reader__context-word"}
            >
              {token}{i < contextTokens.length - 1 ? " " : ""}
            </span>
          ))}
        </div>
      ) : null}

      <div className="reader__stage" data-testid="current-word">
        {hasTokens ? wordDisplay : (
          <div className="reader__empty">
            <p className="reader__empty-heading">What do you want to read?</p>
            {featuredSamples.length > 0 ? (
              <div className="reader__empty-featured">
                {featuredSamples.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    className="reader__empty-book"
                    onClick={() => onSampleSelect(sample)}
                    disabled={sampleLoadingId === sample.id}
                  >
                    <span className="reader__empty-book-title">
                      {sampleLoadingId === sample.id ? "Loading…" : sample.label}
                    </span>
                    <span className="reader__empty-book-desc">{sample.description}</span>
                  </button>
                ))}
              </div>
            ) : null}
            <div className="reader__empty-actions">
              <button type="button" className="btn" onClick={onNavigateToLibrary}>
                Browse Library
              </button>
              <span className="reader__empty-or">or paste text below ↓</span>
            </div>
          </div>
        )}
      </div>

      {loadedBookTitle && hasTokens ? (
        <div className="reader__reading-title" aria-label="Currently reading">
          {loadedBookTitle}
        </div>
      ) : null}

      <div className="reader__scrubber-row" data-testid="progress-status">
        <input
          type="range"
          className="reader__scrubber"
          min={0}
          max={Math.max(tokenCount - 1, 0)}
          value={Math.min(currentIndex, Math.max(tokenCount - 1, 0))}
          onChange={(e) => onScrub(Number(e.target.value))}
          disabled={!hasTokens}
          aria-label="Reading progress"
        />
        <span className="reader__progress-label">
          {currentIndex.toLocaleString()} / {tokenCount.toLocaleString()} words · {progressPercent}%
        </span>
      </div>

      <div className="reader__controls">
        <button
          type="button"
          className="btn reader__step-btn"
          onClick={onBack}
          disabled={!hasTokens}
          data-testid="back-button"
          aria-label="Step back"
        >
          ←
        </button>
        <button
          type="button"
          className="btn reader__play-btn"
          onClick={onPlayToggle}
          disabled={!hasTokens}
          data-testid="play-toggle"
          aria-label={readerState.isPlaying ? "Pause" : "Play"}
        >
          {readerState.isPlaying ? "❚❚" : "▶"}
        </button>
        <button
          type="button"
          className="btn reader__step-btn"
          onClick={onNext}
          disabled={!hasTokens}
          data-testid="next-button"
          aria-label="Step forward"
        >
          →
        </button>
        <div className="reader__wpm-group">
          <input
            type="number"
            className="reader__wpm-input"
            min={MIN_WPM}
            max={MAX_WPM}
            value={wpm}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (Number.isFinite(v)) onWpmChange(v);
            }}
            data-testid="wpm-input"
            aria-label="Words per minute"
          />
          <span className="reader__wpm-label">WPM</span>
        </div>
      </div>

      {hasTokens ? (
        <div className="reader__stats" data-testid="playback-status">
          <span>{readerState.isPlaying ? "Playing" : "Paused"}</span>
          <span className="reader__stats-sep">·</span>
          <span>{elapsedLabel} elapsed</span>
          {remainingWords > 0 ? (
            <>
              <span className="reader__stats-sep">·</span>
              <span>{remainingLabel}</span>
            </>
          ) : null}
        </div>
      ) : null}

      <div className="reader__toggles">
        <button
          type="button"
          className={`btn btn--small${isWordFocusMode ? " btn--active" : ""}`}
          onClick={onWordFocusToggle}
          data-testid="word-focus-toggle"
        >
          {isWordFocusMode ? "Exit word focus" : "Word focus"}
        </button>
        <button
          type="button"
          className="btn btn--small"
          onClick={onImmersiveModeToggle}
          disabled={!hasTokens}
          data-testid="immersive-toggle"
        >
          Immersive
        </button>
        <button
          type="button"
          className={`btn btn--small${areHotkeysEnabled ? " btn--active" : ""}`}
          onClick={onHotkeysToggle}
          data-testid="hotkeys-toggle"
        >
          {areHotkeysEnabled ? "Hotkeys on" : "Hotkeys off"}
        </button>
        <div className="reader__font-size-group">
          <button
            type="button"
            className="btn btn--small"
            onClick={() => onWordFontSizeChange(wordFontSize - 8)}
            disabled={wordFontSize <= MIN_WORD_FONT_SIZE}
            aria-label="Decrease word size"
          >
            A−
          </button>
          <button
            type="button"
            className="btn btn--small"
            onClick={() => onWordFontSizeChange(wordFontSize + 8)}
            disabled={wordFontSize >= MAX_WORD_FONT_SIZE}
            aria-label="Increase word size"
          >
            A+
          </button>
        </div>
      </div>

      {areHotkeysEnabled ? (
        <div className="reader__hotkey-hints">
          <kbd>Space</kbd> play / pause
          <span className="reader__hotkey-sep" />
          <kbd>←</kbd> <kbd>→</kbd> step word
          <span className="reader__hotkey-sep" />
          <kbd>+</kbd> <kbd>−</kbd> speed
        </div>
      ) : null}

      {!isWordFocusMode ? (
        <div className="reader__paste-section">
          {loadedBookTitle ? (
            <div className="reader__book-card">
              <div className="reader__book-card-info">
                <span className="reader__book-card-title">{loadedBookTitle}</span>
                <span className="reader__book-card-meta">
                  {tokenCount.toLocaleString()} words
                  {chapterOptions.length > 0 ? ` · ${chapterOptions.length} chapters` : ""}
                </span>
              </div>
              <button
                type="button"
                className="btn btn--small"
                onClick={onChangeText}
                data-testid="clear-text"
              >
                Change
              </button>
            </div>
          ) : (
            <>
              <label className="reader__paste-label" htmlFor="inputText">
                Paste text
              </label>
              <textarea
                id="inputText"
                className="reader__textarea"
                value={inputText}
                onChange={(e) => onTextChange(e.target.value)}
                rows={8}
                placeholder="Paste any text here to read it…"
              />
              <div className="reader__paste-meta">
                <span>{tokenCount.toLocaleString()} words</span>
                {inputText.trim() ? (
                  <button
                    type="button"
                    className="btn btn--small"
                    onClick={() => onTextChange("")}
                    data-testid="clear-text"
                  >
                    Clear
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn--small"
                    onClick={() => onTextChange(QUICK_DEMO_TEXT)}
                    data-testid="sample-quick-demo"
                  >
                    Quick demo
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
