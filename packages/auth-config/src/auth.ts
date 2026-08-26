import { db } from "@repo/db-config/DB";
import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sendEmail } from "./resend-config";

export const auth = betterAuth({
    database: drizzleAdapter(db, { provider: "pg" }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }, req) => {
            void sendEmail({
                to: user.email,
                subject: "Verify your email address",
                html: `Click the link to verify your email: ${url}`,
            });
        }
    },
    advanced: {
        database: {
            joins: true
        }
    }
});