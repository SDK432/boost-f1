import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escribe a la redacción de Boost F1 en contacto@boostf1.com. Correcciones, propuestas y consultas sobre el medio.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#E10600] font-bold mb-2">
        Redacción
      </p>
      <h1 className="text-3xl md:text-5xl font-black text-white mb-6">
        Contacto
      </h1>

      <div className="prose-f1 space-y-4">
        <p>
          La redacción de <strong className="text-white">Boost F1</strong> lee
          los mensajes que llegan a{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-[#E10600] hover:underline"
          >
            {contactEmail}
          </a>
          . Escríbenos para proponer un tema, corregir un dato o consultar
          sobre el medio.
        </p>
        <p>
          <strong className="text-white">No estamos afiliados</strong> a
          Formula 1®, Formula One Management ni a ningún equipo. Los asuntos de
          la competición corresponden a sus canales oficiales.
        </p>
      </div>

      <div className="mt-8">
        <a
          href={`mailto:${contactEmail}`}
          className="inline-flex bg-[#E10600] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition"
        >
          Escribir a {contactEmail}
        </a>
      </div>

      <ContactForm />

      <p className="mt-8 text-sm text-zinc-500">
        Cómo tratamos los datos de ese correo está en la{" "}
        <Link href="/privacidad" className="text-[#E10600] hover:underline">
          política de privacidad
        </Link>
        .
      </p>
    </div>
  );
}
