import { Pool } from "pg";
import { relations } from "./relations";
import { env } from "@repo/env-config/env";
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({
    connectionString: env.DATABASE_URL,
})
export const db = drizzle({ client: pool, relations });
