import { Tag } from '../../tag/tag.entity';

export class UpdateArticleDto {
  title: string;
  content: string;
  tags: [];
  category: number;
}
