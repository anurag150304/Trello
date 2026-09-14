ALTER TABLE "departments" ADD CONSTRAINT "departments_name_key" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "organisations" ADD CONSTRAINT "organisations_name_key" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_name_key" UNIQUE("name");