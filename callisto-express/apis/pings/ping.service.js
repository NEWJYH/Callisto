export class PingService {
  constructor() {}

  healthCheck = async () => {
    console.log('healthCheck')
    return "OK";
  };
}
