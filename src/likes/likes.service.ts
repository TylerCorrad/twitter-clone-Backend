import { Injectable } from '@nestjs/common';


@Injectable()
export class LikesService {
  create(createLikeDto) { //RECUERDA QUE QUITASTE EL CREATELIKEDTO: CREATELIKEDTO
    return 'This action adds a new like';
  }

  findAll() {
    return `This action returns all likes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
