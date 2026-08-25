import { Elysia, status } from "elysia";
import { authSchema } from "./model";
import { AuthService } from "./service";
import { CTError } from "@/utils/errorHandler.util";

export const authRoute = new Elysia({ prefix: "/auth" })
    .post("/sign-up", async ({ body }) => {
        const alreadyEsists = await AuthService.findUser(body.email);
        if (alreadyEsists) throw new CTError(409, "email already taken!");

        const res = await AuthService.createUser(body);
        return status("Created", { userId: res[0]?.insertedId });
    }, {
        body: authSchema.signupSchema
    });