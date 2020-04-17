import {
  Controller,
  Inject,
  forwardRef,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() body) {
    const { username, password } = body;
    if (!(username && password)) {
      throw new BadRequestException('请检查认证参数');
    }

    const user = await this.userService.findOneWithPassword(
      String(username),
      String(password),
    );

    const token = await this.authService.signIn(user);

    return { token };
  }
}
