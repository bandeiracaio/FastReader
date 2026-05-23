const HISTORY_KEY = "fastreader:history";
const MAX_ENTRIES = 10;

export type HistoryEntry = {
  title: string;
  wordCount: number;
  progress: number;
  lastReadAt: number;
  gutenbergId?: number;
  sampleId?: string;
};

export function loadHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? (JSON.parse(stored) as HistoryEntry[]) : [];
  } catch { return []; }
}

export function upsertHistory(entry: HistoryEntry): HistoryEntry[] {
  try {
    const history = loadHistory();
    const idx = history.findIndex((h) => h.title === entry.title);
    if (idx >= 0) history[idx] = entry;
    else history.unshift(entry);
    const next = history.slice(0, MAX_ENTRIES);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    return next;
  } catch { return loadHistory(); }
}
