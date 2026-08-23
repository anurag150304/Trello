import { defineRelations } from "drizzle-orm";
import { integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const ts = {
    createdAt: timestamp("created_at").defaultNow()
}

export const users = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar("fisrtname", { length: 30 }).notNull(),
    lastName: varchar("lastname", { length: 30 }),
    email: varchar({ length: 254 }).notNull(),
    ...ts
});

export const orgs = pgTable("organisations", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 30 }).notNull(),
    website: varchar({ length: 20 }),
    createdBy: integer("created_by").notNull(),
    ...ts
});

export const departs = pgTable("departments", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 20 }).notNull(),
    orgId: integer("org_id").notNull()
});

export const groups = pgTable("groups", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 40 }).notNull(),
    departId: uuid("depart_id").notNull()
});

export const roleEnum = pgEnum("role", ["ADMIN", "MEMBER"]);
export const members = pgTable("members", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id").notNull(),
    orgId: integer("org_id").notNull(),
    departId: uuid("depart_id"),
    groupId: uuid("group_id"),
    role: roleEnum().notNull()
});


export const relations = defineRelations({ users, orgs, departs, groups, members }, (r) => ({
    users: {
        orgs: r.many.orgs(),
        members: r.many.members()
    },

    orgs: {
        owner: r.one.users({
            from: r.orgs.createdBy,
            to: r.users.id
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
        user: r.one.users({
            from: r.members.userId,
            to: r.users.id
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