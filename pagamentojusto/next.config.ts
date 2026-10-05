import type { NextConfig } from "next";

// Aplica o caminho do repositório somente no build publicado pelo GitHub Actions.
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
