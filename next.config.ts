import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/stroom",
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/stroom",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
