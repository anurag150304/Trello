DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "user_id" SET DATA TYPE text USING "user_id"::text;--> statement-breakpoint
ALTER TABLE "organisations" ALTER COLUMN "created_by" SET DATA TYPE text USING "created_by"::text;