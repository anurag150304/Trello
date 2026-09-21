import { departSchema } from "./model";
import { DepartService } from "./service";
import { Elysia, status } from "elysia";
import { betterAuth } from "@/middlewares/auth.middleware";
import app from "@/app";

export const departRoute = new Elysia({ prefix: "/departs" })
  .use(betterAuth)
  .post(
    "/create",
    async ({ body, status }) => {
      const newOrg = await DepartService.createDepart({
        ...body,
      });
      return status("Created", {
        message: "Org created sucessfully",
        orgId: newOrg?.orgId,
      });
    },
    {
      body: departSchema.createSchema,
      auth: true,
    },
  )
  .get(
    "/all",
    async ({ status, query }) => {
      const orgDeparts = await DepartService.getOrgDeparts({
        orgId: query.orgId,
      });
      return status("OK", { departs: orgDeparts });
    },
    {
      async beforeHandle({ user, query }) {
        const { orgId } = query;
        const org = await DepartService.findOrg({ orgId });

        if (!org)
          return status("Forbidden", { error: "Un-registered org", orgId });
        if (org.ownerId !== user.id)
          return status("Forbidden", { error: "Access Denied!" });
      },

      auth: true,
      query: departSchema.querySchema,
    },
  )

  .get(
    "/:departId",
    async ({ params, status }) => {
      const { departId } = params;
      const departInfo = await DepartService.getDepartInfo({ departId });
      return status("OK", { depart: departInfo });
    },
    {
      auth: true,
      params: departSchema.paramSchema,
    },
  );
