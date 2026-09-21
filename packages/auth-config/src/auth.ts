import { db } from "@repo/db-config";
import models from "@repo/db-config";
import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "@repo/env-config/env";

export const auth = betterAuth({
  baseURL:
    env.NODE_ENV === "production" ? env.API_URL : "http://localhost:8000",
  basePath: "/api/v1/auth",
  trustedOrigins:
    env.NODE_ENV === "production" ? [env.WEB_URL!] : ["http://localhost:3000"],

  // DB init
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: models.user,
      session: models.session,
      account: models.account,
      verification: models.verification,
    },
  }),

  // Auth Providers
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url, token }, req) => {
  //     void sendEmail({
  //       to: user.email,
  //       subject: "Verify your email address",
  //       html: `<h4>Click the link to verify your email: <a>${url}</a></h4>`,
  //     });
  //   },
  //   autoSignInAfterVerification: true,
  //   sendOnSignUp: true
  // }
});
