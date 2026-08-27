import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: z.url(),
    PORT: z.coerce.number().default(8000),
    RESEND_API_KEY: z.string(),
    RESEND_FROM_EMAIL: z.email(),
});

type EnvType = z.infer<typeof envSchema>;

let cachedEnv: EnvType | null = null;
const loadEnv = (): EnvType => {
    if (cachedEnv) return cachedEnv;

    const parsedEnv = envSchema.safeParse(process.env);
    const { data, success, error } = parsedEnv;
    if (!success) {
        const errors = Object.keys(error.flatten().fieldErrors);
        console.error("Check these Environment Variables: ", JSON.stringify(errors, null, 2));
        process.exit(1);
    }
    cachedEnv = data;
    return cachedEnv;
}

export const env = loadEnv();
export default env;