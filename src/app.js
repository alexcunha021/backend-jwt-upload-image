import express from "express";
import favicon from "serve-favicon";
import route from "./routes";
import path from "path";
import cors from "cors";
import authMiddleware from "./middlewares/auth";
import "./database";
class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
  }
  middleware() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      "/files",
      express.static(path.resolve(__dirname, "..", "tmp"))
    );
    this.server.use(express.urlencoded({ extended: true }));
  }
  routes() {
    this.server.use(route);
  }
}

export default new App().server;
