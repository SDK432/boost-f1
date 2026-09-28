import Link from "next/link";
import type { Article } from "@/lib/types";
import { categoryLabels, formatDate } from "@/lib/articles";
import ArticleCover from "./ArticleCover";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-zinc-950/80 transition hover:border-[#E10600]/40 hover:shadow-[0_0_30px_-10px_rgba(225,6,0,0.35)]">
      <Link href={`/articulo/${article.slug}`} className="block">
        <ArticleCover
          article={article}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="aspect-[16/10] w-full transition duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wider">
          <Link
            href={`/categorias/${article.category}`}
            className="font-semibold text-[#E10600] hover:underline"
          >
            {categoryLabels[article.category]}
          </Link>
          <span className="text-zinc-600">·</span>
          <time className="text-zinc-500" dateTime={article.date}>
            {formatDate(article.date)}
          </time>
        </div>
        <h3 className="mb-2 text-lg font-bold leading-snug text-white group-hover:text-[#E10600] transition-colors">
          <Link href={`/articulo/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="mb-4 flex-1 text-sm text-zinc-400 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{article.author}</span>
          <span>{article.readingMinutes} min</span>
        </div>
      </div>
    </article>
  );
}
