import type { Metadata } from "next";
import Link from "next/link";
import { allCategories, categoryLabels, getArticlesByCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Categorías",
  description:
    "Explora Noticias, Análisis, Resultados y Opinión en Boost F1.",
};

export default function CategoriesIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#E10600] font-bold mb-2">
        Secciones
      </p>
      <h1 className="text-3xl md:text-4xl font-black text-white mb-8">
        Categorías
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {allCategories.map((cat) => {
          const count = getArticlesByCategory(cat).length;
          return (
            <Link
              key={cat}
              href={`/categorias/${cat}`}
              className="group rounded-xl border border-white/10 bg-zinc-950 p-6 transition hover:border-[#E10600]/50"
            >
              <span className="racing-number text-4xl text-white/10 group-hover:text-[#E10600]/30 transition-colors">
                0{allCategories.indexOf(cat) + 1}
              </span>
              <h2 className="mt-2 text-xl font-bold text-white group-hover:text-[#E10600] transition-colors">
                {categoryLabels[cat]}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {count} artículo{count !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
