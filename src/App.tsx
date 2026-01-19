import { useCallback, useEffect, useMemo, useState } from "react";
import { computeProgress } from "./lib/progress";
import {
  createReaderState,
  pauseReader,
  playReader,
  stepBack,
  stepForward
} from "./lib/readerState";
import { getHighlightParts } from "./lib/highlight";
import { clampWpm, MAX_WPM, MIN_WPM, wpmToIntervalMs } from "./lib/wpm";
import { tokenizeText } from "./lib/tokenize";

const DEFAULT_SAMPLE_TEXT =
  "FastReader will display words one at a time for focused reading.";
const DISRACTION_FREE_STORAGE_KEY = "fastreader:distraction-free";
const HOTKEYS_STORAGE_KEY = "fastreader:hotkeys-enabled";
const THEME_STORAGE_KEY = "fastreader:theme-settings";
const MINUTES_DISPLAY_PRECISION = 0;

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
  highlightColor: "#8b0000",
  highlightOutlineColor: "#ffffff"
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
  },
  {
    id: "solarized-dark",
    label: "Solarized Dark",
    description: "Low-contrast dark scheme with warm accents.",
    theme: {
      fontFamily: "system-ui",
      textColor: "#839496",
      backgroundColor: "#002b36",
      highlightColor: "#b58900",
      highlightOutlineColor: "#cb4b16"
    },
    swatches: ["#002b36", "#839496", "#b58900", "#cb4b16"]
  },
  {
    id: "dracula",
    label: "Dracula",
    description: "High-contrast dark palette with neon highlights.",
    theme: {
      fontFamily: "\"Trebuchet MS\", sans-serif",
      textColor: "#f8f8f2",
      backgroundColor: "#21222c",
      highlightColor: "#815cd6",
      highlightOutlineColor: "#de5735"
    },
    swatches: ["#21222c", "#f8f8f2", "#815cd6", "#de5735"]
  },
  {
    id: "gruvbox-dark",
    label: "Gruvbox Dark",
    description: "Muted earth tones with classic contrast.",
    theme: {
      fontFamily: "\"Times New Roman\", serif",
      textColor: "#ebdbb2",
      backgroundColor: "#282828",
      highlightColor: "#d79921",
      highlightOutlineColor: "#cc241d"
    },
    swatches: ["#282828", "#ebdbb2", "#d79921", "#cc241d"]
  },
  {
    id: "arctic-mint",
    label: "Arctic Mint",
    description: "Cool mint highlights on a crisp icy base.",
    theme: {
      fontFamily: "Arial, sans-serif",
      textColor: "#0f172a",
      backgroundColor: "#f0fdfa",
      highlightColor: "#0ea5e9",
      highlightOutlineColor: "#22d3ee"
    },
    swatches: ["#f0fdfa", "#0ea5e9", "#22d3ee", "#0f172a"]
  },
  {
    id: "copper-ink",
    label: "Copper Ink",
    description: "Dark ink with copper accents for high clarity.",
    theme: {
      fontFamily: "\"Times New Roman\", serif",
      textColor: "#1f2937",
      backgroundColor: "#fff8f1",
      highlightColor: "#b45309",
      highlightOutlineColor: "#fef3c7"
    },
    swatches: ["#fff8f1", "#b45309", "#fef3c7", "#1f2937"]
  },
  {
    id: "desert-sand",
    label: "Desert Sand",
    description: "Warm sand base with amber highlights.",
    theme: {
      fontFamily: "Georgia, serif",
      textColor: "#4b2e2e",
      backgroundColor: "#fff7ed",
      highlightColor: "#f97316",
      highlightOutlineColor: "#fed7aa"
    },
    swatches: ["#fff7ed", "#f97316", "#fed7aa", "#4b2e2e"]
  },
  {
    id: "forest-pine",
    label: "Forest Pine",
    description: "Deep greens with a calm, natural feel.",
    theme: {
      fontFamily: "Verdana, sans-serif",
      textColor: "#ecfdf3",
      backgroundColor: "#0f2a1d",
      highlightColor: "#22c55e",
      highlightOutlineColor: "#86efac"
    },
    swatches: ["#0f2a1d", "#22c55e", "#86efac", "#ecfdf3"]
  },
  {
    id: "monochrome-slate",
    label: "Monochrome Slate",
    description: "Neutral slate tones with sharp contrast.",
    theme: {
      fontFamily: "system-ui",
      textColor: "#0f172a",
      backgroundColor: "#e2e8f0",
      highlightColor: "#334155",
      highlightOutlineColor: "#f8fafc"
    },
    swatches: ["#e2e8f0", "#334155", "#f8fafc", "#0f172a"]
  },
  {
    id: "sakura-blush",
    label: "Sakura Blush",
    description: "Soft pinks with deep plum accents.",
    theme: {
      fontFamily: "\"Trebuchet MS\", sans-serif",
      textColor: "#4c1d3d",
      backgroundColor: "#fff1f2",
      highlightColor: "#ec4899",
      highlightOutlineColor: "#fbcfe8"
    },
    swatches: ["#fff1f2", "#ec4899", "#fbcfe8", "#4c1d3d"]
  },
  {
    id: "midnight-plum",
    label: "Midnight Plum",
    description: "Velvety dark purple with bright highlights.",
    theme: {
      fontFamily: "\"Trebuchet MS\", sans-serif",
      textColor: "#f5f3ff",
      backgroundColor: "#2e1065",
      highlightColor: "#a855f7",
      highlightOutlineColor: "#fbcfe8"
    },
    swatches: ["#2e1065", "#a855f7", "#fbcfe8", "#f5f3ff"]
  },
  {
    id: "nord-light",
    label: "Nord Light",
    description: "Cool gray blues with bright accents.",
    theme: {
      fontFamily: "system-ui",
      textColor: "#2e3440",
      backgroundColor: "#eceff4",
      highlightColor: "#5e81ac",
      highlightOutlineColor: "#88c0d0"
    },
    swatches: ["#eceff4", "#5e81ac", "#88c0d0", "#2e3440"]
  },
  {
    id: "cobalt-night",
    label: "Cobalt Night",
    description: "Cobalt blues with high-contrast text.",
    theme: {
      fontFamily: "Arial, sans-serif",
      textColor: "#e2e8f0",
      backgroundColor: "#0f172a",
      highlightColor: "#38bdf8",
      highlightOutlineColor: "#f8fafc"
    },
    swatches: ["#0f172a", "#38bdf8", "#f8fafc", "#e2e8f0"]
  },
  {
    id: "paperback",
    label: "Paperback",
    description: "Soft paper tone with graphite text.",
    theme: {
      fontFamily: "\"Times New Roman\", serif",
      textColor: "#2d2a26",
      backgroundColor: "#faf3e0",
      highlightColor: "#b91c1c",
      highlightOutlineColor: "#ffffff"
    },
    swatches: ["#faf3e0", "#b91c1c", "#ffffff", "#2d2a26"]
  },
  {
    id: "olive-studio",
    label: "Olive Studio",
    description: "Muted olive palette with warm highlights.",
    theme: {
      fontFamily: "Verdana, sans-serif",
      textColor: "#1f2a1f",
      backgroundColor: "#f6f7f2",
      highlightColor: "#6b8e23",
      highlightOutlineColor: "#d9f99d"
    },
    swatches: ["#f6f7f2", "#6b8e23", "#d9f99d", "#1f2a1f"]
  }
];
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
type SampleCategory = {
  id: string;
  label: string;
  description: string;
  samples: SampleSource[];
};
type ChapterOption = {
  id: string;
  label: string;
  text: string;
};
const QUICK_DEMO_SENTENCE =
  "Focus on each word, keep a steady rhythm, and let your eyes stay relaxed as the words appear in sequence.";
