import { db, sql, DrizzleQueryError } from "@repo/db-config";
import type { departSchema } from "./model";
import models from "@repo/db-config";
import { CTError } from "@/middlewares/errorHandler.middleware";

export class DepartService {

    static async findOrg({ orgId }: departSchema["querySchema"]) {
        const [org] = await db.select({
            id: models.orgs.id,
            name: models.orgs.name,
            ownerId: models.orgs.createdBy
        }).from(models.orgs).where(sql`${models.orgs.id} = ${orgId}`).limit(1);
        return org;
    }

    static async createDepart({
        name,
        orgId,
    }: departSchema["createSchema"]) {

        try {
            const [depart] = await db.insert(models.departs).values({
                name,
                orgId,
            })
                .returning({ orgId: models.departs.id });

            return depart;
        } catch (err) {
            if (err instanceof DrizzleQueryError &&
                err.cause &&
                "code" in err.cause &&
                err.cause.code === "23505"
            ) {
                throw new CTError(409, "Department already exists!");
            }

            throw err;
        }
    }

    static async getOrgDeparts({ orgId }: { orgId: number }) {
        const departs = await db.query.departs.findMany({
            where: { orgId },
        });
        return departs;
    }

    static async getDepartInfo({ departId }: { departId: string }) {
        const info = await db.query.departs.findFirst({
            where: { id: departId }
        });

        if (!info) throw new CTError(404, "Department not found!");
        return info;
    }
}
