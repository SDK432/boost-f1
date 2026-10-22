import type { Article, Category } from "./types";
import { allCategories, categoryLabels } from "./categories";
import { sanitizeEmbeds } from "./embeds";

export { allCategories, categoryLabels };

// Article JSON is imported at build time so the data ships inside the server
// bundle. Cloudflare Workers have no project filesystem at runtime.
const articleModules = import.meta.glob<Article>(
  "../../content/articles/*.json",
  { eager: true, import: "default" },
);

export function getAllArticles(): Article[] {
  const articles = Object.values(articleModules).map((article) => {
    if (article.embeds == null) return article;
    return { ...article, embeds: sanitizeEmbeds(article.embeds) };
  });
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticle(): Article | undefined {
  const all = getAllArticles();
  return all.find((a) => a.featured) ?? all[0];
}

export function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
