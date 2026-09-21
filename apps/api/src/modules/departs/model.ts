import { t, type UnwrapSchema } from "elysia";
import models from "@repo/db-config";
import { createInsertSchema } from "@repo/db-config";

const _createDepart = createInsertSchema(models.departs, {
  orgId: t.Number(),
});

export const departSchema = {
  createSchema: t.Omit(_createDepart, ["id"]),
  paramSchema: t.Object({ departId: t.String() }),
  querySchema: t.Object({ orgId: t.Number() }),
};

export type departSchema = {
  [k in keyof typeof departSchema]: UnwrapSchema<(typeof departSchema)[k]>;
};
