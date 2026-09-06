import { type Context } from "elysia";
import { auth } from "@repo/auth-config/api";

export async function authHandler(ctx: Context) {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
    // validate request method
    if (BETTER_AUTH_ACCEPT_METHODS.includes(ctx.request.method)) {
        const res = await auth.handler(ctx.request);
        console.log("res : ", res);
        return res;
    } else {
        console.log("error occured")
        ctx.status(405)
    }
}
