CREATE TYPE "role" AS ENUM('ADMIN', 'MEMBER');--> statement-breakpoint
CREATE TABLE "departments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(20) NOT NULL,
	"org_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(40) NOT NULL,
	"depart_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "members_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"org_id" integer NOT NULL,
	"depart_id" uuid,
	"group_id" uuid,
	"role" "role" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "organisations" RENAME COLUMN "creared_at" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(254) USING "email"::varchar(254);