import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    unoptimized:true,
    domains:[],
  },
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  /* config options here */
};

export default nextConfig;
