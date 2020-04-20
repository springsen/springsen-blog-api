import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create.tag.dto';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  create(createTagDto: CreateTagDto) {
    return this.tagRepository.save(createTagDto);
  }
}
