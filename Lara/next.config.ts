import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Explicitly set turbopack root to avoid workspace/root inference across copies
  turbopack: {
    root: path.resolve(__dirname),
  } as any,
};

export default nextConfig;
