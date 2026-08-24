import { models } from "@repo/db-config/DB";
import { createInsertSchema } from "drizzle-typebox";
import { t, type UnwrapSchema } from "elysia";

const _createUser = createInsertSchema(models.users, {
    firstName: t.String(),
    lastName: t.Optional(t.String()),
    email: t.String({ format: "email" })
});

export const authSchema = {
    signupSchema: t.Omit(_createUser, ["id", "createdAt"]),
}

export type authSchema = {
    [k in keyof typeof authSchema]: UnwrapSchema<(typeof authSchema)[k]>
}