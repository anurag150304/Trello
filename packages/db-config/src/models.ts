import { orgs, departs, groups, members } from "./db/schema/main-schema";
import { user, session, account, verification } from "./db/schema/auth-schema";

export const models = {
    user,
    session,
    account,
    verification,
    orgs, departs,
    groups,
    members
} as const;
