import { t, type UnwrapSchema } from "elysia";
import { models } from "@repo/db-config/models";
import { createInsertSchema } from "drizzle-orm/typebox-legacy";

const _createOrg = createInsertSchema(models.orgs, {
    name: t.String(),
    website: t.Optional(t.String()),
    createdBy: t.Optional(t.String())
});

export const orgsSchema = {
    createSchema: t.Omit(_createOrg, ["id", "createdAt"]),
    paramSchema: t.Object({ orgId: t.Number() })
}

export type orgsSchema = {
    [k in keyof typeof orgsSchema]: UnwrapSchema<(typeof orgsSchema)[k]>
}
