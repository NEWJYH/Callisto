import { PingService } from "../ping.service";

describe("PingService", () => {
  let pingService;
  beforeEach(() => {
    jest.mock("../ping.service.js");
    pingService = new PingService();
  });

  it("healthCheck", async () => {
    const result = await pingService.healthCheck();

    expect(result).toBe("OK");
  });
});
