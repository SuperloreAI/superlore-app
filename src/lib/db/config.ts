import { getPostgresPassword } from "@/lib/secrets/secrets";

// config.ts
const postgresConfig = {
  database: {
    host: "35.222.129.117", // or Private IP if you're using it
    port: 5432, // Default PostgreSQL port
    user: "postgres",
    password: "password",
    database: "main",
  },
};

const getPostgresConfig = async () => {
  const password = await getPostgresPassword();
  console.log(`Retrieved getPostgresConfig`);
  return {
    ...postgresConfig,
    database: {
      ...postgresConfig.database,
      password,
    },
  };
};

export default getPostgresConfig;
