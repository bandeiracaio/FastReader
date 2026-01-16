import { assertCondition } from "./assert";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

const MAX_PDF_PAGES = 200;
const PDF_WORKER_PATH = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

GlobalWorkerOptions.workerSrc = PDF_WORKER_PATH;

type PdfTextItem = {
  str?: string;
};

export async function extractPdfTextFromArrayBuffer(
  data: ArrayBuffer
): Promise<string> {
  assertCondition(data instanceof ArrayBuffer, "PDF data must be an ArrayBuffer");

  const loadingTask = getDocument({ data });
  const pdfDocument = await loadingTask.promise;
  const pageCount = Math.min(pdfDocument.numPages, MAX_PDF_PAGES);
  const pagesText: string[] = [];

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    const page = await pdfDocument.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => (item as PdfTextItem).str ?? "")
      .join(" ")
      .trim();

    if (pageText) {
      pagesText.push(pageText);
    }
  }

  return pagesText.join("\n").trim();
}
