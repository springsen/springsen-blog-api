import {
  Injectable,
  Inject,
  forwardRef,
  Get,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string): Promise<string> {
    const payload: JwtPayload = { username };
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: JwtPayload): Promise<string> {
    if (await this.userService.findOneWithPassword(payload.username, null)) {
      return payload.username;
    } else {
      return null;
    }
  }
}
