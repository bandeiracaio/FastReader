# FastReader Spec (SwiftRead-style)

## Source Reference
- SwiftRead marketing site for product scope and core capabilities: https://swiftread.com/

## Product Summary
FastReader is a free, rapid serial visual presentation (RSVP) speed-reading app. It displays one word (or a small chunk) at a time to reduce inefficient eye movement and subvocalization, with a distraction-free reading experience. Users control reading speed (words per minute), play/pause, and display customization, including how letters/words are highlighted, fonts, colors, and hotkeys.

## Goals
- Enable readers to finish text significantly faster while maintaining comprehension.
- Provide a distraction-free, configurable RSVP reading experience.
- Support a wide range of real-world text sources via copy-paste and file import.

## Non-Goals
- No user accounts, payments, or subscriptions in v1.
- No cloud sync or cross-device state in v1.
- No claims about specific speed improvements beyond what the user experiences.

## Target Users
- Students and professionals who read large volumes of text.
- Readers who want a focused, low-distraction interface.

## Functional Requirements

### 1) Text Input
- Provide a text area that accepts copy-paste input.
- Allow users to clear and replace input text quickly.
- Show character and word count for the input text.
- Input supports common pasted formats from:
  - News, email, online course text
  - Documents and eBooks (including PDF/ePub/Kindle Cloud Reader text)
  - Google Docs and Microsoft Word (pasted text)

### 2) File Import (PDF/EPUB)
- Allow users to upload local `.pdf` and `.epub` files.
- Extract readable text from files locally without uploading content.
- Show import status (loading, success, error) and file metadata:
  - File name, file type, file size, and extracted word count.
- Allow users to remove the imported file and revert to text input.
- If the file contains no extractable text, show a clear message and keep input empty.
- Maintain existing privacy guarantees for imported files.

### 3) RSVP Reader
- Display words sequentially at a configurable pace (words per minute).
- Provide play, pause, and restart controls.
- Allow step forward/backward by word or small chunk.
- Maintain the current position when paused.
- Indicate reading progress (percent and/or word index).
- Handle end-of-text state clearly (e.g., “Finished” indicator).

### 4) Speed Control
- Users can set a target words-per-minute (WPM).
- Provide fine-grained WPM adjustment (e.g., slider and +/- buttons).
- WPM changes apply immediately during playback.

### 5) Highlighting and Focus
- Allow highlighting of specific letters or word segments to improve recognition.
- Provide presets for highlight styles and allow custom toggle on/off.
- Ensure highlight styling does not reduce readability.

### 6) Appearance Customization
- Users can customize:
  - Font family and size
  - Text color and background color
  - Word emphasis style (e.g., bolding selected letters)
- Provide a reset-to-default option.

### 7) Hotkeys
- Provide keyboard shortcuts for:
  - Play/Pause
  - Speed up / slow down
  - Step forward / backward
  - Restart
- Display hotkeys in UI and allow disabling.

### 8) Distraction-Free Mode
- Offer a minimal UI mode that hides non-essential controls.
- Persist the mode preference in settings.

### 9) Reading Speed Test (Optional Module)
- Provide a reading speed test flow to estimate baseline WPM.
- Result can prefill the WPM setting.

## Non-Functional Requirements

### Performance
- Word display timing must be consistent and stable at the chosen WPM.
- Tokenization and reader setup should be near-instant for typical paste sizes.

### Accessibility
- Support keyboard-only operation.
- Provide sufficient contrast options via theme controls.
- Respect system text scaling where possible.

### Security & Privacy
- All text stays local in the browser/application memory.
- No text is transmitted or logged by default.

### Reliability
- Reader state is resilient to temporary UI changes (e.g., settings toggles).
- Errors in parsing or display should fail gracefully without losing text.

## Data Model and State

### Core Types
- `ReaderText`
  - `rawText: string`
  - `tokens: string[]`
  - `totalWords: number`
- `ImportedFile`
  - `fileName: string`
  - `fileType: "pdf" | "epub"`
  - `fileSizeBytes: number`
  - `extractedText: string`
- `ReaderState`
  - `currentIndex: number`
  - `isPlaying: boolean`
  - `wpm: number`
  - `progress: number`
  - `importStatus: "idle" | "loading" | "success" | "error"`
- `DisplaySettings`
  - `fontFamily: string`
  - `fontSizePx: number`
  - `textColor: string`
  - `backgroundColor: string`
  - `highlightStyle: string`
  - `highlightEnabled: boolean`
- `HotkeySettings`
  - `enabled: boolean`
  - `bindings: Record<string, string>`
- `UserPreferences`
  - `display: DisplaySettings`
  - `hotkeys: HotkeySettings`
  - `distractionFree: boolean`

### State Transitions
- `loadText` → tokenize → set `currentIndex = 0`, `progress = 0`.
- `play` → start timer based on WPM.
- `pause` → stop timer, preserve `currentIndex`.
- `stepForward`/`stepBack` → adjust index with bounds checks.
- `finish` → stop timer, set `isPlaying = false`, show completion state.

## UI Flow and Screens

1) **Landing / Reader Home**
- Text input area
- File upload control (.pdf, .epub)
- WPM controls
- Play/Pause and navigation
- Preview of current word

2) **Reader Fullscreen**
- Large word display
- Minimal controls
- Progress indicator

3) **Settings Panel**
- Fonts, colors, highlight styles
- Hotkeys configuration
- Distraction-free toggle
- Reset defaults

4) **Reading Speed Test (Optional)**
- Timed passage with questions or completion measurement
- Save suggested WPM to settings

## Edge Cases
- Empty input text → disable play and show guidance.
- Very short text → finish state after a few steps.
- WPM set to extremely low/high values → clamp to safe range.
- Pasted text with multiple spaces or line breaks → normalize during tokenization.
- Unsupported file type or corrupted file → show error and do not overwrite existing text.
- PDF without a text layer → show a "no extractable text" message.

## Assertions
- Assert `tokens.length > 0` before starting playback.
- Assert `currentIndex` stays within `[0, tokens.length]`.
- Assert WPM is within allowed bounds.
- Assert uploaded file type is `pdf` or `epub` before parsing.
- Assert import status transitions only through allowed states.

## Testing Notes
- Unit tests:
  - Tokenization handles punctuation and line breaks.
  - WPM to interval conversion is accurate.
  - Reader state transitions are correct.
  - PDF and EPUB parsers return empty string when no text is available.
- Integration tests:
  - Playback flow with play/pause/finish.
  - Hotkey triggers in focused and fullscreen modes.
  - Distraction-free UI toggle persistence.
  - File upload replaces reader input and updates progress.