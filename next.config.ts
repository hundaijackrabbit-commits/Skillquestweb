import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Host redirects are handled before the filesystem, which makes the owned
  // domain the unambiguous destination for users and search crawlers.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'skillquestweb.vercel.app' }],
        destination: 'https://modernskilllab.space/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.modernskilllab.space' }],
        destination: 'https://modernskilllab.space/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
