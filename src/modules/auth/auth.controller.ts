import {
  Controller,
  Inject,
  forwardRef,
  BadRequestException,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';

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

    const accessToken = await this.authService.signIn(user);
    const { roles } = user;
    const roleResult: string[] = [];
    if (roles.length > 0) {
      roles.map(r => {
        roleResult.push(r.role_name);
      });
    }

    return { accessToken, username, roles: roleResult };
  }

  @Get('userInfo')
  @UseGuards(AuthGuard('jwt'))
  async getUserInfo(@Req() req) {
    return {
      username: req.user.username,
    };
  }
}
