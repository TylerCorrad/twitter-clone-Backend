import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { TwittsService } from './twitts.service';
import { CreateTwittDto } from './dto/create-twitt.dto';
import { UpdateTwittDto } from './dto/update-twitt.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Twitt } from './entities/twitt.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@ApiBearerAuth()
@Controller('twitts')
export class TwittsController {
  constructor(private readonly twittsService: TwittsService) {}

  @Post()
  @Auth(ValidRoles.user) 
  @ApiResponse({status: 201, description:'User Was Created', type: Twitt})
  @ApiResponse({status: 400, description:'Bad Request'})
  @ApiResponse({status: 403, description:'Token related'})
  create(
    @Body() createTwittDto: CreateTwittDto,
    @GetUser() user: User,

  ) {
    return this.twittsService.create(createTwittDto, user);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.twittsService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth(ValidRoles.user) 
  findOne(@Param('term') term: string) {
    return this.twittsService.findOne(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.user) 
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateTwittDto: UpdateTwittDto,
    @GetUser() user: User,
  ){
    return this.twittsService.update(id, updateTwittDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.user) 
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.twittsService.remove(id);
  }
}
