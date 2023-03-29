export class PingService {
  constructor() {}

  healthCheck = async () => {
    return "OK";
  };
}
