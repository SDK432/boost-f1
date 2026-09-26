import type { Category } from "./types";

export const categoryLabels: Record<Category, string> = {
  noticias: "Noticias",
  analisis: "Análisis",
  resultados: "Resultados",
  opinion: "Opinión",
};

export const allCategories: Category[] = [
  "noticias",
  "analisis",
  "resultados",
  "opinion",
];
