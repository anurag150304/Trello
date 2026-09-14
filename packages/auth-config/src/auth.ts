import { db } from "@repo/db-config";
import models from "@repo/db-config"
import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "better-auth";

export const auth = betterAuth({

  baseURL: env.BETTER_AUTH_URL,
  basePath: "/api/v1/auth",
  trustedOrigins: ["http://localhost:3000"],

  // DB init
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: models.user,
      session: models.session,
      account: models.account,
      verification: models.verification
    }
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
