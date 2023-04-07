import request from "supertest";

import app from "../../../app.js";

import { PingController } from "../ping.controller";

import { PingService } from "../ping.service";

describe("PingController", () => {
  let pingController;
  let pingService;

  beforeAll(() => {
    // 초기화 작업 수행

    // pingService
    jest.mock("../ping.service.js");
    pingService = new PingService();

    // pingController
    jest.mock("../ping.controller.js");
    pingController = new PingController(pingService);
  });

  it("healthCheck", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
  });
});
