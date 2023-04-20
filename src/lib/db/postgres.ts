// database.ts

import { Pool, PoolClient } from "pg";
import path from "path";
import fs from "fs";
import getPostgresConfig from "@/lib/db/config";

// let pool: Pool | null = null;
// let client: PoolClient | null = null;

// Function to create a connection pool to the PostgreSQL database
// export async function initializePool() {
//   console.log("Attempting to connect to PostgreSQL database");
//   const config = await getPostgresConfig();
//   pool = new Pool(config.database);
//   console.log("Testing db pool connection...");
//   client = await pool.connect();
//   try {
//     console.log("Successfully connected to the database");
//   } catch (err) {
//     console.error("Error connecting to the database:", err);
//     throw Error("Could not connect to pool");
//   } finally {
//     client.release();
//   }
// }

// export const getPool = () => {
//   if (!pool) {
//     throw new Error(
//       "Database pool not initialized. Call initializePool() first."
//     );
//   }
//   if (!client) {
//     throw new Error(
//       "Database client not initialized. Call initializePool() first."
//     );
//   }
//   return { pool, client };
// };

export const createDatabase = async () => {
  const { pool } = getPool();
  try {
    // Update the path to your .sql file
    const sqlFilePath = path.join(__dirname, "./schema.sql");
    const schemaSql = fs.readFileSync(sqlFilePath, "utf-8");

    await pool.query(schemaSql);
    console.log("Schema created successfully");
  } catch (error) {
    console.error("Error creating schema:", error);
  } finally {
    pool.end();
  }
};

// export const migrateDatabase = async (migrationFileName: string) => {
//   const { pool } = getPool();
//   try {
//     // Update the path to your .sql file
//     const migrationFilePath = path.join(
//       __dirname,
//       `./migrations/${migrationFileName}`
//     );
//     const migrationSql = fs.readFileSync(migrationFilePath, "utf-8");

//     await pool.query("BEGIN");
//     await pool.query(migrationSql);
//     await pool.query("COMMIT");
//     console.log("Schema created successfully");
//   } catch (error) {
//     console.error("Error during migration:", (error as Error).message);
//     await pool.query("ROLLBACK");
//   } finally {
//     // Close the database connection
//     await pool.end();
//   }
// };

class Database {
  pool: Pool | null = null;
  client: PoolClient | null = null;
  isInitialized = false;

  async initializePool() {
    console.log(`isInitialized=${this.isInitialized}`);
    if (this.isInitialized) {
      console.log("Database already initialized. Skipping initialization.");
      return;
    }

    console.log("Attempting to connect to PostgreSQL database");
    const config = await getPostgresConfig();
    this.pool = new Pool(config.database);
    console.log("Testing db pool connection...");
    this.client = await this.pool.connect();
    try {
      console.log("Successfully connected to the database");
      this.isInitialized = true;
    } catch (err) {
      console.error("Error connecting to the database:", err);
      throw Error("Could not connect to pool");
    } finally {
      this.client.release();
    }
  }
}

// Create a single instance of the Database class
const databaseInstance = new Database();

// Export the instance's initializePool method
export const initializePool = () => databaseInstance.initializePool();

// initializePool();

export const getPool = () => {
  if (!databaseInstance.pool) {
    throw new Error(
      "Database pool not initialized. Call initializePool() first."
    );
  }
  if (!databaseInstance.client) {
    throw new Error(
      "Database client not initialized. Call initializePool() first."
    );
  }
  return { pool: databaseInstance.pool, client: databaseInstance.client };
};
