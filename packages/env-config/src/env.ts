import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.coerce.number().optional(),

    API_URL: z.url(),
    WEB_URL: z.url(),

    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_ACCEPT_METHODS: z
      .string()
      .transform((val) =>
        val.split(",").map((method) => method.trim().toUpperCase()),
      )
      .default(["POST", "GET"]),

    RESEND_API_KEY: z.string(),
    RESEND_FROM_EMAIL: z.email(),

    LOCAL_DB_URL: z.url().optional(),
    PROD_DB_URL: z.url().optional(),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV === "development" && !env.LOCAL_DB_URL) {
      ctx.addIssue({
        code: "custom",
        path: ["LOCAL_DB_URL"],
        message: "LOCAL_DB_URL is required in development",
      });
    }

    if (env.NODE_ENV === "production" && !env.PROD_DB_URL) {
      ctx.addIssue({
        code: "custom",
        path: ["PROD_DB_URL"],
        message: "PROD_DB_URL is required in production",
      });
    }
  });

type EnvType = z.infer<typeof envSchema>;

let cachedEnv: EnvType | null = null;
const loadEnv = (): EnvType => {
  if (cachedEnv) return cachedEnv;

  const parsedEnv = envSchema.safeParse(process.env);
  const { data, success, error } = parsedEnv;

  if (!success) {
    const errors = Object.keys(error.flatten().fieldErrors);
    console.error(
      "Check these Environment Variables: ",
      JSON.stringify(errors, null, 2),
    );
    process.exit(1);
  }

  cachedEnv = data;
  return cachedEnv;
};

export const env = loadEnv();
export default env;
