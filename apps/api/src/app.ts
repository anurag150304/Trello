import { Elysia } from "elysia";
import { cors } from "@elysia/cors";
import { orgRoute } from "./modules/orgs";
import { env } from "@repo/env-config/env";
import { errHandler } from "./middlewares/errorHandler.middleware";
import { authHandler } from "./utils/authHandler.util";

const app = new Elysia({
  name: "Trello API",
  prefix: "/api/v1",
})
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(errHandler)
  .all("/auth/*", authHandler)
  .use(orgRoute)

  .all("/", ({ status }) =>
    status("OK", {
      message: "Welcome to Trello API",
      version: "v1",
    }),
  )
  .listen(env.PORT, ({ hostname, port }) => {
    console.log(`Primary server is running at ${hostname}:${port}`);
  });

export type App = typeof app;
export default app;
