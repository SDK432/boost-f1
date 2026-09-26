import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import {
  allCategories,
  categoryLabels,
  getArticlesByCategory,
} from "@/lib/articles";
import type { Category } from "@/lib/types";

interface PageProps {
  params: Promise<{ categoria: string }>;
}

function isCategory(value: string): value is Category {
  return allCategories.includes(value as Category);
}

export function generateStaticParams() {
  return allCategories.map((categoria) => ({ categoria }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  if (!isCategory(categoria)) return { title: "Categoría" };
  return {
    title: categoryLabels[categoria],
    description: `Artículos de ${categoryLabels[categoria]} en Boost F1.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoria } = await params;
  if (!isCategory(categoria)) notFound();

  const articles = getArticlesByCategory(categoria);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <nav className="mb-4 text-xs text-zinc-500">
        <Link href="/" className="hover:text-white">
          Inicio
        </Link>
        <span className="mx-2">/</span>
        <Link href="/categorias" className="hover:text-white">
          Categorías
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-300">{categoryLabels[categoria]}</span>
      </nav>

      <p className="text-[10px] uppercase tracking-[0.25em] text-[#E10600] font-bold mb-2">
        Categoría
      </p>
      <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
        {categoryLabels[categoria]}
      </h1>
      <p className="text-sm text-zinc-400 mb-8">
        {articles.length} artículo{articles.length !== 1 ? "s" : ""} en esta
        sección
      </p>

      <div className="mb-8">
        <AdSlot size="banner" label="Espacio publicitario — categoría" />
      </div>

      {articles.length === 0 ? (
        <p className="text-zinc-400">Aún no hay artículos en esta categoría.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
