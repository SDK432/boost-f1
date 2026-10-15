import type { ConstructorStanding, DriverStanding } from "./types";

/** Season label shown next to the standings tables. */
export const standingsSeason = 2026;

/** Round the tables are current through. */
export const standingsAsOf = "tras GP Malasia (Sepang)";

/**
 * Drivers' championship after the 2026 Malaysia Grand Prix (Sepang).
 * Order and points are authoritative for this site; do not recompute positions.
 */
export const driverStandings: DriverStanding[] = [
  { position: 1, driver: "Andrea Kimi Antonelli", team: "Mercedes", points: 320 },
  { position: 2, driver: "George Russell", team: "Mercedes", points: 236 },
  { position: 3, driver: "Lewis Hamilton", team: "Ferrari", points: 214 },
  { position: 4, driver: "Charles Leclerc", team: "Ferrari", points: 191 },
  { position: 5, driver: "Lando Norris", team: "McLaren", points: 188 },
  { position: 6, driver: "Max Verstappen", team: "Red Bull", points: 188 },
  { position: 7, driver: "Oscar Piastri", team: "McLaren", points: 128 },
  { position: 8, driver: "Isack Hadjar", team: "Red Bull", points: 96 },
  { position: 9, driver: "Liam Lawson", team: "Racing Bulls", points: 65 },
  { position: 10, driver: "Pierre Gasly", team: "Alpine", points: 41 },
  { position: 11, driver: "Arvid Lindblad", team: "Racing Bulls", points: 38 },
  { position: 12, driver: "Franco Colapinto", team: "Alpine", points: 27 },
  { position: 13, driver: "Oliver Bearman", team: "Haas", points: 20 },
  { position: 14, driver: "Gabriel Bortoleto", team: "Audi", points: 10 },
  { position: 15, driver: "Nico Hülkenberg", team: "Audi", points: 7 },
  { position: 16, driver: "Esteban Ocon", team: "Haas", points: 7 },
  { position: 17, driver: "Carlos Sainz", team: "Williams", points: 7 },
  { position: 18, driver: "Fernando Alonso", team: "Aston Martin", points: 7 },
  { position: 19, driver: "Alexander Albon", team: "Williams", points: 5 },
  { position: 20, driver: "Yuki Tsunoda", team: "Racing Bulls", points: 1 },
  { position: 21, driver: "Lance Stroll", team: "Aston Martin", points: 0 },
  { position: 22, driver: "Valtteri Bottas", team: "Cadillac", points: 0 },
  { position: 23, driver: "Sergio Pérez", team: "Cadillac", points: 0 },
];

/** Constructors' championship after the 2026 Malaysia Grand Prix (Sepang). */
export const constructorStandings: ConstructorStanding[] = [
  { position: 1, team: "Mercedes", points: 556 },
  { position: 2, team: "Ferrari", points: 405 },
  { position: 3, team: "McLaren", points: 316 },
  { position: 4, team: "Red Bull", points: 298 },
  { position: 5, team: "Racing Bulls", points: 90 },
  { position: 6, team: "Alpine", points: 68 },
  { position: 7, team: "Haas", points: 27 },
  { position: 8, team: "Audi", points: 17 },
  { position: 9, team: "Williams", points: 12 },
  { position: 10, team: "Aston Martin", points: 7 },
  { position: 11, team: "Cadillac", points: 0 },
];
