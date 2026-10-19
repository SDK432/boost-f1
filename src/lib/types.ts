export type Category = "noticias" | "analisis" | "resultados" | "opinion";

export interface ArticleBodyImage {
  src: string;
  alt: string;
  /** 0-based body paragraph index after which the image is inserted. */
  afterParagraph?: number;
}

/** Optional social post. Only x/twitter and instagram are rendered, and only after URL checks. */
export interface ArticleEmbed {
  platform: "x" | "twitter" | "instagram";
  url: string;
  caption?: string;
  /** Same 0-based index convention as `ArticleBodyImage.afterParagraph`. */
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
  /** Optional. Articles without this field render exactly as before. */
  embeds?: ArticleEmbed[];
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
  /** Short country or event name used in "tras GP …". */
  shortName: string;
  circuit: string;
  country: string;
  /** Scheduled race start, as an ISO 8601 instant. */
  date: string;
  round: number;
}
