import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: 1 })
  status: number; // 1 正常， 0 删除

  @ManyToOne(
    type => Category,
    category => category.articles,
  )
  category: Category;

  @ManyToMany(
    type => Tag,
    tag => tag.articles,
    { cascade: true },
  )
  @JoinTable()
  tags: Tag[];
}
