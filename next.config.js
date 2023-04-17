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
    };
  },
};

module.exports = nextConfig;

// next.config.js
// const withTM = require("next-transpile-modules")([
// "@apollo/client",
// "firebase",
// "@apollo/client",
// "@google-cloud/secret-manager",
// "@prisma/client",
// "@superlore/helpers",
// "@types/pg",
// "@types/react",
// "@types/react-dom",
// "autoprefixer",
// "eslint",
// "eslint-config-next",
// "firebase",
// "google-auth-library",
// "graphql",
// "graphql-scalars",
// "graphql-yoga",
// "langchain",
// "next",
// "next-transpile-modules",
// "pg",
// "postcss",
// "react",
// "react-dom",
// "socket.io-client",
// "tailwindcss",
// "tsconfig-paths",
// "@eddeee888/gcg-typescript-resolver-files",
// "@graphql-codegen/cli",
// "@types/node",
// "nodemon",
// "prisma",
// ]); // pass the modules you would like to see transpiled

// module.exports = withTM({
//   reactStrictMode: true,
// });
