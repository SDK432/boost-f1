import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Boost F1 es un medio independiente de noticias y análisis de Fórmula 1 para aficionados de habla hispana.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#E10600] font-bold mb-2">
        El medio
      </p>
      <h1 className="text-3xl md:text-5xl font-black text-white mb-6">
        Quiénes somos
      </h1>

      <div className="prose-f1 space-y-4">
        <p>
          <strong className="text-white">Boost F1</strong> es un medio
          independiente de noticias y análisis de Fórmula 1. Cubrimos la
          temporada para aficionados de habla hispana: lo que pasa en pista, el
          contexto técnico y la lectura de cada gran premio.
        </p>
        <p>
          Publicamos con voz editorial propia. Preferimos explicar una carrera
          con claridad —qué ocurrió, por qué importó y qué puede cambiar el
          fin de semana siguiente— antes que repetir un comunicado.
        </p>
        <p>
          <strong className="text-white">No estamos afiliados</strong> a
          Formula 1®, Formula One Management (FOM), la FIA ni a ningún equipo o
          piloto. Las marcas y los nombres de la categoría pertenecen a sus
          titulares. Boost F1 informa y opina; no representa a la competición.
        </p>
        <p>
          En estas páginas hay noticias, análisis, resultados y columnas de
          opinión. Cuando un dato está confirmado, lo tratamos como tal. Cuando
          es una lectura nuestra, también se nota.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex bg-[#E10600] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition"
        >
          Volver al inicio
        </Link>
        <Link
          href="/categorias"
          className="inline-flex border border-white/20 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:border-[#E10600] transition"
        >
          Ver categorías
        </Link>
      </div>
    </div>
  );
}
