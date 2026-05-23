import type { ThemePreset, ThemeSettings } from "../types";

export const FONT_SIZE_OPTIONS = ["14", "16", "18", "20", "24"] as const;
export const FONT_FAMILY_OPTIONS = [
  "system-ui",
  "Georgia, serif",
  "\"Times New Roman\", serif",
  "Arial, sans-serif",
  "\"Trebuchet MS\", sans-serif",
  "Verdana, sans-serif"
] as const;

export const DEFAULT_THEME: ThemeSettings = {
  fontSize: "16",
  fontFamily: "system-ui",
  textColor: "#1f2937",
  backgroundColor: "#ffffff",
  highlightColor: "#8b0000",
  highlightOutlineColor: "#ffffff"
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "midnight-blue",
    label: "Midnight Blue",
    description: "High-contrast dark mode with electric blue accents.",
    theme: { fontFamily: "system-ui", textColor: "#ffffff", backgroundColor: "#1a237e", highlightColor: "#448aff", highlightOutlineColor: "#2979ff" },
    swatches: ["#1a237e", "#448aff", "#2979ff", "#ffffff"]
  },
  {
    id: "sunset-orange",
    label: "Sunset Orange",
    description: "Warm, bright palette for energetic reading sessions.",
    theme: { fontFamily: "Georgia, serif", textColor: "#3e2723", backgroundColor: "#fff3e0", highlightColor: "#ff5722", highlightOutlineColor: "#e64a19" },
    swatches: ["#fff3e0", "#ff5722", "#e64a19", "#3e2723"]
  },
  {
    id: "digital-lavender",
    label: "Digital Lavender",
    description: "Soft lavender tones with a crisp, modern contrast.",
    theme: { fontFamily: "\"Trebuchet MS\", sans-serif", textColor: "#4a148c", backgroundColor: "#fff0f6", highlightColor: "#b39ddb", highlightOutlineColor: "#9575cd" },
    swatches: ["#fff0f6", "#b39ddb", "#9575cd", "#4a148c"]
  },
  {
    id: "earth-neutrals",
    label: "Earth Neutrals",
    description: "Muted neutrals with a warm, grounded feel.",
    theme: { fontFamily: "\"Times New Roman\", serif", textColor: "#3e2723", backgroundColor: "#efebe9", highlightColor: "#8d6e63", highlightOutlineColor: "#6d4c41" },
    swatches: ["#efebe9", "#8d6e63", "#6d4c41", "#3e2723"]
  },
  {
    id: "high-contrast-dark",
    label: "High-Contrast Dark",
    description: "Bold cyan highlights on a deep charcoal backdrop.",
    theme: { fontFamily: "Arial, sans-serif", textColor: "#eeeeee", backgroundColor: "#212121", highlightColor: "#00e5ff", highlightOutlineColor: "#00b8d4" },
    swatches: ["#212121", "#00e5ff", "#00b8d4", "#eeeeee"]
  },
  {
    id: "solarized-dark",
    label: "Solarized Dark",
    description: "Low-contrast dark scheme with warm accents.",
    theme: { fontFamily: "system-ui", textColor: "#839496", backgroundColor: "#002b36", highlightColor: "#b58900", highlightOutlineColor: "#cb4b16" },
    swatches: ["#002b36", "#839496", "#b58900", "#cb4b16"]
  },
  {
    id: "dracula",
    label: "Dracula",
    description: "High-contrast dark palette with neon highlights.",
    theme: { fontFamily: "\"Trebuchet MS\", sans-serif", textColor: "#f8f8f2", backgroundColor: "#21222c", highlightColor: "#815cd6", highlightOutlineColor: "#de5735" },
    swatches: ["#21222c", "#f8f8f2", "#815cd6", "#de5735"]
  },
  {
    id: "gruvbox-dark",
    label: "Gruvbox Dark",
    description: "Muted earth tones with classic contrast.",
    theme: { fontFamily: "\"Times New Roman\", serif", textColor: "#ebdbb2", backgroundColor: "#282828", highlightColor: "#d79921", highlightOutlineColor: "#cc241d" },
    swatches: ["#282828", "#ebdbb2", "#d79921", "#cc241d"]
  },
  {
    id: "arctic-mint",
    label: "Arctic Mint",
    description: "Cool mint highlights on a crisp icy base.",
    theme: { fontFamily: "Arial, sans-serif", textColor: "#0f172a", backgroundColor: "#f0fdfa", highlightColor: "#0ea5e9", highlightOutlineColor: "#22d3ee" },
    swatches: ["#f0fdfa", "#0ea5e9", "#22d3ee", "#0f172a"]
  },
  {
    id: "copper-ink",
    label: "Copper Ink",
    description: "Dark ink with copper accents for high clarity.",
    theme: { fontFamily: "\"Times New Roman\", serif", textColor: "#1f2937", backgroundColor: "#fff8f1", highlightColor: "#b45309", highlightOutlineColor: "#fef3c7" },
    swatches: ["#fff8f1", "#b45309", "#fef3c7", "#1f2937"]
  },
  {
    id: "desert-sand",
    label: "Desert Sand",
    description: "Warm sand base with amber highlights.",
    theme: { fontFamily: "Georgia, serif", textColor: "#4b2e2e", backgroundColor: "#fff7ed", highlightColor: "#f97316", highlightOutlineColor: "#fed7aa" },
    swatches: ["#fff7ed", "#f97316", "#fed7aa", "#4b2e2e"]
  },
  {
    id: "forest-pine",
    label: "Forest Pine",
    description: "Deep greens with a calm, natural feel.",
    theme: { fontFamily: "Verdana, sans-serif", textColor: "#ecfdf3", backgroundColor: "#0f2a1d", highlightColor: "#22c55e", highlightOutlineColor: "#86efac" },
    swatches: ["#0f2a1d", "#22c55e", "#86efac", "#ecfdf3"]
  },
  {
    id: "monochrome-slate",
    label: "Monochrome Slate",
    description: "Neutral slate tones with sharp contrast.",
    theme: { fontFamily: "system-ui", textColor: "#0f172a", backgroundColor: "#e2e8f0", highlightColor: "#334155", highlightOutlineColor: "#f8fafc" },
    swatches: ["#e2e8f0", "#334155", "#f8fafc", "#0f172a"]
  },
  {
    id: "sakura-blush",
    label: "Sakura Blush",
    description: "Soft pinks with deep plum accents.",
    theme: { fontFamily: "\"Trebuchet MS\", sans-serif", textColor: "#4c1d3d", backgroundColor: "#fff1f2", highlightColor: "#ec4899", highlightOutlineColor: "#fbcfe8" },
    swatches: ["#fff1f2", "#ec4899", "#fbcfe8", "#4c1d3d"]
  },
  {
    id: "midnight-plum",
    label: "Midnight Plum",
    description: "Velvety dark purple with bright highlights.",
    theme: { fontFamily: "\"Trebuchet MS\", sans-serif", textColor: "#f5f3ff", backgroundColor: "#2e1065", highlightColor: "#a855f7", highlightOutlineColor: "#fbcfe8" },
    swatches: ["#2e1065", "#a855f7", "#fbcfe8", "#f5f3ff"]
  },
  {
    id: "nord-light",
    label: "Nord Light",
    description: "Cool gray blues with bright accents.",
    theme: { fontFamily: "system-ui", textColor: "#2e3440", backgroundColor: "#eceff4", highlightColor: "#5e81ac", highlightOutlineColor: "#88c0d0" },
    swatches: ["#eceff4", "#5e81ac", "#88c0d0", "#2e3440"]
  },
  {
    id: "cobalt-night",
    label: "Cobalt Night",
    description: "Cobalt blues with high-contrast text.",
    theme: { fontFamily: "Arial, sans-serif", textColor: "#e2e8f0", backgroundColor: "#0f172a", highlightColor: "#38bdf8", highlightOutlineColor: "#f8fafc" },
    swatches: ["#0f172a", "#38bdf8", "#f8fafc", "#e2e8f0"]
  },
  {
    id: "paperback",
    label: "Paperback",
    description: "Soft paper tone with graphite text.",
    theme: { fontFamily: "\"Times New Roman\", serif", textColor: "#2d2a26", backgroundColor: "#faf3e0", highlightColor: "#b91c1c", highlightOutlineColor: "#ffffff" },
    swatches: ["#faf3e0", "#b91c1c", "#ffffff", "#2d2a26"]
  },
  {
    id: "olive-studio",
    label: "Olive Studio",
    description: "Muted olive palette with warm highlights.",
    theme: { fontFamily: "Verdana, sans-serif", textColor: "#1f2a1f", backgroundColor: "#f6f7f2", highlightColor: "#6b8e23", highlightOutlineColor: "#d9f99d" },
    swatches: ["#f6f7f2", "#6b8e23", "#d9f99d", "#1f2a1f"]
  }
];
