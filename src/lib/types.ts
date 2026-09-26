export type Category = "noticias" | "analisis" | "resultados" | "opinion";

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
  body: string[];
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
