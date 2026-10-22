import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Prerendered pages are served from Workers static assets.
 * Hourly revalidation needs an R2 bucket and a Durable Object queue, which
 * are not provisioned here. A new deploy refreshes the baked pages.
 */
const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

// OpenNext's default is `npm run build`. Point it at the Next.js build so
// the WORKERS_CI wrapper in `scripts/build.mjs` is not invoked again.
config.buildCommand = "npm run build:next";

export default config;
