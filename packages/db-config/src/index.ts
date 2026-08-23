import { Pool } from "pg";
import { env } from "@repo/env-config";
import { relations } from "./db/schema";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({ connectionString: env.DATABASE_URL });
export const db = drizzle({ client: pool, relations });
export default db;
