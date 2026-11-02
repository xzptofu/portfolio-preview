import type { NextConfig } from "next";
import { previewBasePath } from "./app/site-path";

const nextConfig: NextConfig = {
  output: "export",
  basePath: previewBasePath,
  trailingSlash: true,
};

export default nextConfig;
