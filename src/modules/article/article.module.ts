import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag, Category])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
