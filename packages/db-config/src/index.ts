export { db } from "./db";
export { relations } from "./relations";

import { user, session, account, verification } from "./db/schema/auth-schema";
import { orgs, departs, members } from "./db/schema/main-schema";

export default {
    user,
    session,
    account,
    verification,
    orgs,
    departs,
    members
} as const;

export { eq, sql, DrizzleQueryError } from "drizzle-orm";
export { createInsertSchema } from "drizzle-orm/typebox-legacy";
