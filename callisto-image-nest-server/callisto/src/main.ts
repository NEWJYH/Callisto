import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { setupSwagger } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger 설정
  setupSwagger(app);
  // Exception filter 연결
  app.useGlobalFilters(new HttpExceptionFilter());
  // 검증 필터 역할의 파이프 : 검증파이프 연결
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.HOST_PORT);
}
bootstrap();
