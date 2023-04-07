export class PingController {
  constructor(pingService) {
    this.pingService = pingService;
  }

  /**
   * 서버 상태를 체크합니다.
   * @param {*} _ 사용하지 않는 매개변수입니다.
   * @param {import('express').Response} res HTTP 응답 객체입니다.
   * @returns {Promise<void>}  - "OK" 문자열을 반환하는 Promise 객체
   */
  healthCheck = async (_, res) => {
    const answer = await this.pingService.healthCheck();

    res.status(200).send(answer);
  };
}
