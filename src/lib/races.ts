import type { NextRace } from "./types";

/**
 * A grand prix counts as finished this long after the scheduled start.
 * The race itself is two hours; suspensions can run the clock out to three.
 */
export const RACE_DURATION_MS = 3 * 60 * 60 * 1000;

/**
 * 2026 FIA Formula One World Championship calendar.
 * Start instants are the official race starts published by Jolpica
 * (api.jolpi.ca/ergast/f1/current.json) and checked against the Formula 1
 * calendar (formula1.com/en/racing/2026). The United States Grand Prix start
 * matches the Formula 1 timetable: 15:00 local in Austin on 25 October 2026.
 */
export const seasonCalendar: NextRace[] = [
  {
    round: 1,
    name: "Gran Premio de Australia",
    shortName: "Australia",
    circuit: "Albert Park Grand Prix Circuit",
    country: "Australia",
    date: "2026-03-08T04:00:00Z",
  },
  {
    round: 2,
    name: "Gran Premio de China",
    shortName: "China",
    circuit: "Shanghai International Circuit",
    country: "China",
    date: "2026-03-15T07:00:00Z",
  },
  {
    round: 3,
    name: "Gran Premio de Japón",
    shortName: "Japón",
    circuit: "Suzuka Circuit",
    country: "Japón",
    date: "2026-03-29T05:00:00Z",
  },
  {
    round: 4,
    name: "Gran Premio de Miami",
    shortName: "Miami",
    circuit: "Miami International Autodrome",
    country: "Estados Unidos",
    date: "2026-05-03T20:00:00Z",
  },
  {
    round: 5,
    name: "Gran Premio de Canadá",
    shortName: "Canadá",
    circuit: "Circuit Gilles Villeneuve",
    country: "Canadá",
    date: "2026-05-24T20:00:00Z",
  },
  {
    round: 6,
    name: "Gran Premio de Mónaco",
    shortName: "Mónaco",
    circuit: "Circuit de Monaco",
    country: "Mónaco",
    date: "2026-06-07T13:00:00Z",
  },
  {
    round: 7,
    name: "Gran Premio de Barcelona-Catalunya",
    shortName: "Barcelona",
    circuit: "Circuit de Barcelona-Catalunya",
    country: "España",
    date: "2026-06-14T13:00:00Z",
  },
  {
    round: 8,
    name: "Gran Premio de Austria",
    shortName: "Austria",
    circuit: "Red Bull Ring",
    country: "Austria",
    date: "2026-06-28T13:00:00Z",
  },
  {
    round: 9,
    name: "Gran Premio de Gran Bretaña",
    shortName: "Gran Bretaña",
    circuit: "Silverstone Circuit",
    country: "Gran Bretaña",
    date: "2026-07-05T14:00:00Z",
  },
  {
    round: 10,
    name: "Gran Premio de Bélgica",
    shortName: "Bélgica",
    circuit: "Circuit de Spa-Francorchamps",
    country: "Bélgica",
    date: "2026-07-19T13:00:00Z",
  },
  {
    round: 11,
    name: "Gran Premio de Hungría",
    shortName: "Hungría",
    circuit: "Hungaroring",
    country: "Hungría",
    date: "2026-07-26T13:00:00Z",
  },
  {
    round: 12,
    name: "Gran Premio de los Países Bajos",
    shortName: "Países Bajos",
    circuit: "Circuit Park Zandvoort",
    country: "Países Bajos",
    date: "2026-08-23T13:00:00Z",
  },
  {
    round: 13,
    name: "Gran Premio de Italia",
    shortName: "Italia",
    circuit: "Autodromo Nazionale di Monza",
    country: "Italia",
    date: "2026-09-06T13:00:00Z",
  },
  {
    round: 14,
    name: "Gran Premio de España",
    shortName: "España",
    circuit: "Madring",
    country: "España",
    date: "2026-09-13T13:00:00Z",
  },
  {
    round: 15,
    name: "Gran Premio de Azerbaiyán",
    shortName: "Azerbaiyán",
    circuit: "Baku City Circuit",
    country: "Azerbaiyán",
    date: "2026-09-26T11:00:00Z",
  },
  {
    round: 16,
    name: "Gran Premio de Baréin en Malasia",
    shortName: "Malasia",
    circuit: "Sepang International Circuit",
    country: "Malasia",
    date: "2026-10-04T07:00:00Z",
  },
  {
    round: 17,
    name: "Gran Premio de Singapur",
    shortName: "Singapur",
    circuit: "Marina Bay Street Circuit",
    country: "Singapur",
    date: "2026-10-11T12:00:00Z",
  },
  {
    round: 18,
    name: "Gran Premio de Estados Unidos",
    shortName: "Estados Unidos",
    circuit: "Circuit of the Americas",
    country: "Estados Unidos",
    date: "2026-10-25T20:00:00Z",
  },
  {
    round: 19,
    name: "Gran Premio de la Ciudad de México",
    shortName: "Ciudad de México",
    circuit: "Autódromo Hermanos Rodríguez",
    country: "México",
    date: "2026-11-01T20:00:00Z",
  },
  {
    round: 20,
    name: "Gran Premio de São Paulo",
    shortName: "São Paulo",
    circuit: "Autódromo José Carlos Pace",
    country: "Brasil",
    date: "2026-11-08T17:00:00Z",
  },
  {
    round: 21,
    name: "Gran Premio de Las Vegas",
    shortName: "Las Vegas",
    circuit: "Las Vegas Strip Street Circuit",
    country: "Estados Unidos",
    date: "2026-11-22T04:00:00Z",
  },
  {
    round: 22,
    name: "Gran Premio de Catar",
    shortName: "Catar",
    circuit: "Lusail International Circuit",
    country: "Catar",
    date: "2026-11-29T16:00:00Z",
  },
  {
    round: 23,
    name: "Gran Premio de Abu Dabi",
    shortName: "Abu Dabi",
    circuit: "Yas Marina Circuit",
    country: "Emiratos Árabes Unidos",
    date: "2026-12-06T13:00:00Z",
  },
];

export function hasRaceEnded(race: NextRace, now: Date): boolean {
  const start = Date.parse(race.date);
  if (Number.isNaN(start)) return false;
  return start + RACE_DURATION_MS <= now.getTime();
}

/** First race that has not finished. After the finale, returns that finale. */
export function getNextRace(
  now: Date,
  calendar: NextRace[] = seasonCalendar,
): NextRace {
  const upcoming = calendar
    .filter((race) => !hasRaceEnded(race, now))
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  if (upcoming.length > 0) return upcoming[0];

  return calendar.reduce((latest, race) =>
    Date.parse(race.date) > Date.parse(latest.date) ? race : latest,
  );
}

/** Most recent race whose start window has closed, if any. */
export function getLatestCompletedRace(
  now: Date,
  calendar: NextRace[] = seasonCalendar,
): NextRace | null {
  const completed = calendar
    .filter((race) => hasRaceEnded(race, now))
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  return completed.at(-1) ?? null;
}

export function isSeasonComplete(
  now: Date,
  calendar: NextRace[] = seasonCalendar,
): boolean {
  return calendar.length > 0 && calendar.every((race) => hasRaceEnded(race, now));
}

/** Label for the standings card, e.g. "tras GP Singapur". */
export function standingsLabelForRound(
  round: number,
  calendar: NextRace[] = seasonCalendar,
): string {
  const race = calendar.find((entry) => entry.round === round);
  return race ? `tras GP ${race.shortName}` : `tras ronda ${round}`;
}
