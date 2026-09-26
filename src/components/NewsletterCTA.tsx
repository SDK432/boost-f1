"use client";

import { FormEvent, useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 carbon-texture opacity-30 pointer-events-none" />
      <div className="relative max-w-2xl">
        <h2 className="text-xl md:text-2xl font-black text-white mb-2">
          Recibe el{" "}
          <span className="text-[#E10600]">pulso</span> de la parrilla
        </h2>
        <p className="text-sm text-zinc-400 mb-5 leading-relaxed">
          Noticias, análisis y la lectura de cada gran premio, en español.
        </p>

        {done ? (
          <p className="text-sm font-medium text-emerald-400">
            Gracias por seguir a Boost F1.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 rounded border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#E10600] focus:outline-none focus:ring-1 focus:ring-[#E10600]"
            />
            <button
              type="submit"
              className="rounded bg-[#E10600] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition"
            >
              Suscribirme
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
