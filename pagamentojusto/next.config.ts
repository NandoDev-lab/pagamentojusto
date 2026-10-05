import type { NextConfig } from "next";

const basePath = process.env.GITHUB_ACTIONS ? "/pagamentojusto" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  reactStrictMode: true,
};

export default nextConfig;
