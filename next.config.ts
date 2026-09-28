import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/articles/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
