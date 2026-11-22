import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  experimental: {
    agentUpgrade: "security",
  },
  async redirects() {
    return [
      { source: "/about", destination: "/#parcours", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
