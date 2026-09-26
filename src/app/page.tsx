import AdSlot from "@/components/AdSlot";
import ArticleCard from "@/components/ArticleCard";
import CountdownCard from "@/components/CountdownCard";
import Hero from "@/components/Hero";
import NewsletterCTA from "@/components/NewsletterCTA";
import StandingsTeaser from "@/components/StandingsTeaser";
import { getAllArticles, getFeaturedArticle } from "@/lib/articles";

export default function HomePage() {
  const featured = getFeaturedArticle();
  const rest = getAllArticles().filter((a) => a.slug !== featured?.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10 space-y-10">
      {featured && <Hero article={featured} />}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#E10600] font-bold mb-1">
                Últimas
              </p>
              <h2 className="text-2xl font-black text-white">En la parrilla</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <CountdownCard />
          <StandingsTeaser />
          <AdSlot
            size="rectangle"
            label="Espacio publicitario — lateral"
          />
        </aside>
      </div>

      <NewsletterCTA />
    </div>
  );
}
