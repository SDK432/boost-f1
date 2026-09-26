import Link from "next/link";
import { allCategories, categoryLabels } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center bg-[#E10600] font-black text-white text-sm">
                B
              </span>
              <span className="text-lg font-bold text-white">Boost F1</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Medio editorial independiente sobre Fórmula 1. Contenido de
              demostración. No estamos afiliados a la FIA, Formula One
              Management ni a ningún equipo.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
              Secciones
            </h3>
            <ul className="space-y-2">
              {allCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categorias/${cat}`}
                    className="text-sm text-zinc-300 hover:text-[#E10600] transition-colors"
                  >
                    {categoryLabels[cat]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quienes-somos"
                  className="text-sm text-zinc-300 hover:text-[#E10600] transition-colors"
                >
                  Quiénes somos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
              Aviso
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Los artículos, clasificaciones y fechas de carrera son contenido
              de muestra con fines de demostración del sitio. Los nombres de
              pilotos y equipos son ficticios.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Boost F1 · Demo editorial
          </p>
          <p className="text-xs text-zinc-600">
            Hecho para Rick Aules · Listo para AdSense
          </p>
        </div>
      </div>
    </footer>
  );
}
