import type { ConstructorStanding, DriverStanding } from "./types";

/** Datos de demostración — no oficiales. Temporada ficticia 2026. */
export const driverStandings: DriverStanding[] = [
  { position: 1, driver: "Máximo Rivas", team: "Scuderia Nova", points: 287 },
  { position: 2, driver: "Liam Ortega", team: "Apex Racing", points: 264 },
  { position: 3, driver: "Sofía Brandt", team: "Velocity GP", points: 241 },
  { position: 4, driver: "Kai Nakamura", team: "Horizon F1", points: 198 },
  { position: 5, driver: "Elena Vargas", team: "Scuderia Nova", points: 176 },
];

export const constructorStandings: ConstructorStanding[] = [
  { position: 1, team: "Scuderia Nova", points: 463 },
  { position: 2, team: "Apex Racing", points: 412 },
  { position: 3, team: "Velocity GP", points: 356 },
  { position: 4, team: "Horizon F1", points: 298 },
  { position: 5, team: "Atlas Motors", points: 187 },
];
