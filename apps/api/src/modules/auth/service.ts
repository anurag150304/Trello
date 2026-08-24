import { eq } from "drizzle-orm";
import type { authSchema } from "./model";
import { db, models } from "@repo/db-config/DB";

export class AuthService {
    static async findUser(email: authSchema["signupSchema"]["email"]) {
        return await db.select({
            id: models.users.id,
            firstname: models.users.firstName,
            lastname: models.users.lastName,
            email: models.users.email
        }).from(models.users).where(eq(models.users.email, email));
    }

    static async createUser({ firstName, lastName, email }: authSchema["signupSchema"]) {
        return await db.insert(models.users).values({
            firstName,
            ...(lastName && { lastName }),
            email
        }).returning({ insertedId: models.users.id });
    }
}