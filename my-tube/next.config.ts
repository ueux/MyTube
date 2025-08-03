import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname:"c1m06bxbr9.ufs.sh"
    }]
  }
};

export default nextConfig;
