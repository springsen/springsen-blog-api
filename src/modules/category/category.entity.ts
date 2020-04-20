import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column()
  description: string;

  @Column({ length: 255, default: '' })
  cover: string;

  @Column({ default: 1 }) // 1 正常 0 删除
  status: number;

  @OneToMany(
    type => Article,
    article => article.category,
    { cascade: true },
  )
  articles: Article[];
}
