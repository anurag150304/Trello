import { Elysia, status } from "elysia";
import { authSchema } from "./model";
import { AuthService } from "./service";
import { CTError } from "@/utils/errorHandler.util";
import { betterAuth } from "@/middlewares/auth.middleware";

export const authRoute = new Elysia({ prefix: "/auth" })
    .use(betterAuth)
    .post("/sign-up", async ({ body, user }) => {
        const alreadyEsists = await AuthService.findUser(body.email);
        if (alreadyEsists) throw new CTError(409, "email already taken!");

        const res = await AuthService.createUser(body);
        return status("Created", { userId: res[0]?.insertedId });
    }, {
        body: authSchema.signupSchema,
        auth: true // for macro activation (this will send the resolved properties to the routes)
    });