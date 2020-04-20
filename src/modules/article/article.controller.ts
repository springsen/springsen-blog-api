import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createa.article.dto';
import { Article } from './article.entity';
import { UpdateArticleDto } from './dto/update.artilce.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
@UseGuards(AuthGuard('jwt'))
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  index(@Req() req, @Query() query) {
    return this.articleService.index(query);
  }

  @Post()
  create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @Put(':id')
  update(@Param() param, @Body() updateArticleDto: UpdateArticleDto) {
    const { id } = param;
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param() id): Promise<Article> {
    return this.articleService.remove(id);
  }
}
