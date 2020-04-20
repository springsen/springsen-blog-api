import { IsString, IsNotEmpty, IsInt, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(0, 50, { message: '长度小于50' })
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  status?: number;
}
