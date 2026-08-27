// import { eq } from "drizzle-orm";
// import type { authSchema } from "./model";
// import { db } from "@repo/db-config/DB";
// import { models } from "@repo/db-config/models"

// export class AuthService {
//     static async findUser(email: authSchema["signupSchema"]["email"]) {
//         return await db.select({
//             id: models.user.id,
//             name: models.user.firstName,
//             email: models.user.email
//         }).from(models.user).where(eq(models.user.email, email));
//     }

//     static async createUser({ firstName, lastName, email }: authSchema["signupSchema"]) {
//         return await db.insert(models.user).values({
//             firstName,
//             ...(lastName && { lastName }),
//             email
//         }).returning({ insertedId: models.user.id });
//     }
// }