import { type Context } from "elysia";
import { auth } from "@repo/auth-config/api";
import { env } from "@repo/env-config/env";

export async function authHandler(ctx: Context) {
    // validate request method
    if (!env.BETTER_AUTH_ACCEPT_METHODS.includes(ctx.request.method)) {
        return ctx.status(405);
    }

    const res = await auth.handler(ctx.request);
    return res;
}
