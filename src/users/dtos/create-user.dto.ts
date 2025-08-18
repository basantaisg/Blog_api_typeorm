import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
