import { betterAuth } from "@/middlewares/auth.middleware";
import Elysia, { status } from "elysia";
import { orgsSchema } from "./model";
import { OrgService } from "./service";
import { CTError } from "@/utils/errorHandler.util";

export const orgRoute = new Elysia({ prefix: "/orgs" })
    .use(betterAuth)
    .post("/create", async ({ body, session }) => {
        const alreadyExists = await OrgService.findOrg({ name: body.name });
        if (alreadyExists) throw new CTError(409, "Org already taken by someone!");

        const newOrg = await OrgService.createOrg({ ...body, createdBy: session.userId });
        return status("Created", {
            message: "Org created sucessfully",
            orgId: newOrg[0]?.orgId
        });
    }, {
        body: orgsSchema.createSchema,
        auth: true
    })