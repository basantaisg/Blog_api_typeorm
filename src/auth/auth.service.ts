import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerUserDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    return await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });
  }
}
