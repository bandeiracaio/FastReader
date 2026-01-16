import { assertCondition } from "./assert";
import ePub from "epubjs";

const MAX_EPUB_SECTIONS = 300;

type EpubSpineItem = {
  load: (loader: (path: string) => Promise<string>) => Promise<void>;
  document?: { body?: { textContent?: string | null } };
};

type EpubBook = {
  ready: Promise<void>;
  spine: { items: EpubSpineItem[] };
  load: (path: string) => Promise<string>;
};

export async function extractEpubTextFromArrayBuffer(
  data: ArrayBuffer
): Promise<string> {
  assertCondition(data instanceof ArrayBuffer, "EPUB data must be an ArrayBuffer");

  const book = ePub(data) as unknown as EpubBook;
  await book.ready;

  const spineItems = book.spine?.items ?? [];
  const sectionCount = Math.min(spineItems.length, MAX_EPUB_SECTIONS);
  const sectionTexts: string[] = [];

  for (let index = 0; index < sectionCount; index += 1) {
    const spineItem = spineItems[index];
    await spineItem.load(book.load.bind(book));
    const sectionText = spineItem.document?.body?.textContent?.trim() ?? "";

    if (sectionText) {
      sectionTexts.push(sectionText);
    }
  }

  return sectionTexts.join("\n").trim();
}
