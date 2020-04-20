import { IsString, IsInt } from 'class-validator';

export class UpdateCategoryDto {
  title?: string;

  description?: string;

  status?: number;

  cover?: string;
}
