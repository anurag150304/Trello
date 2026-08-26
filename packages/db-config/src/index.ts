export * from "./init";
import { orgs, departs, groups, members } from "./db/schema/main-schema";
import { user } from "./db/schema/auth-schema";
export const models = {
    user,
    orgs,
    departs,
    groups,
    members
} as const;
export type Model = typeof models;