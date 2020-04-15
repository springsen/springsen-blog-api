import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    const logFormat = ` ===>>>===>>>===>>>
      Request original url: ${request.originalUrl}
      Method: ${request.method}
      IP: ${request.ip}
      query:${JSON.stringify(request.query)}
      Body:${JSON.stringify(request.body)}
      Response data:${exception.toString()}
<<<===<<<===<<<===`;

    console.log(logFormat);

    response.status(status).json({
      code: status,
      message: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
