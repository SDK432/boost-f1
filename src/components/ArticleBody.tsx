import Image from "next/image";
import type { ReactNode } from "react";
import type { Article } from "@/lib/types";

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  if (parts.length === 1) return text;

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isSeparatorRow(cells: string[]) {
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function isMarkdownTable(text: string) {
  const lines = text
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.length >= 2 && lines.every((line) => line.startsWith("|"));
}

const numericHeaders = new Set(["pos.", "pos", "tiempo", "gap", "vueltas"]);

function ClassificationTable({ markdown }: { markdown: string }) {
  const rows = markdown
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"))
    .map(splitRow)
    .filter((cells) => !isSeparatorRow(cells));

  const headers = rows[0];
  const body = rows.slice(1);
  if (!headers || headers.length === 0) return null;

  const numeric = headers.map((header) =>
    numericHeaders.has(header.trim().toLowerCase())
  );

  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-white/5 text-[10px] uppercase tracking-wider text-zinc-500">
            {headers.map((header, index) => (
              <th
                key={`${header}-${index}`}
                scope="col"
                className={`px-3 py-2 font-medium ${numeric[index] ? "text-right" : ""}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row) => (
            <tr key={`${row[0]}-${row[1]}`} className="border-t border-white/5">
              {headers.map((header, index) => (
                <td
                  key={`${header}-${index}`}
                  className={`px-3 py-2 align-top text-zinc-300 ${
                    numeric[index]
                      ? "text-right font-mono text-xs tabular-nums"
                      : ""
                  } ${index === 0 ? "racing-number text-base text-white" : ""}`}
                >
                  {row[index] ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderBlock(block: string): ReactNode {
  if (block.startsWith("### ")) {
    return (
      <h3 className="mb-3 mt-8 text-lg font-bold tracking-tight text-white">
        {block.slice(4)}
      </h3>
    );
  }
  if (block.startsWith("## ")) {
    return (
      <h2 className="mb-3 mt-10 text-xl font-black tracking-tight text-white md:text-2xl">
        {block.slice(3)}
      </h2>
    );
  }
  if (isMarkdownTable(block)) {
    return <ClassificationTable markdown={block} />;
  }
  return <p>{renderInline(block)}</p>;
}

function imagesAfterParagraph(article: Article, index: number) {
  const fallbackIndex = Math.max(article.body.length - 1, 0);
  return (article.bodyImages ?? []).filter(
    (image) => (image.afterParagraph ?? fallbackIndex) === index
  );
}

export default function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="prose-f1 max-w-none">
      {article.body.map((block, index) => (
        <div key={index}>
          {renderBlock(block)}
          {imagesAfterParagraph(article, index).map((image) => (
            <figure key={image.src} className="my-8">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
