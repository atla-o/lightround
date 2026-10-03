import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: ["@google-cloud/firestore"],
  // Cloud Agent previews open the dev server on 127.0.0.1. Next only allows
  // localhost for dev assets unless this host is listed.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
