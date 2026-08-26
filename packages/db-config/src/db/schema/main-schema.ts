import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const ts = {
    createdAt: timestamp("created_at").defaultNow()
}

export const orgs = pgTable("organisations", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 30 }).notNull(),
    website: varchar({ length: 20 }),
    createdBy: text("created_by").notNull(),
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
    userId: text("user_id").notNull(),
    orgId: integer("org_id").notNull(),
    departId: uuid("depart_id"),
    groupId: uuid("group_id"),
    role: roleEnum().notNull()
});
