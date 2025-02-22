import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { CommentsService } from './comments.service';
import { Commentaries } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Twitt } from 'src/twitts/entities/twitt.entity';

//comentario
@ApiBearerAuth()
@Controller('commentaries')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

@Post(":twittId")
@Auth() 
@ApiResponse({ status: 201, description: 'Comment was created', type: Commentaries })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 403, description: 'Token related' })
create(
  @Param('twittId', ParseUUIDPipe) twittId: string,  // 👈 Añade el twittId como parámetro
  @Body() createCommentDto: CreateCommentDto,
  @GetUser() user: User,
) {
  return this.commentsService.create(createCommentDto, user, twittId); // 👈 Pasa el twittId al servicio
}

  @Get(':twittId')
  @Auth() 
  async findCommentsByTwittId(@Param('twittId') twittId: string) {
    return this.commentsService.findCommentsByTwittId(twittId);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.commentsService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth() 
  findOne(@Param('term') term: string) {
    return this.commentsService.findOne(term);
  }

  @Patch(':id')
  @Auth() 
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ){
    return this.commentsService.update(id, updateCommentDto, user);
  }

  @Delete(':id')
  @Auth() 
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.remove(id);
  }

  
}
