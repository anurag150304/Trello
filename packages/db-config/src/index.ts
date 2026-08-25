export * from "./init";
import { users, orgs, departs, groups, members } from "./db/schema/main-schema";
export const models = {
    users,
    orgs,
    departs,
    groups,
    members
} as const;
export type Model = typeof models;