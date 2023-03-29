export class PingController {
  constructor(pingService) {
    this.pingService = pingService;
  }

  healthCheck = async (_, res) => {
    const answer = await this.pingService.healthCheck();
    
    res.status(200).send(answer);
  };
}
