import { unstable_rethrow } from "next/navigation";
import type { ConstructorStanding, DriverStanding } from "./types";
import { standingsLabelForRound } from "./races";

/** How often the Jolpica standings may be reused before a refresh. */
export const STANDINGS_REVALIDATE_SECONDS = 3600;

const DRIVER_STANDINGS_URL =
  "https://api.jolpi.ca/ergast/f1/current/driverStandings.json";
const CONSTRUCTOR_STANDINGS_URL =
  "https://api.jolpi.ca/ergast/f1/current/constructorStandings.json";

/**
 * Short names already used in the sidebar. Jolpica's constructor names are
 * longer ("RB F1 Team", "Haas F1 Team"); the id is the stable key.
 */
const TEAM_LABELS: Record<string, string> = {
  mercedes: "Mercedes",
  ferrari: "Ferrari",
  mclaren: "McLaren",
  red_bull: "Red Bull",
  rb: "Racing Bulls",
  alpine: "Alpine",
  haas: "Haas",
  audi: "Audi",
  williams: "Williams",
  aston_martin: "Aston Martin",
  cadillac: "Cadillac",
};

export interface ChampionshipStandings {
  season: number;
  round: number;
  asOf: string;
  drivers: DriverStanding[];
  constructors: ConstructorStanding[];
  source: "jolpica" | "fallback";
}

/**
 * Championship after the 2026 Singapore Grand Prix (round 17).
 * Checked against Jolpica current standings, formula1.com/en/results/2026/drivers
 * and formula1.com/en/results/2026/team, and the FIA Singapore championship
 * points document published 11 October 2026. Driver points sum to the same
 * 1933 as the constructors' table.
 */
