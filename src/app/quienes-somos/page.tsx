import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description:
    "Boost F1 es un medio editorial independiente sobre Fórmula 1. Sin afiliación oficial.",
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
          editorial independiente dedicado a la Fórmula 1. Ofrecemos noticias,
          análisis, crónicas de resultados y columnas de opinión en español,
          con un diseño pensado para aficionados que viven la parrilla a tope.
        </p>
        <p>
          Continuamos de forma independiente tras un proyecto anterior de
          aficionados a la F1. Misma pasión, marca propia y sin ataduras
          oficiales.
        </p>
        <p>
          <strong className="text-white">No somos un medio oficial.</strong> No
          estamos afiliados a la FIA, a Formula One Management, a Liberty Media
          ni a ningún equipo o piloto. Las marcas, logotipos y nombres
          comerciales de la F1 pertenecen a sus respectivos dueños.
        </p>
        <p>
          Este sitio es una <strong className="text-white">base de
          demostración</strong>: los artículos, clasificaciones y fechas de
          carrera son contenido de muestra con personajes y datos ficticios.
          Sirve para validar el diseño, el SEO, los espacios publicitarios y el
          flujo editorial antes de conectar fuentes reales o automatización.
        </p>
        <p>
          El proyecto está preparado para monetización futura con Google
          AdSense: verás banners etiquetados como{" "}
          <em>«Espacio publicitario»</em> listos para sustituir por el código
          oficial cuando la cuenta esté aprobada. No inventamos IDs de AdSense.
        </p>
        <p>
          Si quieres colaborar, sugerir temas o hablar de partnerships, este es
          el momento de conectar un formulario o email real en una próxima
          iteración.
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
