export type Category = "noticias" | "analisis" | "resultados" | "opinion";

export interface ArticleBodyImage {
  src: string;
  alt: string;
  /** 0-based body paragraph index after which the image is inserted. */
  afterParagraph?: number;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  author: string;
  date: string;
  readingMinutes: number;
  featured?: boolean;
  coverGradient: string;
  coverPattern: "carbon" | "stripes" | "grid" | "chequered" | "speed" | "circuit";
  /** Public path, e.g. `/articles/slug/cover.jpg`. Falls back to the gradient cover when omitted. */
  coverImage?: string;
  body: string[];
  bodyImages?: ArticleBodyImage[];
}

export interface DriverStanding {
  position: number;
  driver: string;
  team: string;
  points: number;
}

export interface ConstructorStanding {
  position: number;
  team: string;
  points: number;
}

export interface NextRace {
  name: string;
  circuit: string;
  country: string;
  date: string;
  round: number;
}
