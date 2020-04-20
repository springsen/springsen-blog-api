import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Article } from '../article/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Article])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
