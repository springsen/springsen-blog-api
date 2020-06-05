import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  // 文章标题
  @Column()
  title: string;

  // 文章内容
  @Column({ type: 'text' })
  content: string;

  // 状态 1 正常， 0 删除
  @Column({ default: 1 })
  status: number;

  // 封面
  @Column({
    default:
      'https://cdn.pixabay.com/photo/2020/04/17/14/16/landscape-5055384__340.jpg',
  })
  cover: string;

  // 简介
  @Column()
  description: string;

  // 发布 0: 未发布 1: 已发布
  @Column({ type: 'int', default: 0 })
  public: number;

  // 喜欢
  @Column({ type: 'int', default: 0 })
  like: number;

  // 收藏
  @Column({ type: 'int', default: 0 })
  star: number;

  // 布局 0: blog布局 1: 广告展示布局
  @Column({ type: 'int', default: 0 })
  views: number;

  // 创建时间
  @CreateDateColumn({
    select: false,
  })
  createdAt: Date;

  // 修改时间
  @UpdateDateColumn({
    select: false,
  })
  updateedAt: Date;

  // 频道 外键
  @ManyToOne(
    type => Category,
    category => category.articles,
  )
  category: Category;

  // 标签 多对多
  @ManyToMany(
    type => Tag,
    tag => tag.articles,
    { cascade: true },
  )
  @JoinTable()
  tags: Tag[];
}
