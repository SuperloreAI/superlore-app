import { migrateDatabase, initializePool } from "@/lib/db/postgres";

// npx ts-node --project tsconfig.scripts.json -r tsconfig-paths/register ./src/scripts/migratedb.ts
const run = async () => {
  await initializePool();
  await migrateDatabase("2023_04_08_update_schema.sql");
};

run();
