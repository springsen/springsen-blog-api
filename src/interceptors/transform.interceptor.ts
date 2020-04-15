import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map((data: any) => {
        const logFormat = ` ===>>>===>>>===>>>
      Request original url: ${req.originalUrl}
      Method: ${req.method}
      IP: ${req.ip}
      query:${JSON.stringify(req.query)}
      Body:${JSON.stringify(req.body)}
      User: ${JSON.stringify(req.user)}
      Response data:
      ${JSON.stringify(data)}
<<<===<<<===<<<===`;
        console.log(logFormat);
        return {
          code: 0,
          message: 'success',
          data,
        };
      }),
    );
  }
}
