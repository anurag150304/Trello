import { sql } from "drizzle-orm";
import { db } from "@repo/db-config/DB";
import type { orgsSchema } from "./model";
import { models } from "@repo/db-config/models";
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

    static async getUserOrgs({ userId }: { userId: string }) {
        return await db.query.orgs.findMany({
            columns: { createdBy: false },
            where: { createdBy: userId }
        });
    }

    static async getOrgInfo({ orgId }: { orgId: number }) {
        const org = await db.query.orgs.findFirst({
            columns: { createdBy: false },
            where: { id: orgId },
            with: { departs: true }
        });

        if (!org) throw new CTError(404, "Organisation not found!");
        return org;
    }
}