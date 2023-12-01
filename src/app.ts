import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connect, set, disconnect } from "mongoose";
import { NODE_ENV, PORT } from "./core/configuration";
import { databaseConnection } from "./core/database";
import { Routes } from "./core/interfaces/routes.interface";
import { errorMiddleware } from "./core/middlewares/error.middleware";
import { notFoundMiddleware } from "./core/middlewares/not_found.middleware";
import { datetimeString, timeStampString } from "./core/utilities/utilities";

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development1";
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`\n${"*".repeat(74)}`);
      console.log(
        `* 🕒 ${datetimeString()} | app is running @http://localhost:${this.port}${" ".repeat(16)}`
      );
      console.log(`*${"_".repeat(73)}`);
      console.log(`*${" ".repeat(73)}`);
    });
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      console.log(`* 🕒 ${datetimeString()} | disconnected from MongoDB`);
    } catch (error) {
      console.error(`* 🕒 ${datetimeString()} | error closing database connection`, error);
    }
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== "production") {
      set("debug", true);
    }

    await connect(databaseConnection.url);
    console.log(`* 🕒 ${datetimeString()} | database @${databaseConnection.url}`);
  }
  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });

    this.app.all("*", notFoundMiddleware);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}
