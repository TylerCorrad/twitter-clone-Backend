import { Injectable } from '@nestjs/common';
import { CreateLikedcommentDto } from './dto/create-likedcomment.dto';
import { UpdateLikedcommentDto } from './dto/update-likedcomment.dto';

@Injectable()
export class LikedcommentsService {
  create(createLikedcommentDto: CreateLikedcommentDto) {
    return 'This action adds a new likedcomment';
  }

  findAll() {
    return `This action returns all likedcomments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likedcomment`;
  }

  update(id: number, updateLikedcommentDto: UpdateLikedcommentDto) {
    return `This action updates a #${id} likedcomment`;
  }

  remove(id: number) {
    return `This action removes a #${id} likedcomment`;
  }
}
