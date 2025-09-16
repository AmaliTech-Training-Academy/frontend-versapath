import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "versapath-images.s3.eu-west-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
