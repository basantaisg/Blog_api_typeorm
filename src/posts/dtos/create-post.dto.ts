import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  content: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
