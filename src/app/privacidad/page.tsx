import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { contactEmail, publicSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo Boost F1 trata los datos personales, las cookies y la publicidad en boostf1.com. Contacto: contacto@boostf1.com.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-xl font-bold text-white">{title}</h2>
      <div className="prose-f1">{children}</div>
    </section>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#E10600] hover:underline"
    >
      {children}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#E10600] font-bold mb-2">
        Datos
      </p>
      <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
        Política de privacidad
      </h1>
      <p className="text-sm text-zinc-500 mb-6">
        Última actualización: 26 de septiembre de 2026.
      </p>

      <div className="prose-f1">
        <p>
          <strong className="text-white">Boost F1</strong> es un medio
          independiente de noticias y análisis de Fórmula 1. Esta política
          explica qué datos personales pueden tratarse al visitar{" "}
          <a href={publicSiteUrl} className="text-[#E10600] hover:underline">
            {publicSiteUrl}
          </a>
          , al escribirnos o, cuando están activos, al usar servicios de
          medición de audiencia y publicidad.
        </p>
      </div>

      <Section title="Responsable">
        <p>
          El responsable del tratamiento es{" "}
          <strong className="text-white">Boost F1</strong>, operador del sitio{" "}
          {publicSiteUrl}.
        </p>
        <p>
          Correo de contacto:{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-[#E10600] hover:underline"
          >
            {contactEmail}
          </a>
          .
        </p>
        <p>
          Boost F1 no está afiliado a Formula 1®, Formula One Management, la
          FIA ni a ningún equipo.
        </p>
      </Section>

      <Section title="Datos que tratamos">
        <p>
          <strong className="text-white">Datos técnicos de la visita.</strong>{" "}
          Al entrar al sitio, el servidor y el proveedor de alojamiento pueden
          registrar la dirección IP, la fecha y la hora, la página solicitada,
          el tipo de navegador y el sistema operativo. Esos registros permiten
          entregar las páginas, mantener la seguridad y diagnosticar fallos.
        </p>
        <p>
          <strong className="text-white">Datos que nos envías.</strong> Si
          escribes a {contactEmail}, o usas el formulario de contacto —que abre
          tu programa de correo—, tratamos el nombre, la dirección y el
          contenido del mensaje para leerlo y responder. El envío lo hace tu
          propio correo. El sitio no guarda una copia del formulario.
        </p>
        <p>
          No hace falta crear una cuenta para leer Boost F1. No vendemos datos
          personales.
        </p>
      </Section>

      <Section title="Para qué los usamos">
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-zinc-300">
          <li>Publicar el sitio y mostrar las noticias.</li>
          <li>Atender correcciones, propuestas y consultas.</li>
          <li>Proteger el sitio frente a abusos y errores técnicos.</li>
          <li>
            Medir el uso y mostrar publicidad, solo cuando esos servicios están
            activos.
          </li>
        </ul>
        <p>
          La base del tratamiento es el interés en operar un medio informativo
          y atender los mensajes que nos diriges. Una cookie que no sea
          necesaria para que el sitio funcione se usa solo si el servicio está
          activo y, cuando la norma aplicable lo exige, con tu consentimiento.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Puedes leer Boost F1 sin registrarte. El sitio, en su funcionamiento
          editorial, no instala por sí mismo cookies de analítica ni de
          publicidad.
        </p>
        <p>
          Tu navegador puede guardar datos técnicos de la sesión. Si se activan
          herramientas de terceros, esas herramientas pueden instalar cookies.
          Puedes bloquearlas o borrarlas en la configuración del navegador. Si
          las bloqueas todas, alguna función del navegador o de un anuncio
          puede dejar de mostrarse; las noticias siguen disponibles.
        </p>
      </Section>

      <Section title="Publicidad y medición de audiencia">
        <p>
          Para sostener el medio, Boost F1 puede mostrar publicidad de terceros
          y usar herramientas de medición de audiencia. Cuando esos servicios
          están activos, ocurre lo siguiente.
        </p>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-zinc-300">
          <li>
            Los proveedores externos, incluido Google, usan cookies para
            publicar anuncios a partir de visitas anteriores a este sitio o a
            otros sitios.
          </li>
          <li>
            El uso de cookies publicitarias permite a Google y a sus socios
            mostrar anuncios según tu visita a boostf1.com y a otros sitios de
            Internet. Entre esos servicios puede estar Google AdSense.
          </li>
          <li>
            Una herramienta de medición, como Google Analytics, puede recoger
            páginas vistas, tipo de dispositivo y una ubicación aproximada.
          </li>
        </ul>
        <p>
          Puedes desactivar la publicidad personalizada en la{" "}
          <ExternalLink href="https://adssettings.google.com">
            Configuración de anuncios de Google
          </ExternalLink>
          .
        </p>
        <p>
          Cómo usa Google las cookies publicitarias:{" "}
          <ExternalLink href="https://policies.google.com/technologies/ads">
            políticas de publicidad de Google
          </ExternalLink>
          . Política de privacidad de Google:{" "}
          <ExternalLink href="https://policies.google.com/privacy">
            policies.google.com/privacy
          </ExternalLink>
          .
        </p>
        <p>
          Opciones para rechazar cookies de terceros:{" "}
          <ExternalLink href="https://www.aboutads.info/choices">
            aboutads.info/choices
          </ExternalLink>{" "}
          y{" "}
          <ExternalLink href="https://www.youronlinechoices.com/">
            youronlinechoices.com
          </ExternalLink>
          .
        </p>
      </Section>

      <Section title="Con quién se comparten">
        <p>
          No cedemos una lista de contactos ni vendemos datos. Pueden intervenir
          estos terceros:
        </p>
        <ul className="mb-5 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-zinc-300">
          <li>
            El proveedor que aloja {publicSiteUrl}, para servir el sitio y
            conservar registros técnicos.
          </li>
          <li>
            El servicio de correo que recibe los mensajes enviados a{" "}
            {contactEmail}.
          </li>
          <li>
            Si la publicidad o la medición están activas, Google y sus socios
            publicitarios, que tratan las cookies según sus propias políticas.
          </li>
        </ul>
        <p>
          Esos proveedores pueden estar fuera de tu país. En ese caso el
          tratamiento sigue las garantías que ofrezca cada uno.
        </p>
      </Section>

      <Section title="Conservación">
        <p>
          Los registros técnicos se conservan el tiempo que el alojamiento los
          mantiene para seguridad y operación, y después se borran o se
          anonimizan.
        </p>
        <p>
          Los correos se conservan el tiempo necesario para responder y, si
          hace falta, un historial breve de la consulta. Puedes pedir que los
          eliminemos.
        </p>
      </Section>

      <Section title="Tus derechos">
        <p>
          Puedes pedir acceso, rectificación, actualización, eliminación,
          oposición o limitación del tratamiento, y retirar un consentimiento
          cuando el tratamiento se base en él. Escribe a{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-[#E10600] hover:underline"
          >
            {contactEmail}
          </a>{" "}
          e indica el derecho que quieres ejercer. Podemos pedirte un dato
          mínimo para confirmar que la solicitud es tuya.
        </p>
        <p>
          Si consideras que no atendimos la solicitud, puedes reclamar ante la
          autoridad de protección de datos de tu país. En Ecuador, la autoridad
          de control es la{" "}
          <ExternalLink href="https://www.gob.ec/spdp">
            Superintendencia de Protección de Datos Personales
          </ExternalLink>
          .
        </p>
      </Section>

      <Section title="Menores">
        <p>
          El sitio se dirige a un público general interesado en el
          automovilismo. No está pensado para menores y no pedimos datos de
          niños a sabiendas. Si un padre o representante cree que un menor nos
          escribió, puede pedir que borremos ese mensaje.
        </p>
      </Section>

      <Section title="Seguridad">
        <p>
          Aplicamos medidas razonables para que el sitio y el correo de
          contacto no queden expuestos. Ningún envío por Internet es
          completamente seguro.
        </p>
      </Section>

      <Section title="Cambios">
        <p>
          Si esta política cambia, actualizaremos la fecha de esta página. El
          texto vigente es el publicado en {publicSiteUrl}/privacidad.
        </p>
      </Section>

      <Section title="Contacto">
        <p>
          Boost F1 —{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-[#E10600] hover:underline"
          >
            {contactEmail}
          </a>
          . También puedes usar la página de{" "}
          <Link href="/contacto" className="text-[#E10600] hover:underline">
            contacto
          </Link>
          .
        </p>
        <p className="text-sm text-zinc-500">
          Este texto describe cómo opera el sitio; no es asesoría legal.
        </p>
      </Section>
    </div>
  );
}
