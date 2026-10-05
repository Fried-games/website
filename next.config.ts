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
      // Crawlers look for these at the domain root; the app lives under basePath.
      {
        source: "/robots.txt",
        destination: "/stroom/robots.txt",
        permanent: true,
        basePath: false,
      },
      {
        source: "/sitemap.xml",
        destination: "/stroom/sitemap.xml",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
