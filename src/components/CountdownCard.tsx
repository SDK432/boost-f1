"use client";

import { useEffect, useState } from "react";
import { getNextRace, isSeasonComplete } from "@/lib/races";
import type { NextRace } from "@/lib/types";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  past: boolean;
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, past: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, past: false };
}

export default function CountdownCard({ initialRace }: { initialRace: NextRace }) {
  const [race, setRace] = useState(initialRace);
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [seasonOver, setSeasonOver] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = getNextRace(now);
      setRace(next);
      setSeasonOver(isSeasonComplete(now));
      setTime(calcTimeLeft(next.date));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = time
    ? [
        { label: "Días", value: time.days },
        { label: "Hrs", value: time.hours },
        { label: "Min", value: time.minutes },
        { label: "Seg", value: time.seconds },
      ]
    : [
        { label: "Días", value: "—" },
        { label: "Hrs", value: "—" },
        { label: "Min", value: "—" },
        { label: "Seg", value: "—" },
      ];

  return (
    <section className="rounded-xl border border-[#E10600]/40 bg-gradient-to-br from-zinc-950 via-black to-red-950/40 p-5 md:p-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E10600]/10 blur-3xl rounded-full" />
      <div className="relative">
        <div className="mb-1 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#E10600] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#E10600] font-bold">
            Próxima carrera · Ronda {race.round}
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-black text-white mb-1">
          {race.name}
        </h2>
        <p className="text-sm text-zinc-400 mb-5">
          {race.circuit} · {race.country}
        </p>

        {seasonOver ? (
          <p className="text-sm text-zinc-300">La temporada ha terminado.</p>
        ) : time?.past ? (
          <p className="text-sm text-zinc-300">El gran premio ya ha comenzado.</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {units.map((u) => (
              <div
                key={u.label}
                className="rounded-lg border border-white/10 bg-black/50 px-2 py-3 text-center"
              >
                <p className="racing-number text-2xl md:text-3xl text-white tabular-nums">
                  {typeof u.value === "number"
                    ? String(u.value).padStart(2, "0")
                    : u.value}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">
                  {u.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
