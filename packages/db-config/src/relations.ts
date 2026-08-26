import { defineRelations } from "drizzle-orm";
import { account, session, user } from "./db/schema/auth-schema";
import { departs, groups, members, orgs } from "./db/schema/main-schema";

export const relations = defineRelations({
    user,
    session,
    account,
    orgs,
    departs,
    groups,
    members
}, (r) => ({
    user: {
        sessions: r.many.session(),
        accounts: r.many.account(),
        orgs: r.many.orgs(),
        members: r.many.members()
    },

    session: {
        user: r.one.user({
            from: r.session.userId,
            to: r.user.id,
        }),
    },

    account: {
        user: r.one.user({
            from: r.account.userId,
            to: r.user.id,
        }),
    },

    orgs: {
        owner: r.one.user({
            from: r.orgs.createdBy,
            to: r.user.id
        }),
        departs: r.many.departs(),
        members: r.many.members()
    },

    departs: {
        org: r.one.orgs({
            from: r.departs.orgId,
            to: r.orgs.id
        }),
        groups: r.many.groups(),
        members: r.many.members()
    },

    groups: {
        depart: r.one.departs({
            from: r.groups.departId,
            to: r.departs.id
        }),
        members: r.many.members()
    },

    members: {
        user: r.one.user({
            from: r.members.userId,
            to: r.user.id
        }),
        org: r.one.orgs({
            from: r.members.orgId,
            to: r.orgs.id
        }),
        depart: r.one.departs({
            from: r.members.departId,
            to: r.departs.id
        }),
        group: r.one.groups({
            from: r.members.groupId,
            to: r.groups.id
        })
    }
}));