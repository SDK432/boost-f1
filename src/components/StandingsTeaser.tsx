import {
  constructorStandings,
  driverStandings,
} from "@/lib/standings";

export default function StandingsTeaser() {
  return (
    <section className="rounded-xl border border-white/10 bg-zinc-950 overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
          Clasificación
        </h2>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500">
          Demo 2026
        </span>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        <div className="p-4">
          <h3 className="mb-3 text-[11px] uppercase tracking-wider text-[#E10600]">
            Pilotos
          </h3>
          <ol className="space-y-2">
            {driverStandings.map((d) => (
              <li
                key={d.position}
                className="flex items-center gap-3 text-sm"
              >
                <span className="racing-number w-6 text-right text-zinc-500 text-base">
                  {d.position}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{d.driver}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{d.team}</p>
                </div>
                <span className="font-mono text-xs text-zinc-300">
                  {d.points}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="p-4">
          <h3 className="mb-3 text-[11px] uppercase tracking-wider text-[#E10600]">
            Constructores
          </h3>
          <ol className="space-y-2">
            {constructorStandings.map((c) => (
              <li
                key={c.position}
                className="flex items-center gap-3 text-sm"
              >
                <span className="racing-number w-6 text-right text-zinc-500 text-base">
                  {c.position}
                </span>
                <p className="flex-1 font-semibold text-white truncate">
                  {c.team}
                </p>
                <span className="font-mono text-xs text-zinc-300">
                  {c.points}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="border-t border-white/10 px-5 py-2 text-[10px] text-zinc-600">
        Datos ficticios de demostración · no oficiales
      </p>
    </section>
  );
}
