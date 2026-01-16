# FastReader

FastReader is a speed-reading web app that presents text using RSVP (rapid serial visual presentation). It supports pasted text, PDF/EPUB import, WPM playback, focus mode, and customization.

## Features
- RSVP playback with WPM controls and auto-advance
- Focus mode with large current word and WPM controls
- PDF and EPUB local text extraction
- Reading speed test
- Theme customization (font family, size, colors, highlight)
- Hotkeys and fullscreen support
- Sample text loader (including Wikipedia Jellyfish summary)

## Getting Started

Install dependencies:
```
npm install
```

Start the dev server:
```
npm run dev
```

Run tests:
```
npm run test
```

## Deployment (GitHub Pages)
This repo includes a GitHub Actions workflow that builds and deploys to GitHub Pages on pushes to `main`.

To enable Pages:
1) Go to `Settings → Pages`
2) Set **Source** to **GitHub Actions**

The site will be available at:
`https://bandeiracaio.github.io/FastReader/`
