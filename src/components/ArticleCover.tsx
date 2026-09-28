import Image from "next/image";
import type { Article } from "@/lib/types";

const patterns: Record<Article["coverPattern"], string> = {
  carbon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23111111' width='40' height='40'/%3E%3Cpath d='M0 0h20v20H0zm20 20h20v20H20z' fill='%231a1a1a'/%3E%3C/svg%3E")`,
  stripes: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath d='M0 0h10v20H0z' fill='%23ffffff08'/%3E%3C/svg%3E")`,
  grid: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M40 0H0v40' fill='none' stroke='%23ffffff10' stroke-width='1'/%3E%3C/svg%3E")`,
  chequered: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect fill='%23ffffff08' width='16' height='16'/%3E%3Crect fill='%23ffffff08' x='16' y='16' width='16' height='16'/%3E%3C/svg%3E")`,
  speed: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='20'%3E%3Cpath d='M0 10h60M0 5h40M20 15h40' stroke='%23ffffff12' stroke-width='1'/%3E%3C/svg%3E")`,
  circuit: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M10 40c20-30 40-30 60 0s20 30 0 0' fill='none' stroke='%23ffffff10' stroke-width='2'/%3E%3C/svg%3E")`,
};

interface ArticleCoverProps {
  article: Pick<
    Article,
    "coverGradient" | "coverPattern" | "title" | "coverImage"
  >;
  className?: string;
  large?: boolean;
  sizes?: string;
  preload?: boolean;
}

export default function ArticleCover({
  article,
  className = "",
  large = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  preload = false,
}: ArticleCoverProps) {
  if (article.coverImage) {
    return (
      <div className={`relative overflow-hidden bg-zinc-950 ${className}`}>
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          preload={preload}
          sizes={sizes}
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />
        <div className="absolute top-0 left-0 z-10 h-full w-1 bg-[#E10600]" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${article.coverGradient} ${className}`}
      role="img"
      aria-label={`Portada: ${article.title}`}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{ backgroundImage: patterns[article.coverPattern] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <div
        className={`absolute bottom-3 right-3 racing-number text-white/10 select-none pointer-events-none ${
          large ? "text-8xl md:text-9xl" : "text-5xl md:text-6xl"
        }`}
      >
        01
      </div>
      <div className="absolute top-0 left-0 w-1 h-full bg-[#E10600]" />
    </div>
  );
}
