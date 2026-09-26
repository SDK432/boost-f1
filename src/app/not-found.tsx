import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="racing-number text-8xl text-[#E10600]/40 mb-4">404</p>
      <h1 className="text-2xl font-black text-white mb-2">Fuera de pista</h1>
      <p className="text-sm text-zinc-400 mb-8">
        No encontramos esa página. Puede que el enlace esté roto o el artículo
        ya no exista.
      </p>
      <Link
        href="/"
        className="bg-[#E10600] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-700 transition"
      >
        Volver a boxes
      </Link>
    </div>
  );
}
