import {
  Column,
  ManyToMany,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role_name: string;

  @Column()
  description: string;

  @ManyToMany(
    type => User,
    user => user.roles,
  )
  users: User[];
}
