"use client";

import { FormEvent } from "react";
import { contactEmail } from "@/lib/site";

export default function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const subject =
      String(form.get("subject") ?? "").trim() || "Contacto desde Boost F1";
    const message = String(form.get("message") ?? "").trim();
    const body = [`Nombre: ${name}`, `Correo: ${email}`, "", message].join(
      "\n",
    );
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-4 rounded-xl border border-white/10 bg-zinc-950 p-6 md:p-8"
    >
      <h2 className="text-lg font-bold text-white">Escribir a la redacción</h2>
      <p className="text-sm leading-relaxed text-zinc-400">
        El mensaje se abre en tu programa de correo, dirigido a {contactEmail}.
        El sitio no guarda una copia.
      </p>

      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500"
        >
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#E10600] focus:outline-none focus:ring-1 focus:ring-[#E10600]"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500"
        >
          Correo
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#E10600] focus:outline-none focus:ring-1 focus:ring-[#E10600]"
        />
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500"
        >
          Asunto
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          required
          className="w-full rounded border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#E10600] focus:outline-none focus:ring-1 focus:ring-[#E10600]"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-zinc-500"
        >
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#E10600] focus:outline-none focus:ring-1 focus:ring-[#E10600]"
        />
      </div>

      <button
        type="submit"
        className="inline-flex bg-[#E10600] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition"
      >
        Abrir en el correo
      </button>
    </form>
  );
}
