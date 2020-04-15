/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create.role';
import { User } from '../user/user.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = new Role();
    role.role_name = createRoleDto.role_name;
    role.description = createRoleDto.description;

    return this.roleRepository.save(role);
  }

  async update(param, updateRoleDto) {
    const { id } = param;
    const role = await this.roleRepository.findOne(id);
    delete role.id;

    const data = { ...role, ...updateRoleDto };

    let updateModel = new Role();
    updateModel = { ...data };
    console.log(updateModel);

    return await this.roleRepository.update(id, updateModel);
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.users', 'user')
      .getMany();
  }

  findOneById(id): Promise<Role> {
    return this.roleRepository.findOne({ id });
  }
}
