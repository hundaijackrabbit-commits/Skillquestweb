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
  async headers() {
    return [
      {
        source: '/downloads/ModernSkillLab_Career_and_Life_Map.pdf',
        headers: [
          { key: 'Content-Disposition', value: 'attachment; filename="ModernSkillLab_Career_and_Life_Map.pdf"' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
