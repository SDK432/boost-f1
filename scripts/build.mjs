/**
 * One `npm run build` for both hosts.
 *
 * Railway runs this with no Cloudflare variables and gets `next build`, then
 * `npm start` (`next start`). Cloudflare Workers Builds sets WORKERS_CI=1 and
 * gets the OpenNext worker build instead.
 *
 * `opennextjs-cloudflare build` invokes the package.json build command. That
 * command is `build:next` (see open-next.config.ts), not this script, so the
 * Workers path does not call itself again.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const cloudflare = process.env.WORKERS_CI === "1";

const result = spawnSync(cloudflare ? "opennextjs-cloudflare" : "next", ["build"], {
  stdio: "inherit",
  env: process.env,
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

if ((result.status ?? 1) !== 0) {
  process.exit(result.status ?? 1);
}

if (cloudflare) {
  // `wrangler preview` does not populate the cache. Copy the prerendered
  // cache into the assets directory the same way `populateCache` does, so
  // the dashboard preview command can deploy what the build just produced.
  const from = path.join(".open-next", "cache");
  const to = path.join(".open-next", "assets", "cdn-cgi", "_next_cache");
  if (fs.existsSync(from)) {
    fs.cpSync(from, to, { recursive: true });
  }
}
