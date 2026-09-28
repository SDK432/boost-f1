import Image from "next/image";
import Link from "next/link";
import { allCategories, categoryLabels } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="Boost F1"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <span className="text-lg font-bold text-white">Boost F1</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Medio independiente de noticias y análisis de Fórmula 1 para
              aficionados de habla hispana. No estamos afiliados a Formula 1®,
              Formula One Management ni a ningún equipo.
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
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-zinc-300 hover:text-[#E10600] transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-4">
              Independencia
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Formula 1® es una marca registrada de sus titulares. Boost F1 es
              un medio editorial independiente y no está vinculado a Formula
              One Management ni a la FIA.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Boost F1
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link
              href="/privacidad"
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Política de privacidad
            </Link>
            <p className="text-xs text-zinc-600">Noticias y análisis en español</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
