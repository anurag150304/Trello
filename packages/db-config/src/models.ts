import * as main_models from "./db/schema/main-schema";
import { user } from "./db/schema/auth-schema";

export const models = { ...main_models, user } as const;