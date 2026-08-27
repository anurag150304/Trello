import { integer, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

const ts = {
    createdAt: timestamp("created_at").defaultNow().notNull()
}

export const orgs = pgTable("organisations", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 50 }).notNull(),
    website: varchar({ length: 70 }),
    createdBy: text("created_by").notNull().references(() => user.id, { onDelete: "restrict" }),
    ...ts
});

export const departs = pgTable("departments", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 40 }).notNull(),
    orgId: integer("org_id").notNull().references(() => orgs.id, { onDelete: "restrict" })
});

export const groups = pgTable("groups", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 40 }).notNull(),
    departId: uuid("depart_id").notNull().references(() => departs.id, { onDelete: "restrict" })
});

export const roleEnum = pgEnum("role", ["ADMIN", "MEMBER"]);
export const members = pgTable("members", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "restrict" }),
    orgId: integer("org_id").notNull().references(() => orgs.id, { onDelete: "restrict" }),
    departId: uuid("depart_id").references(() => departs.id, { onDelete: "restrict" }),
    groupId: uuid("group_id").references(() => groups.id, { onDelete: "restrict" }),
    role: roleEnum().notNull()
});
