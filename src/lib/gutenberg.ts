export type GutenbergAuthor = {
  name: string;
  birth_year: number | null;
  death_year: number | null;
};

export type GutenbergBook = {
  id: number;
  title: string;
  authors: GutenbergAuthor[];
  download_count: number;
  formats: Record<string, string>;
};

export type GutenbergSearchResult = {
  count: number;
  next: string | null;
  results: GutenbergBook[];
};

export type GutenbergCategory = {
  id: string;
  label: string;
  topic: string;
};

export const GUTENBERG_CATEGORIES: GutenbergCategory[] = [
  { id: "fiction", label: "Fiction", topic: "fiction" },
  { id: "adventure", label: "Adventure", topic: "adventure stories" },
  { id: "philosophy", label: "Philosophy", topic: "philosophy" },
  { id: "history", label: "History", topic: "history" },
  { id: "poetry", label: "Poetry", topic: "poetry" },
  { id: "drama", label: "Drama", topic: "drama" },
  { id: "science", label: "Science", topic: "science" },
  { id: "romance", label: "Romance", topic: "love stories" },
  { id: "mystery", label: "Mystery", topic: "detective and mystery stories" }
];

export async function searchGutenberg(
  query: string,
  topic?: string,
  page?: string | null
): Promise<GutenbergSearchResult> {
  const params = new URLSearchParams();
  if (query.trim()) params.set("search", query.trim());
  if (topic) params.set("topic", topic);
  params.set("languages", "en");

  const url = page ?? `https://gutendex.com/books/?${params}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch books from Gutenberg.");
  return response.json() as Promise<GutenbergSearchResult>;
}

export async function loadGutenbergBook(bookId: number): Promise<string> {
  const proxyUrl = `https://r.jina.ai/http://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}.txt`;
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error("Failed to load book from Gutenberg.");
  const text = await response.text();
  if (!text.trim()) throw new Error("Book text was empty.");
  return text;
}

export function formatAuthorName(author: GutenbergAuthor): string {
  const parts = author.name.split(", ");
  return parts.length === 2 ? `${parts[1]} ${parts[0]}` : author.name;
}

export function formatDownloadCount(count: number): string {
  if (count >= 1000) return `${Math.round(count / 1000)}k downloads`;
  return `${count} downloads`;
}
