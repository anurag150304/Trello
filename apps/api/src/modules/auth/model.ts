// import { models } from "@repo/db-config/models";
// import { createInsertSchema } from "drizzle-orm/typebox-legacy";
// import { t, type UnwrapSchema } from "elysia";

// const _createUser = createInsertSchema(models.user, {
//     name: t.String(),
//     email: t.String({ format: "email" })
// });

// export const authSchema = {
//     signupSchema: t.Omit(_createUser, ["id", "createdAt"]),
// }

// export type authSchema = {
//     [k in keyof typeof authSchema]: UnwrapSchema<(typeof authSchema)[k]>
// }