import { orgsSchema } from "./model";
import { OrgService } from "./service";
import { Elysia } from "elysia";
import { CTError } from "@/utils/errorHandler.util";
import { betterAuth } from "@/middlewares/auth.middleware";

export const orgRoute = new Elysia({ prefix: "/orgs" })
    .use(betterAuth)
    .post("/create", async ({ body, session, status }) => {
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
    .get("/all", async ({ session, status }) => {
        const userOrgs = await OrgService.getUserOrgs({ userId: session.userId });
        return status("OK", { orgs: userOrgs });
    }, { auth: true })

    .get("/:orgId", async ({ params, status }) => {
        const { orgId } = params;
        const orgDetails = await OrgService.getOrgInfo({ orgId });
        return status("OK", { org: orgDetails });
    }, {
        params: orgsSchema.paramSchema
    })