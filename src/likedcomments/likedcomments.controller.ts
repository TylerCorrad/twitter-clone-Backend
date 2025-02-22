import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikedcommentsService } from './likedcomments.service';


@Controller('likedcomments')
export class LikedcommentsController {
  constructor(private readonly likedcommentsService: LikedcommentsService) {}

  @Post()
  create(@Body() createLikedcommentDto) {
    return this.likedcommentsService.create(createLikedcommentDto);
  }

  @Get()
  findAll() {
    return this.likedcommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likedcommentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikedcommentDto) {
    return this.likedcommentsService.update(+id, updateLikedcommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likedcommentsService.remove(+id);
  }
}
