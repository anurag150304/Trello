import { t, type UnwrapSchema } from "elysia";
import { models, db } from "@repo/db-config/DB";
import { createInsertSchema } from "drizzle-typebox";

const _createOrg = createInsertSchema(models.orgs, {
    name: t.String(),
    website: t.Optional(t.String()),
    createdBy: t.Optional(t.String())
});

export const orgsSchema = {
    createSchema: t.Omit(_createOrg, ["id", "createdAt"])
}

export type orgsSchema = {
    [k in keyof typeof orgsSchema]: UnwrapSchema<(typeof orgsSchema)[k]>
}
