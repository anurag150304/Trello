import { DrizzleQueryError } from "@repo/db-config";
import { db } from "@repo/db-config";
import type { orgsSchema } from "./model";
import models from "@repo/db-config";
import { CTError } from "@/middlewares/errorHandler.middleware";

export class OrgService {
  static async createOrg({
    name,
    website,
    createdBy,
  }: orgsSchema["createSchema"]) {
    if (!createdBy) throw new CTError(422, "Org creator id is missing!");

    try {
      const [org] = await db
        .insert(models.orgs)
        .values({
          name,
          ...(website && { website }),
          createdBy,
        })
        .returning({ orgId: models.orgs.id });

      return org;
    } catch (err) {
      if (
        err instanceof DrizzleQueryError &&
        err.cause &&
        "code" in err.cause &&
        err.cause.code === "23505"
      ) {
        throw new CTError(409, "Organization already taken by someone-else!");
      } else {
        throw err;
      }
    }
  }

  static async getUserOrgs({ userId }: { userId: string }) {
    const orgs = await db.query.orgs.findMany({
      columns: { createdBy: false },
      where: { createdBy: userId },
    });
    return orgs;
  }

  static async getOrgInfo({ orgId }: { orgId: number }) {
    const org = await db.query.orgs.findFirst({
      columns: { createdBy: false },
      where: { id: orgId },
      with: { departs: true },
    });

    if (!org) throw new CTError(404, "Organisation not found!");
    return org;
  }
}
