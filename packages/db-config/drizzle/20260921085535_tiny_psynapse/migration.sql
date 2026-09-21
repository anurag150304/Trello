ALTER TABLE "members" DROP CONSTRAINT "members_group_id_groups_id_fkey";--> statement-breakpoint
DROP TABLE "teams";--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "role";--> statement-breakpoint
CREATE TYPE "role" AS ENUM('ADMIN', 'MEMBER');--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "role" SET DATA TYPE "role" USING "role"::"role";--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN "group_id";