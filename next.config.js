/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      "/": { page: "/" },
      "/canvas": { page: "/canvas" },
      "/template": { page: "/template" },
      "/auth/login": { page: "/auth/login" },
      "/auth/logout": {
        page: "/auth/logout",
      },
      "/auth/complete-login": {
        page: "/auth/complete-login",
      },
      "/auth/guarded-demo": {
        page: "/auth/guarded-demo",
      },
      "/mascot/create-mascot": { page: "/mascot/create-mascot" },
      "/assets/downloader": { page: "/assets/downloader" },
      "/assets/library": { page: "/assets/library" },
      "/assets/media/[mediaID]": { page: "/assets/media/[mediaID]" },
      "/assets/clipper/[mediaID]": { page: "/assets/clipper/[mediaID]" },
      "/videos/history": { page: "/videos/history" },
      "/videos/create": { page: "/videos/create" },
      "/videos/screenplay": { page: "/videos/screenplay" },
    };
  },
};

module.exports = nextConfig;
