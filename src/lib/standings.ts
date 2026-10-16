import type { ConstructorStanding, DriverStanding } from "./types";

/** Season label shown next to the standings tables. */
export const standingsSeason = 2026;

/** Round the tables are current through. */
export const standingsAsOf = "tras GP Singapur";

/**
 * Drivers' championship after the 2026 Singapore Grand Prix (Marina Bay).
 * Order and points are authoritative for this site; do not recompute positions.
 */
export const driverStandings: DriverStanding[] = [
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
];

/** Constructors' championship after the 2026 Singapore Grand Prix (Marina Bay). */
export const constructorStandings: ConstructorStanding[] = [
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
];
