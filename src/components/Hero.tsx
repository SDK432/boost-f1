import Link from "next/link";
import type { Article } from "@/lib/types";
import { categoryLabels, formatDate } from "@/lib/articles";
import ArticleCover from "./ArticleCover";

interface HeroProps {
  article: Article;
}

export default function Hero({ article }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-white/10">
      <div className="grid md:grid-cols-2 min-h-[380px] md:min-h-[440px]">
        <ArticleCover
          article={article}
          large
          preload
          sizes="(max-width: 768px) 100vw, 50vw"
          className="min-h-[220px] md:min-h-full md:order-2"
        />
        <div className="relative flex flex-col justify-end bg-zinc-950 p-6 md:p-10 md:order-1">
          <div className="absolute inset-0 carbon-texture opacity-40 pointer-events-none" />
          <div className="relative">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-block bg-[#E10600] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                Destacado
              </span>
              <Link
                href={`/categorias/${article.category}`}
                className="text-[11px] uppercase tracking-wider text-zinc-400 hover:text-white"
              >
                {categoryLabels[article.category]}
              </Link>
            </div>
            <h1 className="mb-4 text-2xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
              <Link
                href={`/articulo/${article.slug}`}
                className="hover:text-[#E10600] transition-colors"
              >
                {article.title}
              </Link>
            </h1>
            <p className="mb-6 max-w-xl text-sm text-zinc-400 md:text-base leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <span>{article.author}</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>{article.readingMinutes} min de lectura</span>
            </div>
            <Link
              href={`/articulo/${article.slug}`}
              className="mt-6 inline-flex items-center gap-2 bg-[#E10600] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-red-700"
            >
              Leer artículo
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
