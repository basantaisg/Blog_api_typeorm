import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = this.userRepository.findOne({
      where: { id: createPostDto.userId },
    });

    if (!user)
      throw new NotFoundException(
        `User with id ${createPostDto.userId} Not Found!`,
      );

    const post = this.postRepository.create(createPostDto);

    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }
}
