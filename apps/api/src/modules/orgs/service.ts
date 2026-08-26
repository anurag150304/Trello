import { db, models } from "@repo/db-config/DB";
import { eq, or, sql } from "drizzle-orm";
import type { orgsSchema } from "./model";
import { CTError } from "@/utils/errorHandler.util";

export class OrgService {
    static async findOrg({ id, name }: { id?: string; name?: string }) {
        const command: string = id ?
            `${models.orgs.id} = ${id}` :
            `${models.orgs.name} = ${name}`;

        return await db.select({
            name: models.orgs.name,
            website: models.orgs.website
        }).from(models.orgs).where(sql`${command}`).limit(1);
    }

    static async createOrg({ name, website, createdBy }: orgsSchema["createSchema"]) {
        if (!createdBy) throw new CTError(422, "Org creator id is missing!");

        return await db.insert(models.orgs).values({
            name, ...(website && { website }), createdBy
        }).returning({ orgId: models.orgs.id });
    }
}