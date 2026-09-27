"use client";

import Link from "next/link";
import { useState } from "react";
import { allCategories, categoryLabels } from "@/lib/categories";
import Logo from "@/components/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-center gap-2 shrink-0">
          <Logo eager />
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#E10600] transition-colors">
            Boost F1
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
          >
            Inicio
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/categorias/${cat}`}
              className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
            >
              {categoryLabels[cat]}
            </Link>
          ))}
          <Link
            href="/quienes-somos"
            className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
          >
            Quiénes somos
          </Link>
          <Link
            href="/contacto"
            className="px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors"
          >
            Contacto
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-white/10 bg-black px-4 py-4 flex flex-col gap-1">
          <Link
            href="/"
            className="px-3 py-3 text-sm text-zinc-200 hover:bg-white/5 rounded"
            onClick={() => setOpen(false)}
          >
            Inicio
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/categorias/${cat}`}
              className="px-3 py-3 text-sm text-zinc-200 hover:bg-white/5 rounded"
              onClick={() => setOpen(false)}
            >
              {categoryLabels[cat]}
            </Link>
          ))}
          <Link
            href="/quienes-somos"
            className="px-3 py-3 text-sm text-zinc-200 hover:bg-white/5 rounded"
            onClick={() => setOpen(false)}
          >
            Quiénes somos
          </Link>
          <Link
            href="/contacto"
            className="px-3 py-3 text-sm text-zinc-200 hover:bg-white/5 rounded"
            onClick={() => setOpen(false)}
          >
            Contacto
          </Link>
        </nav>
      )}
    </header>
  );
}
