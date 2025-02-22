import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { User } from 'src/auth/entities/user.entity';
import { Twitt } from 'src/twitts/entities/twitt.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,

    @InjectRepository(Twitt)
    private readonly twittsRepository: Repository<Twitt>,
  ) {}

  async toggleLike(user: User, twittId: string) {
    const twitt = await this.twittsRepository.findOne({
      where: { twitt_id: twittId },
      relations: ['likes'],
    });

    if (!twitt) throw new NotFoundException('Twitt no encontrado');

    const existingLike = await this.likesRepository.findOne({
      where: { user: { id: user.id }, twitt: { twitt_id: twittId } },
    });

    if (existingLike) {
      await this.likesRepository.remove(existingLike);
      return { message: 'Like eliminado' };
    } else {
      const like = this.likesRepository.create({ user, twitt });
      await this.likesRepository.save(like);
      return { message: 'Like agregado' };
    }
  }

  async getLikes(twittId: string, userId: string) {
    const totalLikes = await this.likesRepository.count({
      where: { twitt: { twitt_id: twittId } },
    });

    const likedByCurrentUser = await this.likesRepository.findOne({
      where: { twitt: { twitt_id: twittId }, user: { id: userId } },
    });

    return {
      likes: totalLikes,
      likedByCurrentUser: !!likedByCurrentUser,
    };
  }
}
