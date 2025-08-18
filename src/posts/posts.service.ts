import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    postRepository: Repository<Post>,

    @InjectRepository(User)
    userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {}
}