export const fallbackStandings: ChampionshipStandings = {
  season: 2026,
  round: 17,
  asOf: "tras GP Singapur",
  source: "fallback",
  drivers: [
    { position: 1, driver: "Andrea Kimi Antonelli", team: "Mercedes", points: 340 },
    { position: 2, driver: "George Russell", team: "Mercedes", points: 238 },
    { position: 3, driver: "Lewis Hamilton", team: "Ferrari", points: 229 },
    { position: 4, driver: "Max Verstappen", team: "Red Bull", points: 221 },
    { position: 5, driver: "Charles Leclerc", team: "Ferrari", points: 215 },
    { position: 6, driver: "Lando Norris", team: "McLaren", points: 201 },
    { position: 7, driver: "Oscar Piastri", team: "McLaren", points: 138 },
    { position: 8, driver: "Isack Hadjar", team: "Red Bull", points: 97 },
    { position: 9, driver: "Liam Lawson", team: "Racing Bulls", points: 75 },
    { position: 10, driver: "Pierre Gasly", team: "Alpine", points: 41 },
    { position: 11, driver: "Arvid Lindblad", team: "Racing Bulls", points: 38 },
    { position: 12, driver: "Franco Colapinto", team: "Alpine", points: 27 },
    { position: 13, driver: "Oliver Bearman", team: "Haas", points: 23 },
    { position: 14, driver: "Nico Hülkenberg", team: "Audi", points: 13 },
    { position: 15, driver: "Gabriel Bortoleto", team: "Audi", points: 10 },
    { position: 16, driver: "Esteban Ocon", team: "Haas", points: 7 },
    { position: 17, driver: "Fernando Alonso", team: "Aston Martin", points: 7 },
    { position: 18, driver: "Carlos Sainz", team: "Williams", points: 7 },
    { position: 19, driver: "Alexander Albon", team: "Williams", points: 5 },
    { position: 20, driver: "Yuki Tsunoda", team: "Racing Bulls", points: 1 },
    { position: 21, driver: "Lance Stroll", team: "Aston Martin", points: 0 },
    { position: 22, driver: "Valtteri Bottas", team: "Cadillac", points: 0 },
    { position: 23, driver: "Sergio Pérez", team: "Cadillac", points: 0 },
  ],
  constructors: [
    { position: 1, team: "Mercedes", points: 578 },
    { position: 2, team: "Ferrari", points: 444 },
    { position: 3, team: "McLaren", points: 339 },
    { position: 4, team: "Red Bull", points: 332 },
    { position: 5, team: "Racing Bulls", points: 100 },
    { position: 6, team: "Alpine", points: 68 },
    { position: 7, team: "Haas", points: 30 },
    { position: 8, team: "Audi", points: 23 },
    { position: 9, team: "Williams", points: 12 },
    { position: 10, team: "Aston Martin", points: 7 },
    { position: 11, team: "Cadillac", points: 0 },
  ],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function teamLabel(constructors: unknown): string | null {
  if (!Array.isArray(constructors) || constructors.length === 0) return null;
  const first = constructors[0];
  if (!isRecord(first)) return null;
  const id = typeof first.constructorId === "string" ? first.constructorId : "";
  if (id && TEAM_LABELS[id]) return TEAM_LABELS[id];
  return typeof first.name === "string" && first.name.trim() ? first.name : null;
}

function readPoints(value: unknown): number | null {
  const points = typeof value === "string" ? Number(value) : Number.NaN;
  if (!Number.isFinite(points) || points < 0) return null;
  return points;
}

function readPosition(value: unknown): number | null {
  const position = typeof value === "string" ? Number(value) : Number.NaN;
  if (!Number.isInteger(position) || position < 1) return null;
  return position;
}

function parseDrivers(rows: unknown): DriverStanding[] | null {
  if (!Array.isArray(rows) || rows.length < 20) return null;
  const drivers: DriverStanding[] = [];
  for (const row of rows) {
    if (!isRecord(row) || !isRecord(row.Driver)) return null;
    const position = readPosition(row.position);
    const points = readPoints(row.points);
    const given = typeof row.Driver.givenName === "string" ? row.Driver.givenName.trim() : "";
    const family = typeof row.Driver.familyName === "string" ? row.Driver.familyName.trim() : "";
    const team = teamLabel(row.Constructors);
    if (position === null || points === null || !given || !family || !team) return null;
    drivers.push({ position, driver: `${given} ${family}`, team, points });
  }
  return drivers;
}

function parseConstructors(rows: unknown): ConstructorStanding[] | null {
  if (!Array.isArray(rows) || rows.length < 10) return null;
  const constructors: ConstructorStanding[] = [];
  for (const row of rows) {
    if (!isRecord(row)) return null;
    const position = readPosition(row.position);
    const points = readPoints(row.points);
    const team = teamLabel(row.Constructor ? [row.Constructor] : null);
    if (position === null || points === null || !team) return null;
    constructors.push({ position, team, points });
  }
  return constructors;
}

function readRound(payload: unknown, listKey: string): { season: number; round: number; rows: unknown } | null {
  if (!isRecord(payload) || !isRecord(payload.MRData)) return null;
  const table = payload.MRData.StandingsTable;
  if (!isRecord(table) || !Array.isArray(table.StandingsLists) || !table.StandingsLists[0]) {
    return null;
  }
  const list = table.StandingsLists[0];
  if (!isRecord(list)) return null;
  const season = Number(list.season);
  const round = Number(list.round);
  if (!Number.isInteger(season) || !Number.isInteger(round) || round < 1) return null;
  return { season, round, rows: list[listKey] };
}

export function parseJolpicaStandings(
  driverPayload: unknown,
  constructorPayload: unknown,
): ChampionshipStandings {
  const driversList = readRound(driverPayload, "DriverStandings");
  const constructorsList = readRound(constructorPayload, "ConstructorStandings");
  if (!driversList || !constructorsList) {
    throw new Error("Jolpica standings payload is missing a standings list");
  }
  if (driversList.season !== constructorsList.season || driversList.round !== constructorsList.round) {
    throw new Error("Jolpica driver and constructor standings are from different rounds");
  }
  const drivers = parseDrivers(driversList.rows);
  const constructors = parseConstructors(constructorsList.rows);
  if (!drivers || !constructors) {
    throw new Error("Jolpica standings payload failed validation");
  }
  return {
    season: driversList.season,
    round: driversList.round,
    asOf: standingsLabelForRound(driversList.round),
    drivers,
    constructors,
    source: "jolpica",
  };
}

async function fetchStandingsJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    next: { revalidate: STANDINGS_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`Jolpica responded ${response.status} for ${url}`);
  }
  return response.json();
}

/**
 * Live drivers' and constructors' championships.
 * Next.js keeps the last successful response and refreshes it about hourly.
 * A failed refresh does not replace that cached response. When there is no
 * successful response yet, the Singapore fallback is used instead.
 */
export async function getChampionshipStandings(): Promise<ChampionshipStandings> {
  try {
    const [drivers, constructors] = await Promise.all([
      fetchStandingsJson(DRIVER_STANDINGS_URL),
      fetchStandingsJson(CONSTRUCTOR_STANDINGS_URL),
    ]);
    return parseJolpicaStandings(drivers, constructors);
  } catch (error) {
    unstable_rethrow(error);
    console.error("Using fallback standings after Jolpica request failed.", error);
    return fallbackStandings;
  }
}
