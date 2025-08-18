import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userRepository.findOneBy({
      id: createCommentDto.userId,
    });

    if (!user)
      throw new NotFoundException(
        `User with id: ${createCommentDto.userId} Not found`,
      );

    const post = await this.postRepository.findOneBy({
      id: createCommentDto.postId,
    });

    if (!post)
      throw new NotFoundException(
        `Post with id: ${createCommentDto.postId} Not found!`,
      );

    const comment = await this.commentRepository.create({
      text: createCommentDto.text,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findCommentById(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
  }

  async update(id: number, UpdateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) throw new NotFoundException(`Comment ${id} not found!`);

    Object.assign(comment, UpdateCommentDto);
    return this.commentRepository.save(comment);
  }

  async delete(id: number) {
    const res = await this.commentRepository.delete(id);
    if (res.affected === 0)
      throw new NotFoundException(`Comment ${id} Not found!`);
    return { message: 'Deleted successfully!' };
  }
}
