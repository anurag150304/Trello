ALTER TABLE "departments" ALTER COLUMN "name" SET DATA TYPE varchar(40) USING "name"::varchar(40);--> statement-breakpoint
ALTER TABLE "organisations" ALTER COLUMN "name" SET DATA TYPE varchar(50) USING "name"::varchar(50);--> statement-breakpoint
ALTER TABLE "organisations" ALTER COLUMN "website" SET DATA TYPE varchar(70) USING "website"::varchar(70);--> statement-breakpoint
ALTER TABLE "organisations" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_org_id_organisations_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organisations"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "groups" ADD CONSTRAINT "groups_depart_id_departments_id_fkey" FOREIGN KEY ("depart_id") REFERENCES "departments"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_org_id_organisations_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organisations"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_depart_id_departments_id_fkey" FOREIGN KEY ("depart_id") REFERENCES "departments"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_group_id_groups_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "organisations" ADD CONSTRAINT "organisations_created_by_user_id_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT;