export class PingService {
  constructor() {}

  /**
   * 서비스의 상태를 확인하는 메소드
   * @async
   * @function
   * @returns {Promise<string>} - "OK" 문자열을 반환하는 Promise 객체
   */
  healthCheck = async () => {
    return "OK";
  };
}
