import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { logger } from './utiles/log.utiles';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // log 增强
  logger();

  // 响应格式 interceptor
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector()),
    new LoggingInterceptor(),
  );

  // 校验 pipe
  app.useGlobalPipes(new ValidationPipe());

  // 异常 filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