const QUICK_DEMO_REPEAT_COUNT = 50;
const QUICK_DEMO_TEXT = Array.from(
  { length: QUICK_DEMO_REPEAT_COUNT },
  () => QUICK_DEMO_SENTENCE
).join(" ");
const SAMPLE_TEXTS: SampleText[] = [
  {
    id: "quick-demo",
    label: "Quick demo",
    text: QUICK_DEMO_TEXT
  }
];
const LONG_SAMPLE_CATEGORIES: SampleCategory[] = [
  {
    id: "english-classics",
    label: "English Classics",
    description: "Victorian, gothic, and adventure staples.",
    samples: [
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
      },
      {
        id: "great-expectations",
        label: "Great Expectations",
        description: "Charles Dickens",
        url: "samples/great-expectations.txt"
      },
      {
        id: "little-women",
        label: "Little Women",
        description: "Louisa May Alcott",
        url: "samples/little-women.txt"
      },
      {
        id: "jane-eyre",
        label: "Jane Eyre",
        description: "Charlotte Brontë",
        url: "samples/jane-eyre.txt"
      },
      {
        id: "treasure-island",
        label: "Treasure Island",
        description: "Robert Louis Stevenson",
        url: "samples/treasure-island.txt"
      },
      {
        id: "call-of-the-wild",
        label: "The Call of the Wild",
        description: "Jack London",
        url: "samples/call-of-the-wild.txt"
      },
      {
        id: "scarlet-letter",
        label: "The Scarlet Letter",
        description: "Nathaniel Hawthorne",
        url: "samples/scarlet-letter.txt"
      }
    ]
  },
  {
    id: "russian-classics",
    label: "Russian Classics",
    description: "Epic novels and realist masterpieces.",
    samples: [
      {
        id: "war-and-peace",
        label: "War and Peace",
        description: "Leo Tolstoy",
        url: "samples/war-and-peace.txt"
      },
      {
        id: "anna-karenina",
        label: "Anna Karenina",
        description: "Leo Tolstoy",
        url: "samples/anna-karenina.txt"
      },
      {
        id: "crime-and-punishment",
        label: "Crime and Punishment",
        description: "Fyodor Dostoevsky",
        url: "samples/crime-and-punishment.txt"
      },
      {
        id: "brothers-karamazov",
        label: "The Brothers Karamazov",
        description: "Fyodor Dostoevsky",
        url: "samples/brothers-karamazov.txt"
      },
      {
        id: "dead-souls",
        label: "Dead Souls",
        description: "Nikolai Gogol",
        url: "samples/dead-souls.txt"
      },
      {
        id: "fathers-and-sons",
        label: "Fathers and Sons",
        description: "Ivan Turgenev",
        url: "samples/fathers-and-sons.txt"
      },
      {
        id: "the-idiot",
        label: "The Idiot",
        description: "Fyodor Dostoevsky",
        url: "samples/the-idiot.txt"
      },
      {
        id: "notes-from-underground",
        label: "Notes from Underground",
        description: "Fyodor Dostoevsky",
        url: "samples/notes-from-underground.txt"
      },
      {
        id: "demons",
        label: "Demons",
        description: "Fyodor Dostoevsky",
        url: "samples/demons.txt"
      },
      {
        id: "house-of-the-dead",
        label: "The House of the Dead",
        description: "Fyodor Dostoevsky",
        url: "samples/house-of-the-dead.txt"
      },
      {
        id: "eugene-onegin",
        label: "Eugene Onegin",
        description: "Alexander Pushkin",
        url: "samples/eugene-onegin.txt"
      },
      {
        id: "chekhov-duel-stories",
        label: "The Duel and Other Stories",
        description: "Anton Chekhov",
        url: "samples/chekhov-duel-stories.txt"
      }
    ]
  },
  {
    id: "socialist-literature",
    label: "Socialist & Communist",
    description: "Political essays and utopian classics.",
    samples: [
      {
        id: "communist-manifesto",
        label: "The Communist Manifesto",
        description: "Karl Marx & Friedrich Engels",
        url: "samples/communist-manifesto.txt"
      },
      {
        id: "conquest-of-bread",
        label: "The Conquest of Bread",
        description: "Peter Kropotkin",
        url: "samples/conquest-of-bread.txt"
      },
      {
        id: "state-and-revolution",
        label: "The State and Revolution",
        description: "Vladimir Lenin",
        url: "samples/state-and-revolution.txt"
      },
      {
        id: "looking-backward",
        label: "Looking Backward",
        description: "Edward Bellamy",
        url: "samples/looking-backward.txt"
      },
      {
        id: "utopian-and-scientific",
        label: "Socialism: Utopian and Scientific",
        description: "Friedrich Engels",
        url: "samples/utopian-and-scientific.txt"
      },
      {
        id: "working-class-england",
        label: "The Condition of the Working Class in England",
        description: "Friedrich Engels",
        url: "samples/working-class-england.txt"
      },
      {
        id: "soul-of-man-under-socialism",
        label: "The Soul of Man Under Socialism",
        description: "Oscar Wilde",
        url: "samples/soul-of-man-under-socialism.txt"
      },
      {
        id: "letter-to-american-workingmen",
        label: "A Letter to American Workingmen",
        description: "Vladimir Lenin",
        url: "samples/letter-to-american-workingmen.txt"
      }
    ]
  },
  {
    id: "victorian-social",
    label: "Victorian Social Novels",
    description: "Industrial Britain and social reform classics.",
    samples: [
      {
        id: "victorian-hard-times",
        label: "Hard Times",
        description: "Charles Dickens",
        url: "samples/hard-times.txt"
      },
      {
        id: "victorian-north-south",
        label: "North and South",
        description: "Elizabeth Gaskell",
        url: "samples/north-and-south.txt"
      }
    ]
  },
  {
    id: "gothic-romantic",
    label: "Gothic & Romantic",
    description: "Dark, atmospheric tales and romantic classics.",
    samples: [
      {
        id: "gothic-frankenstein",
        label: "Frankenstein",
        description: "Mary Shelley",
        url: "samples/frankenstein.txt"
      },
      {
        id: "gothic-dracula",
        label: "Dracula",
        description: "Bram Stoker",
        url: "samples/dracula.txt"
      }
    ]
  },
  {
    id: "french-classics",
    label: "French Classics",
    description: "Epic French novels and literary pillars.",
    samples: [
      {
        id: "french-les-miserables",
        label: "Les Misérables",
        description: "Victor Hugo",
        url: "samples/les-miserables.txt"
      },
      {
        id: "french-monte-cristo",
        label: "The Count of Monte Cristo",
        description: "Alexandre Dumas",
        url: "samples/count-of-monte-cristo.txt"
      }
    ]
  },
  {
    id: "ancient-classics",
    label: "Ancient Classics",
    description: "Foundational epics from the ancient world.",
    samples: [
      {
        id: "ancient-iliad",
        label: "The Iliad",
        description: "Homer",
        url: "samples/iliad.txt"
      },
      {
        id: "ancient-odyssey",
        label: "The Odyssey",
        description: "Homer",
        url: "samples/odyssey.txt"
      }
    ]
  },
  {
    id: "philosophy-essays",
    label: "Philosophy & Essays",
    description: "Timeless reflections and political thought.",
    samples: [
      {
        id: "philosophy-meditations",
        label: "Meditations",
        description: "Marcus Aurelius",
        url: "samples/meditations.txt"
      },
      {
        id: "philosophy-on-liberty",
        label: "On Liberty",
        description: "John Stuart Mill",
        url: "samples/on-liberty.txt"
      }
    ]
  },
  {
    id: "transcendentalists",
    label: "American Transcendentalists",
    description: "Nature, self-reliance, and the inner life.",
    samples: [
      {
        id: "transcendental-walden",
        label: "Walden",
        description: "Henry David Thoreau",
        url: "samples/walden.txt"
      },
      {
        id: "transcendental-self-reliance",
        label: "Self-Reliance",
        description: "Ralph Waldo Emerson",
        url: "samples/self-reliance.txt"
      }
    ]
  },
  {
    id: "sci-fi-speculative",
    label: "Sci-Fi & Speculative",
    description: "Classic visions of science and the future.",
    samples: [
      {
        id: "sci-fi-time-machine",
        label: "The Time Machine",
        description: "H. G. Wells",
        url: "samples/time-machine.txt"
      },
      {
        id: "sci-fi-war-of-worlds",
        label: "The War of the Worlds",
        description: "H. G. Wells",
        url: "samples/war-of-worlds.txt"
      }
    ]
  },
  {
    id: "adventure-sea",
    label: "Adventure & Sea Tales",
    description: "Voyages, treasure hunts, and life at sea.",
    samples: [
      {
        id: "adventure-treasure-island",
        label: "Treasure Island",
        description: "Robert Louis Stevenson",
        url: "samples/treasure-island.txt"
      },
      {
        id: "adventure-moby-dick",
        label: "Moby-Dick",
        description: "Herman Melville",
        url: "samples/moby-dick.txt"
      }
    ]
  },
  {
    id: "poetry-collections",
    label: "Poetry Collections",
    description: "Landmark poetry volumes and anthologies.",
    samples: [
      {
        id: "poetry-leaves-of-grass",
        label: "Leaves of Grass",
        description: "Walt Whitman",
        url: "samples/leaves-of-grass.txt"
      },
      {
        id: "poetry-emily-dickinson",
        label: "Poems of Emily Dickinson",
        description: "Emily Dickinson",
        url: "samples/emily-dickinson-poems.txt"
      }
    ]
  },
  {
    id: "plays-drama",
    label: "Plays & Drama",
    description: "Stage classics and dramatic works.",
    samples: [
      {
        id: "plays-hamlet",
        label: "Hamlet",
        description: "William Shakespeare",
        url: "samples/hamlet.txt"
      },
      {
        id: "plays-importance-earnest",
        label: "The Importance of Being Earnest",
        description: "Oscar Wilde",
        url: "samples/importance-of-being-earnest.txt"
      }
    ]
  }
];
const DEFAULT_GUTENBERG_ID = "1342";

