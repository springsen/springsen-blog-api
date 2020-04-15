import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  avatar: string;

  @ManyToMany(
    type => Role,
    role => role.users,
    { cascade: true },
  )
  @JoinTable()
  roles: Role[];
}
