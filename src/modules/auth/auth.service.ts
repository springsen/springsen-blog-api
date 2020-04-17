import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: any): Promise<string> {
    try {
      return this.jwtService.sign(JSON.parse(JSON.stringify(user)));
    } catch (error) {
      throw new BadRequestException('账号或者密码错误');
    }
  }

  async validateUser(payload): Promise<string> {
    if (await this.userService.findOneWithPassword(payload.username, null)) {
      return payload;
    } else {
      return null;
    }
  }
}
