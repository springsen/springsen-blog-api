import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  index() {
    return this.categoryService.index();
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const { status } = createCategoryDto;
    if (!status) createCategoryDto.status = 1;

    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  update(@Param() param, @Body() updateCategoryDto: UpdateCategoryDto) {
    const { id } = param;
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param() param) {
    const { id } = param;
    return this.categoryService.update(id);
  }
}
