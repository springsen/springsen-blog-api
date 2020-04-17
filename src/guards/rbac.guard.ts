import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly role: number) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (user.roles[0].id > this.role) {
      throw new ForbiddenException('对不起，无权操作');
    }
    return true;
  }
}
