import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository, Brackets } from 'typeorm';
import { CreateArticleDto } from './dto/createa.article.dto';
import { UpdateArticleDto } from './dto/update.artilce.dto';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';
import { UserException } from '../../errors/user.error';

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
   * @param query 查询 query 支持 page pageSize keyword cetogory
   */
  async index(query) {
    const pageSize = query.pageSize || 20;
    const page = query.page ? (query.page - 1) * pageSize : 0;
    const keyword = query.keyword || '';

    const [result, total] = await this.articleRepository
      .createQueryBuilder('aq')
      .leftJoinAndSelect('aq.tags', 'tag')
      .leftJoinAndSelect('aq.category', 'category')
      .where(
        new Brackets(qb => {
          if (query.category) {
            qb.where('aq.category = :category', {
              category: `${query.category}`,
            }).andWhere('aq.title like :title', {
              title: `%%${keyword}%`,
            });
          } else if (query.keyword) {
            qb.where('aq.title like :title', {
              title: `%%${keyword}%`,
            });
          }
        }),
      )
      .orderBy('aq.title', 'DESC')
      .skip(page)
      .take(pageSize)
      .select(['aq.id', 'aq.title', 'aq.content', 'tag', 'category'])
      .getManyAndCount();

    if (result.length < 1) throw new UserException(40001, '没有相关记录');

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
    article.description = createArticleDto.description;

    if (createArticleDto.cover) {
      article.cover = createArticleDto.cover;
    } else {
      // 默认给个标签
      article.tags = await this.tagRepository.findByIds([1]);
    }

    if (createArticleDto.tags) {
      const tags = await this.tagRepository.findByIds(createArticleDto.tags);
      article.tags = tags;
    }

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
