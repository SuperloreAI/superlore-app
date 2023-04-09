import { initializePool, getPool } from "@/lib/db/postgres";
import { Pool } from "pg";
import { CompanyID } from "@/lib/db/types";

(async () => {
  await initializePool();
})();

export async function createCompany(
  name: string,
  thumbnail: string
): Promise<void> {
  const { pool } = getPool();
  const query = "INSERT INTO companies (name, thumbnail) VALUES ($1, $2)";
  const values = [name, thumbnail];
  const res = await pool.query(query, values);
  const fields = res.fields;
}

export async function addStaffMember(
  name: string,
  email: string,
  companyId: CompanyID,
  isAdmin: boolean,
  thumbnail: string
): Promise<void> {
  const { pool } = getPool();
  const query =
    "INSERT INTO staff (name, email, company_id, is_admin, thumbnail) VALUES ($1, $2, $3, $4, $5)";
  const values = [name, email, companyId, isAdmin, thumbnail];
  await pool.query(query, values);
}
