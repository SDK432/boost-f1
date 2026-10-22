import type { NextConfig } from "next";

// OpenNext sets NEXT_PRIVATE_STANDALONE before it runs `next build`.
// Workers Builds also sets WORKERS_CI=1. Railway sets neither.
const cloudflareBuild =
  process.env.WORKERS_CI === "1" ||
  process.env.NEXT_PRIVATE_STANDALONE === "true";

const nextConfig: NextConfig = {
  images: {
    // Workers cannot run the sharp optimizer. Files in public/ are the
    // images the site already shows. Railway keeps Next's optimizer.
    unoptimized: cloudflareBuild,
    localPatterns: [
      {
        pathname: "/articles/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

// Dev-only, and not a static import: Railway can prune devDependencies
// before `next start`, and this package is one of them.
if (process.env.NODE_ENV === "development") {
  void import("@opennextjs/cloudflare")
    .then((mod) => mod.initOpenNextCloudflareForDev())
    .catch((error: unknown) => {
      console.warn(
        "OpenNext Cloudflare dev bindings were not initialized.",
        error instanceof Error ? error.message : error,
      );
    });
}
