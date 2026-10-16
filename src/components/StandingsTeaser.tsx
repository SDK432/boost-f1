import { getChampionshipStandings } from "@/lib/standings";
import type { ConstructorStanding, DriverStanding } from "@/lib/types";

function positionClass(position: number) {
  if (position === 1) return "text-[#E10600]";
  if (position <= 3) return "text-white";
  return "text-zinc-500";
}

function DriverTable({
  rows,
  season,
  asOf,
}: {
  rows: DriverStanding[];
  season: number;
  asOf: string;
}) {
  return (
    <table className="w-full text-left">
      <caption className="sr-only">
        Campeonato de pilotos {season}, {asOf}
      </caption>
      <thead>
        <tr className="text-[10px] uppercase tracking-wider text-zinc-500">
          <th scope="col" className="w-8 pb-2 pr-2 text-right font-medium">
            Pos
          </th>
          <th scope="col" className="pb-2 pr-3 font-medium">
            Piloto
          </th>
          <th scope="col" className="pb-2 text-right font-medium">
            Pts
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.position} className="border-t border-white/5">
            <td
              className={`racing-number py-2 pr-2 text-right align-top text-base ${positionClass(row.position)}`}
            >
              {row.position}
            </td>
            <td className="py-2 pr-3 align-top">
              <p className="text-sm font-semibold leading-tight text-white">
                {row.driver}
              </p>
              <p className="mt-0.5 text-[11px] leading-tight text-zinc-500">
                {row.team}
              </p>
            </td>
            <td className="py-2 text-right align-top font-mono text-xs tabular-nums text-zinc-300">
              {row.points}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ConstructorTable({
  rows,
  season,
  asOf,
}: {
  rows: ConstructorStanding[];
  season: number;
  asOf: string;
}) {
  return (
    <table className="w-full text-left">
      <caption className="sr-only">
        Campeonato de constructores {season}, {asOf}
      </caption>
      <thead>
        <tr className="text-[10px] uppercase tracking-wider text-zinc-500">
          <th scope="col" className="w-8 pb-2 pr-2 text-right font-medium">
            Pos
          </th>
          <th scope="col" className="pb-2 pr-3 font-medium">
            Equipo
          </th>
          <th scope="col" className="pb-2 text-right font-medium">
            Pts
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.position} className="border-t border-white/5">
            <td
              className={`racing-number py-2 pr-2 text-right align-middle text-base ${positionClass(row.position)}`}
            >
              {row.position}
            </td>
            <td className="py-2 pr-3 align-middle text-sm font-semibold text-white">
              {row.team}
            </td>
            <td className="py-2 text-right align-middle font-mono text-xs tabular-nums text-zinc-300">
              {row.points}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function StandingsTeaser() {
  const standings = await getChampionshipStandings();

  return (
    <section
      aria-label={`Clasificación ${standings.season}`}
      className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950"
    >
      <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-4">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
            Clasificación
          </h2>
          <p className="mt-1 text-[11px] text-zinc-400">{standings.asOf}</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-zinc-500">
          {standings.season}
        </span>
      </div>

      <div className="border-b border-white/10 px-3 py-3">
        <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#E10600]">
            Pilotos
          </h3>
          <span className="text-[10px] text-zinc-500">
            {standings.drivers.length} en total
          </span>
        </div>
        <div className="standings-scroll max-h-80 overflow-y-auto overscroll-contain px-1">
          <DriverTable
            rows={standings.drivers}
            season={standings.season}
            asOf={standings.asOf}
          />
        </div>
      </div>

      <div className="px-3 py-3">
        <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#E10600]">
            Constructores
          </h3>
          <span className="text-[10px] text-zinc-500">
            {standings.constructors.length} en total
          </span>
        </div>
        <div className="standings-scroll max-h-64 overflow-y-auto overscroll-contain px-1">
          <ConstructorTable
            rows={standings.constructors}
            season={standings.season}
            asOf={standings.asOf}
          />
        </div>
      </div>
    </section>
  );
}
