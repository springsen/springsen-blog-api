import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user';
import { AuthGuard } from '@nestjs/passport';
import { RbacGuard } from '../../guards/rbac.guard';
import { ROLE } from '../../app.config';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  // rbac 守卫测试
  @UseGuards(new RbacGuard(ROLE.YEAR_MEMBER))
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
