import { env } from "@repo/env-config/env";
import { relations } from "./db/schema";
import { drizzle } from 'drizzle-orm/bun-sql';
import { SQL } from 'bun';

const client = new SQL(env.DATABASE_URL);
export const db = drizzle({ client, relations });
