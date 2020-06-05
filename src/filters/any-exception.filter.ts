/**
 * 捕获所有异常
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ExceptionStatus {
  response: {
    code: string;
    message: string;
  };
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: ExceptionStatus, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception} \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    console.error(exception.response.code);

    response.status(status).json({
      code: exception.response.code,
      statusCode: status,
      message: `Service Error: ${exception}`,
      path: request.url,
    });
  }
}
// @Catch(HttpException)
// export class AllExceptionsFilter implements ExceptionFilter<HttpException> {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();
//     // @todo 记录日志
//     console.log(
//       '%s %s error: %s',
//       request.method,
//       request.url,
//       exception.message,
//     );
//     // 发送响应
//     response.status(status).json({
//       statusCode: status,
//       message: exception.message,
//       path: request.url,
//     });
//   }
// }
