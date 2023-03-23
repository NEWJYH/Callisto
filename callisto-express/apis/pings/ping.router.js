import express from "express";
import { PingService } from "./ping.service.js";
import { PingController } from "./ping.controller.js";

export class PingRouter {
  constructor() {
    this.router = express.Router();
    this.pingService = new PingService();
    this.pingController = new PingController(this.pingService);

    this.setRoutes();
  }

  setRoutes() {
    this.router.get("/", this.pingController.healthCheck);
  }

  get getRouter() {
    return this.router;
  }
}
