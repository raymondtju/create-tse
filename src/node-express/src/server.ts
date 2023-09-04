import { App } from "./app";
import { AuthRoute } from "@/routes/auth.route";

export const app = new App([new AuthRoute()]);

app.listen();
