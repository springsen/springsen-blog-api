import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create.role';
import { UpdateRoleDto } from './dto/update.role';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Put(':id')
  update(@Body() updateRoleDto: UpdateRoleDto, @Param() id) {
    return this.roleService.update(id, updateRoleDto);
  }
}
