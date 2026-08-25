import { Elysia } from "elysia";
import { authRoute } from "./modules/auth";
import { env } from "@repo/env-config/env";
import { errHandler } from "./utils/errorHandler.util";
import { betterAuth } from "./middlewares/auth.middleware";

const app = new Elysia({
  name: "Trello API",
  prefix: "/api/v1"
})
  .use(errHandler)
  .use(authRoute)
  .get("/", "Hello World")
  .listen(env.PORT, ({ hostname, port }) => {
    console.log(`Primary server is running at ${hostname}:${port}`);
  })

export type App = typeof app;
export default app;