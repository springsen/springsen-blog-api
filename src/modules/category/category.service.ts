import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async index() {
    const [result, total] = await this.categoryRepository
      .createQueryBuilder('cq')
      .leftJoinAndSelect('cq.articles', 'articles')
      .getManyAndCount();

    return {
      result,
      total,
    };
  }

  create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.title = createCategoryDto.title;
    category.description = createCategoryDto.description;
    category.status = 1;
    return this.categoryRepository.save(category);
  }

  async update(
    id: number,
    updateCategoryDto?: UpdateCategoryDto,
  ): Promise<Category> {
    let category = await this.categoryRepository.findOne(id);
    if (category) {
      // 从 request 更新
      if (updateCategoryDto) {
        await this.categoryRepository.update(id, updateCategoryDto);
      } else {
        // 删除
        await this.categoryRepository.update(id, { status: 0 });
      }

      category = await this.categoryRepository.findOne(id);
    } else {
      throw new BadRequestException('请检查参数');
    }
    return category;
  }
}
