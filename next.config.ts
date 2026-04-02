import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/openstudio/:path*",
        has: [{ type: "host", value: "rune.gl" }],
        destination: "https://openstudio.gl/:path*",
        permanent: true,
      },
      {
        source: "/openstudio",
        has: [{ type: "host", value: "rune.gl" }],
        destination: "https://openstudio.gl",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
