import { Injectable } from '@nestjs/common';


@Injectable()
export class LikedcommentsService {
  create(createLikedcommentDto) {
    return 'This action adds a new likedcomment';
  }

  findAll() {
    return `This action returns all likedcomments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likedcomment`;
  }

  update(id: number, updateLikedcommentDto) {
    return `This action updates a #${id} likedcomment`;
  }

  remove(id: number) {
    return `This action removes a #${id} likedcomment`;
  }
}
