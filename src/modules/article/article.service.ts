import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createa.article.dto';
import { UpdateArticleDto } from './dto/update.artilce.dto';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * query article list
   * @param query 查询 query
   */
  async index(query) {
    const pageSize = query.pageSize || 20;
    const page = query.page ? (query.page - 1) * pageSize : 0;
    const keyword = query.keyword || '';

    const [result, total] = await this.articleRepository
      .createQueryBuilder('aq')
      .leftJoinAndSelect('aq.tags', 'tag')
      .leftJoinAndSelect('aq.category', 'category')
      .where('aq.title like :title', { title: `%${keyword}` })
      .orderBy('aq.title', 'DESC')
      .skip(page)
      .take(pageSize)
      .getManyAndCount();

    const totalPage = Math.ceil(total / pageSize);

    return {
      result,
      total,
      totalPage,
      pageSize,
      currentPage: Number(query.page) || 1,
    };
  }

  /**
   * create article
   * @param createArticleDto
   */
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.title = createArticleDto.title;
    article.content = createArticleDto.content;

    const tags = await this.tagRepository.findByIds(createArticleDto.tags);
    article.tags = tags;

    const category = await this.categoryRepository.findOne(
      createArticleDto.category,
    );
    article.category = category;

    return this.articleRepository.save(article);
  }

  /**
   * update article
   * @param id
   * @param updateArticleDto
   */
  async update(id, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const toUpdate = await this.articleRepository.findOne(id);
    const updated = Object.assign(toUpdate, updateArticleDto);
    const tags = await this.tagRepository.findByIds(updateArticleDto.tags);
    updated.tags.length = 0;
    tags.map(t => {
      updated.tags.push(t);
    });

    const article = await this.articleRepository.save(updated);
    return article;
  }

  /**
   * remove
   * @param id
   */
  remove(id) {
    const deleteArticle = this.articleRepository.findOne({ id });

    if (deleteArticle) {
      this.articleRepository.update(id, { ...deleteArticle, status: 0 });
    } else {
      throw new NotFoundException('没有对应记录');
    }

    return deleteArticle;
  }
}
