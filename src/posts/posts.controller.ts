import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Request() req) {
    return this.postsService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.postsService.findOneById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() postUserDto: UpdatePostDto) {
    return this.postsService.update(+id, postUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postsService.delete(+id);
  }
}
