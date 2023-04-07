// 모든 exception을 관리할 filter
// 오류가 나올수 있는 부분에 try catch finally 사용하지 않고
// 코드의 가독성을 높이기 위해 사용

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus(); // 에러 발생 상태 코드
    const message = exception.message;

    console.log('==============================================');
    console.log('예외 발생');
    console.log(`message : ${message}`);
    console.log(`status  : ${status}`);
    console.log(`url     : ${request.url}`);
    console.log(`method  : ${request.method}`);
    console.log('==============================================');

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