const extractChapters = (text: string): ChapterOption[] => {
  const matches = Array.from(
    text.matchAll(/^\s*chapter\s+[^\n]+/gim)
  );

  if (matches.length < 2) {
    return [];
  }

  return matches
    .map((match, index) => {
      const startIndex = match.index ?? 0;
      const endIndex = matches[index + 1]?.index ?? text.length;
      const chapterText = text.slice(startIndex, endIndex).trim();
      return {
        id: `chapter-${index + 1}`,
        label: match[0].trim(),
        text: chapterText
      };
    })
    .filter((chapter) => chapter.text.length > 0);
};

export default function App() {
  const [inputText, setInputText] = useState(DEFAULT_SAMPLE_TEXT);
  const [readerState, setReaderState] = useState(() => createReaderState(0));
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPasteLocked, setIsPasteLocked] = useState(false);
  const [wpm, setWpm] = useState(DEFAULT_WPM);
  const [isWordFocusMode, setIsWordFocusMode] = useState(false);
  const [sessionElapsedMs, setSessionElapsedMs] = useState(0);
  const [gutenbergBookId, setGutenbergBookId] = useState(
    DEFAULT_GUTENBERG_ID
  );
  const [loadedSampleText, setLoadedSampleText] = useState<string | null>(null);
  const [chapterOptions, setChapterOptions] = useState<ChapterOption[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState("full");
  const [sampleStatus, setSampleStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [sampleError, setSampleError] = useState<string | null>(null);
  const [expandedSampleCategoryIds, setExpandedSampleCategoryIds] = useState<
    string[]
  >(() => []);
  const [isRemainingTimeVisible, setIsRemainingTimeVisible] = useState(true);

  const tokens = useMemo(() => {
    return tokenizeText(inputText);
  }, [inputText]);

  const maxLeadingLength = useMemo(() => {
    if (tokens.length === 0) {
      return 0;
    }

    return tokens.reduce((maxLength, token) => {
      const parts = getHighlightParts(token);
      return Math.max(maxLength, parts.leading.length);
    }, 0);
  }, [tokens]);

  const tokenCount = tokens.length;
  const hasTokens = tokenCount > 0;
  const progress = computeProgress(readerState.currentIndex, tokenCount);
  const remainingWordCount = Math.max(
    tokenCount - readerState.currentIndex,
    0
  );
  const remainingMinutes = hasTokens
    ? remainingWordCount / Math.max(wpm, 1)
    : 0;
  const remainingMinutesLabel = `${remainingMinutes.toFixed(
    MINUTES_DISPLAY_PRECISION
  )} min`;

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

  const handlePasteText = () => {
    setIsPasteLocked(true);
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
  };

  const handleSampleSelect = (text: string) => {
    setInputText(text);
    setIsPasteLocked(true);
    setLoadedSampleText(text);
    setChapterOptions(extractChapters(text));
    setSelectedChapterId("full");
  };

  const handleChapterSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedChapterId(event.target.value);
  };

  useEffect(() => {
    if (!loadedSampleText) {
      return;
    }

    if (selectedChapterId === "full") {
      setInputText(loadedSampleText);
      return;
    }

    const sourceChapters =
      chapterOptions.length > 0
        ? chapterOptions
        : extractChapters(loadedSampleText);
    const selectedChapter = sourceChapters.find(
      (chapter) => chapter.id === selectedChapterId
    );
    if (selectedChapter) {
      setInputText(selectedChapter.text);
    }
  }, [chapterOptions, loadedSampleText, selectedChapterId]);

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

  const handleGutenbergIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGutenbergBookId(event.target.value.trim());
  };

  const handleLoadGutenbergSample = async () => {
    const normalizedId = gutenbergBookId.replace(/[^0-9]/g, "");
    if (!normalizedId) {
      setSampleStatus("error");
      setSampleError("Enter a valid Gutenberg book ID.");
      return;
    }

    setSampleStatus("loading");
    setSampleError(null);

    try {
      const proxyUrl = `https://r.jina.ai/http://www.gutenberg.org/cache/epub/${normalizedId}/pg${normalizedId}.txt`;
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error("Failed to load Gutenberg book.");
      }

      const text = await response.text();
      if (!text.trim()) {
        throw new Error("Gutenberg book was empty.");
      }

      handleSampleSelect(text);
      setSampleStatus("success");
    } catch (error) {
      setSampleStatus("error");
      setSampleError(
        error instanceof Error ? error.message : "Gutenberg load failed."
      );
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    if (loadedSampleText) {
      setLoadedSampleText(null);
      setChapterOptions([]);
      setSelectedChapterId("full");
    }
  };

  const handleSampleCategoryToggle = (categoryId: string) => {
    setExpandedSampleCategoryIds((previousIds) => {
      if (previousIds.includes(categoryId)) {
        return previousIds.filter((id) => id !== categoryId);
      }
      return [...previousIds, categoryId];
    });
  };

  const handleRemainingTimeToggle = () => {
    setIsRemainingTimeVisible((previousValue) => !previousValue);
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
      <div className="app__toggle-help">
        <p className="app__meta">
          Focus mode hides setup panels so you can concentrate on the current
          word.
        </p>
        <p className="app__meta">
          Hotkeys let you control playback with the keyboard (space to play or
          pause, arrows to step).
        </p>
      </div>
      {isWordFocusMode ? (
        <div className="app__focus-panel" data-testid="focus-panel">
          <div className="app__focus-info">WPM: {wpm}</div>
          <div className="app__focus-info">
            Time: {sessionElapsedSeconds}s
          </div>
          {isRemainingTimeVisible ? (
            <div className="app__focus-info" data-testid="focus-remaining-time">
              Remaining: {remainingMinutesLabel}
            </div>
          ) : null}
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
          <button
            type="button"
            className="app__button app__button--compact"
            onClick={handleRemainingTimeToggle}
            data-testid="focus-remaining-toggle"
          >
            {isRemainingTimeVisible ? "Hide time" : "Show time"}
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
          {LONG_SAMPLE_CATEGORIES.map((category) => {
            const isExpanded = expandedSampleCategoryIds.includes(category.id);
            return (
              <div key={category.id} className="app__samples-category">
                <div className="app__samples-header">
                  <div>
                    <h3 className="app__subtitle">
                      {category.label} ({category.samples.length})
                    </h3>
                    <div className="app__meta">{category.description}</div>
                  </div>
                  <button
                    type="button"
                    className="app__button app__button--compact"
                    onClick={() => handleSampleCategoryToggle(category.id)}
                    aria-expanded={isExpanded}
                    data-testid={`sample-category-${category.id}`}
                  >
                    {isExpanded ? "Collapse" : "Expand"}
                  </button>
                </div>
                {isExpanded ? (
                  <div className="app__controls">
                    {category.samples.map((sample) => (
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
                ) : null}
              </div>
            );
          })}
          <div className="app__controls app__samples-row">
            <input
              className="app__input"
              type="text"
              value={gutenbergBookId}
              onChange={handleGutenbergIdChange}
              placeholder="Gutenberg book ID (e.g., 1342)"
              data-testid="gutenberg-id"
            />
            <button
              type="button"
              className="app__button"
              onClick={handleLoadGutenbergSample}
              data-testid="gutenberg-sample"
            >
              Load Gutenberg book
            </button>
          </div>
          {chapterOptions.length > 0 ? (
            <div className="app__controls app__samples-row">
              <label className="app__label" htmlFor="chapterSelect">
                Chapter selection
              </label>
              <select
                id="chapterSelect"
                className="app__select"
                value={selectedChapterId}
                onChange={handleChapterSelect}
                data-testid="chapter-select"
              >
                <option value="full">Full book</option>
                {chapterOptions.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div className="app__meta" data-testid="sample-status">
            Sample status: {sampleStatus}
          </div>
          {sampleError ? (
            <div className="app__error" role="alert">
              {sampleError}
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
                className="app__theme-card app__theme-card--compact"
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
          onChange={handleInputChange}
          rows={10}
        />
        <div className="app__meta">
          Words: {tokenCount.toLocaleString("de-DE")}
        </div>
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
          <div className="app__word-preview" data-testid="word-preview">
            {hasTokens && currentWord ? (
              <span className="app__word-preview-text">
                <span className="app__word-leading">
                  {highlightedWord.leading}
                </span>
                <span
                  className="app__word-focus"
                  style={{
                    color: themeSettings.highlightColor,
                    textShadow: `-1px -1px 0 ${themeSettings.highlightOutlineColor}, 1px -1px 0 ${themeSettings.highlightOutlineColor}, -1px 1px 0 ${themeSettings.highlightOutlineColor}, 1px 1px 0 ${themeSettings.highlightOutlineColor}`
                  }}
                >
                  {highlightedWord.focus}
                </span>
                <span className="app__word-trailing">
                  {highlightedWord.trailing}
                </span>
              </span>
            ) : (
              <span className="app__word-preview-empty">No word</span>
            )}
          </div>
        </div>
        <div className="app__status" data-testid="playback-status">
          Status: {statusLabel}
        </div>
        <div className="app__progress" data-testid="progress-status">
          Progress: {progress.percent}% ({progress.currentIndex}/{progress.totalWords})
        </div>
        <div
          className="app__word"
          data-testid="current-word"
          style={{
            ["--orp-leading-width" as string]: `${maxLeadingLength}ch`
          }}
        >
          {hasTokens ? (
            currentWord ? (
              <div className="app__word-inner">
                <span className="app__word-leading">
                  {highlightedWord.leading}
                </span>
                <span
                  className="app__word-focus"
                  style={{
                    color: themeSettings.highlightColor,
                    textShadow: `-1px -1px 0 ${themeSettings.highlightOutlineColor}, 1px -1px 0 ${themeSettings.highlightOutlineColor}, -1px 1px 0 ${themeSettings.highlightOutlineColor}, 1px 1px 0 ${themeSettings.highlightOutlineColor}`
                  }}
                >
                  {highlightedWord.focus}
                </span>
                <span className="app__word-trailing">
                  {highlightedWord.trailing}
                </span>
              </div>
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
