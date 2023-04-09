import { createDatabase, initializePool } from "@/lib/db/postgres";

// npx ts-node --project tsconfig.scripts.json -r tsconfig-paths/register ./src/scripts/initializedb.ts
const run = async () => {
  await initializePool();
  await createDatabase();
};

run();
