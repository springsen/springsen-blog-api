import {
  Controller,
  Inject,
  forwardRef,
  Get,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  @Get('login')
  async login(@Req() request: Request) {
    const { username, password } = request.headers;
    if (!(username && password)) {
      throw new BadRequestException('请检查认证参数');
    }

    await this.userService.findOneWithPassword(
      String(username),
      String(password),
    );

    const token = await this.authService.signIn(String(username));
    return { token };
  }
}
