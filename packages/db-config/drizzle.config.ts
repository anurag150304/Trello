import { defineConfig } from "drizzle-kit";
import { env } from "@repo/env-config/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: env.NODE_ENV === "production" ? env.PROD_DB_URL! : env.LOCAL_DB_URL!,
  },
});
