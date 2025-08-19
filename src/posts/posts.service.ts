import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOne({
      where: { id: createPostDto.userId },
    });

    if (!user)
      throw new NotFoundException(
        `User with id ${createPostDto.userId} Not Found!`,
      );

    const post = this.postRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      user,
    });

    return await this.postRepository.save(post);
  }

  async findAll(userId: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOneById(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) throw new NotFoundException(`Post with id ${id} not found!`);
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOneById(id);

    if (!post) throw new NotFoundException(`post with id: ${id} Not exists!`);

    const updatedPost = { ...post, ...updatePostDto };

    return this.postRepository.save(updatedPost);
  }

  async delete(id: number) {
    await this.postRepository.delete({ id });
    return { message: 'Post deleted successfully!' };
  }
}
