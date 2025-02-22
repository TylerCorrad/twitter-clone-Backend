import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';
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
  @ApiResponse({status: 201, description:'User Was Created', type: Commentaries})
  @ApiResponse({status: 400, description:'Bad Request'})
  @ApiResponse({status: 403, description:'Token related'})
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
    @Param("twittId") twitt: Twitt

  ) {
    return this.commentsService.create(createCommentDto, user,twitt);
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
