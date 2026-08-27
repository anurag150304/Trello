import { Elysia } from "elysia";
// import { authRoute } from "./modules/auth";
import { env } from "@repo/env-config/env";
import { errHandler } from "./utils/errorHandler.util";
import { orgRoute } from "./modules/orgs";

const app = new Elysia({
  name: "Trello API",
  prefix: "/api/v1"
})
  .use(errHandler)
  // .use(authRoute)
  .use(orgRoute)

  .all("/", ({ status }) => status("OK", {
    message: "Welcome to Trello API",
    version: "v1"
  }))
  .listen(env.PORT, ({ hostname, port }) => {
    console.log(`Primary server is running at ${hostname}:${port}`);
  })

export type App = typeof app;
export default app;