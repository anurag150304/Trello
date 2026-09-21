import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import { orgRoute } from "./modules/orgs";
import { env } from "@repo/env-config/env";
import { errHandler } from "./middlewares/errorHandler.middleware";
import { auth } from "@repo/auth-config/api";

const app = new Elysia({
  name: "Trello API",
  prefix: "/api/v1",
})
  .use(
    cors({
      origin:
        env.NODE_ENV === "production" ? env.WEB_URL : "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
      allowedHeaders: "Content-Type",
    }),
  )
  .use(errHandler)

  .all("/", ({ status }) =>
    status("OK", {
      message: "Welcome to Trello API",
      version: "v1",
    }),
  )
  .all("/auth/*", async ({ request, status }) => {
    if (!env.BETTER_AUTH_ACCEPT_METHODS.includes(request.method)) {
      return status("Method Not Allowed", {
        error: "Method Not Allowed!",
        message: `The requested "${request.method.toUpperCase()}" method is not allowed!`,
      });
    }

    const res = await auth.handler(request);
    return res;
  })

  .use(orgRoute)

  .listen(env.PORT || 8000, ({ hostname, port }) => {
    console.log(`Primary server is running at ${hostname}:${port}`);
  });

export type App = typeof app;
export default app;
