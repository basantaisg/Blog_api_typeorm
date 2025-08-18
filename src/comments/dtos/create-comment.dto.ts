import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;
  @IsNumber()
  userId: number;
  @IsNumber()
  postId: number;
}
