import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import ArticleCover from "@/components/ArticleCover";
import {
  categoryLabels,
  formatDate,
  getAllArticles,
  getArticleBySlug,
} from "@/lib/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artículo no encontrado" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      locale: "es_ES",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getAllArticles()
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);

  const moreRelated =
    related.length < 2
      ? getAllArticles()
          .filter(
            (a) =>
              a.slug !== article.slug &&
              !related.some((r) => r.slug === a.slug)
          )
          .slice(0, 2 - related.length)
      : [];

  const sidebarRelated = [...related, ...moreRelated];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <article>
          <nav className="mb-4 text-xs text-zinc-500">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/categorias/${article.category}`}
              className="hover:text-white"
            >
              {categoryLabels[article.category]}
            </Link>
          </nav>

          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wider">
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
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-500">
              {article.readingMinutes} min de lectura
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <p className="mb-6 text-lg text-zinc-400 leading-relaxed">
            {article.excerpt}
          </p>

          <p className="mb-6 text-sm text-zinc-500">
            Por <span className="text-zinc-300">{article.author}</span>
          </p>

          <ArticleCover
            article={article}
            large
            className="mb-8 aspect-[21/9] w-full rounded-xl"
          />

          <div className="prose-f1 max-w-none">
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {sidebarRelated.length > 0 && (
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Relacionados
              </h2>
              <div className="space-y-4">
                {sidebarRelated.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
