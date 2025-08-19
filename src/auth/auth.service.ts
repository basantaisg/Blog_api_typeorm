import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import bcrypt from 'bcryptjs';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    return await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    });
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION,
    });
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRATION,
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const validUser = await this.usersService.findOneByEmail(
      loginUserDto.email,
    );

    if (!validUser) throw new NotFoundException(`Invalid Credintials!`);

    const isValidateUser = await bcrypt.compare(
      loginUserDto.password,
      validUser.password,
    );

    if (!isValidateUser) throw new NotFoundException('Invalid Password!');

    return validUser;
  }
}
