# FastReader Parallel Build Prompts (ALWAYS USE context7 when necessary)

## Context7 Compliance (applies to all prompts)
- Before using any external library or framework API, query Context7 for the exact library and version.
- Capture a short note with the Context7 source and version used for the change.
- If Context7 has no relevant docs, record that and use official upstream documentation instead.

## Master Prompts

1) **Master 01 — Slice Planning**
Define the smallest vertical slice for `<feature>`. List:
- user-facing behavior
- affected files
- risks and edge cases
Keep scope to one slice only.

2) **Master 02 — Tests First**
Write failing tests for `<feature slice>` before implementation. Include:
- unit tests for pure logic
- integration tests for UI + state
- explicit edge cases

3) **Master 03 — Implement to Pass**
Implement `<feature slice>` so the new tests pass. Preserve existing structures. No unrelated refactors.

4) **Master 04 — Harden and Verify**
Add error handling, assertions, and privacy constraints for `<feature slice>`. Add/extend tests to cover new paths.

5) **Master 05 — Performance Guard**
Identify the hot path in `<feature slice>`, optimize safely, and add a regression test or timing guard.

6) **Master 06 — Regression Sweep**
Add regression tests for any risky behavior or bug discovered during the slice. Keep scope limited.

## Mini Prompts

7) **Mini 01 — UI Control**
Add UI control for `<control name>` and wire it to state. Add unit + integration tests for visibility and interaction.

8) **Mini 02 — State Transition**
Add state transition for `<event>` → `<new state>`. Add assertions for invalid transitions. Test it.

9) **Mini 03 — Tokenization**
Implement/adjust tokenization for `<input type>`. Cover punctuation, whitespace, and empty input. Test it.

10) **Mini 04 — WPM Timing**
Implement WPM interval calculation and timer scheduling. Add unit tests for min/max WPM bounds.

11) **Mini 05 — RSVP Playback**
Implement play/pause/step for RSVP. Add tests for:
- pause preserves index
- step bounds
- finish state

12) **Mini 06 — Progress**
Compute progress (percent + index). Add tests for start, mid, and end.

13) **Mini 07 — Highlighting**
Apply highlight style to word segments. Add tests for style toggles and readability defaults.

14) **Mini 08 — Theme Settings**
Implement font and color settings, including reset. Add tests for persistence and defaults.

15) **Mini 09 — Hotkeys**
Wire hotkeys to actions. Add tests for enabled/disabled behavior.

16) **Mini 10 — Distraction-Free Mode**
Implement minimal UI mode. Add tests for visibility toggles and persistence.

17) **Mini 11 — File Upload Control**
Add `.pdf` and `.epub` file input. Validate type and size. Add tests for accept/reject.

18) **Mini 12 — PDF Text Extraction**
Implement local PDF text extraction. Handle no-text PDFs with clear messaging. Add tests for empty results.

19) **Mini 13 — EPUB Text Extraction**
Implement local EPUB text extraction. Handle malformed archives. Add tests for error paths.

20) **Mini 14 — Import Status**
Add import status (`idle/loading/success/error`) and metadata. Add tests for status transitions and UI display.

21) **Mini 15 — Input Replace**
On successful import, replace input text and reset reader state. Add tests for index reset and progress reset.

22) **Mini 16 — Privacy Guard**
Ensure imported text never leaves local memory. Add tests to verify no network calls.

23) **Mini 17 — Accessibility**
Add keyboard-only navigation for core actions. Add tests for focus order and shortcut availability.

24) **Mini 18 — Error Messaging**
Standardize user-facing errors. Add tests for each error scenario.

25) **Mini 19 — Fullscreen Reader**
Implement fullscreen view for RSVP display. Add tests for toggling and consistent state.

26) **Mini 20 — Reading Speed Test**
Implement speed test flow and apply result to WPM. Add tests for accuracy and state update.
