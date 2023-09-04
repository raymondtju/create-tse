import "reflect-metadata";

import express from "express";
import morgan from "morgan";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import cors from "cors";

import { Routes } from "@/interfaces/routes.interface";
import { ErrorMiddleware } from "@/middlewares/error.middleware";
import { CREDENTIALS, LOG_FORMAT, ORIGIN } from "@/config";
import { stream } from "@/utils/logger";

export class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = 3456;

    this.init();
    this.registerRoutes(routes);
    this.registerErrorMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Application running on port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private init() {
    this.app.use(
      morgan(
        // ":remote-addr :method :url :status :res[content-length] - :response-time ms"
        LOG_FORMAT,
        {
          stream: stream,
        }
      )
    );
    this.app.use(
      cors({
        credentials: CREDENTIALS,
        origin: ORIGIN,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(hpp()); // against HTTP Parameter Pollution attacks
  }

  private registerRoutes(routes: Routes[]) {
    const app = this.app;

    routes?.forEach((route) => {
      app.use("/", route.router);
    });
  }

  private registerErrorMiddleware() {
    this.app.use(ErrorMiddleware);
  }
}
