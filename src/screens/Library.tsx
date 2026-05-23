import { useState, useEffect, useRef } from "react";
import type { SampleCategory, SampleSource } from "../types";
import {
  GUTENBERG_CATEGORIES,
  searchGutenberg,
  loadGutenbergBook,
  formatAuthorName,
  formatDownloadCount,
  type GutenbergBook,
} from "../lib/gutenberg";

type Props = {
  sampleCategories: SampleCategory[];
  onBookLoad: (text: string, title: string) => void;
  onNavigateToReader: () => void;
  onSampleSourceSelect: (sample: SampleSource) => void;
  sampleLoadingId: string | null;
  sampleError: string | null;
};

export default function Library({
  sampleCategories,
  onBookLoad,
  onNavigateToReader,
  onSampleSourceSelect,
  sampleLoadingId,
  sampleError,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [books, setBooks] = useState<GutenbergBook[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingBookId, setLoadingBookId] = useState<number | null>(null);
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>([]);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchBooks = async (query: string, topic: string | undefined, page: string | null, append: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await searchGutenberg(query, topic, page);
      setBooks((prev) => append ? [...prev, ...result.results] : result.results);
      setNextPage(result.next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load books.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const topic = activeCategory
      ? GUTENBERG_CATEGORIES.find((c) => c.id === activeCategory)?.topic
      : undefined;

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      fetchBooks(searchQuery, topic, null, false);
    }, 400);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery, activeCategory]);

  const handleLoadMore = () => {
    if (!nextPage) return;
    const topic = activeCategory
      ? GUTENBERG_CATEGORIES.find((c) => c.id === activeCategory)?.topic
      : undefined;
    fetchBooks(searchQuery, topic, nextPage, true);
  };

  const handleBookRead = async (book: GutenbergBook) => {
    setLoadingBookId(book.id);
    setError(null);
    try {
      const text = await loadGutenbergBook(book.id);
      onBookLoad(text, book.title);
      onNavigateToReader();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load book.");
    } finally {
      setLoadingBookId(null);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  return (
    <div className="screen library">
      <div className="library__gutenberg">
        <div className="library__search">
          <input
            type="search"
            className="library__search-input"
            placeholder="Search by title or author…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Gutenberg catalog"
          />
        </div>

        <div className="library__categories" role="list" aria-label="Browse by category">
          <button
            type="button"
            className={`library__category-chip${activeCategory === null ? " library__category-chip--active" : ""}`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </button>
          {GUTENBERG_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`library__category-chip${activeCategory === cat.id ? " library__category-chip--active" : ""}`}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {error ? (
          <div className="library__error" role="alert">{error}</div>
        ) : null}

        {isLoading && books.length === 0 ? (
          <div className="library__status">Loading books…</div>
        ) : books.length === 0 ? (
          <div className="library__status">No books found.</div>
        ) : (
          <>
            <div className="library__books">
              {books.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  className="library__book-card"
                  onClick={() => handleBookRead(book)}
                  disabled={loadingBookId === book.id}
                  aria-label={`Read ${book.title}`}
                >
                  <div className="library__book-title">{book.title}</div>
                  <div className="library__book-author">
                    {book.authors.map(formatAuthorName).join(", ") || "Unknown author"}
                  </div>
                  <div className="library__book-downloads">
                    {loadingBookId === book.id
                      ? "Loading…"
                      : formatDownloadCount(book.download_count)}
                  </div>
                </button>
              ))}
            </div>
            {nextPage ? (
              <div className="library__load-more">
                <button
                  type="button"
                  className="btn"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading…" : "Load more"}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      <div className="library__samples">
        <h2 className="library__section-title">Offline samples</h2>
        <p className="library__samples-hint">Pre-loaded texts, available without an internet connection.</p>
        <div className="library__samples-list">
          {sampleCategories.map((category) => {
            const isExpanded = expandedCategoryIds.includes(category.id);
            return (
              <div key={category.id} className="library__sample-category">
                <div className="library__sample-category-header">
                  <div>
                    <div className="library__sample-category-name">
                      {category.label} <span className="library__sample-count">({category.samples.length})</span>
                    </div>
                    <div className="library__sample-category-desc">{category.description}</div>
                  </div>
                  <button
                    type="button"
                    className="btn btn--small"
                    onClick={() => handleCategoryToggle(category.id)}
                    aria-expanded={isExpanded}
                    data-testid={`sample-category-${category.id}`}
                  >
                    {isExpanded ? "Collapse" : "Expand"}
                  </button>
                </div>
                {isExpanded ? (
                  <div className="library__sample-books">
                    {category.samples.map((sample) => (
                      <button
                        key={sample.id}
                        type="button"
                        className="library__sample-book-btn"
                        onClick={() => {
                          onSampleSourceSelect(sample);
                          onNavigateToReader();
                        }}
                        disabled={sampleLoadingId === sample.id}
                        data-testid={`sample-${sample.id}`}
                      >
                        <span className="library__sample-book-title">{sample.label}</span>
                        <span className="library__sample-book-author">{sample.description}</span>
                        {sampleLoadingId === sample.id ? (
                          <span className="library__sample-loading">Loading…</span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {sampleError ? (
          <div className="library__error" role="alert" style={{ marginTop: 12 }}>{sampleError}</div>
        ) : null}
      </div>
    </div>
  );
}
