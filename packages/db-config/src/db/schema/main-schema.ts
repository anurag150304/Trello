import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

const ts = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
};

export const orgs = pgTable("organisations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull().unique(),
  website: text("website"),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "restrict" }),
  ...ts,
});

export const departs = pgTable("departments", {
  id: uuid().primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "restrict" }),
});

export const roleEnum = pgEnum("role", ["ADMIN", "MEMBER"]);
export const members = pgTable("members", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "restrict" }),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "restrict" }),
  departId: uuid("depart_id").references(() => departs.id, {
    onDelete: "restrict",
  }),
  role: roleEnum().notNull(),
});
