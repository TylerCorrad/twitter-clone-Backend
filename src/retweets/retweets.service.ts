import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Retweet } from './entities/retweet.entity';
import { User } from 'src/auth/entities/user.entity';
import { Twitt } from 'src/twitts/entities/twitt.entity';

@Injectable()
export class RetweetsService {
  constructor(
    @InjectRepository(Retweet)
    private readonly retweetRepository: Repository<Retweet>,

    @InjectRepository(Twitt)
    private readonly twittRepository: Repository<Twitt>,
  ) {}

  async retweet(user: User, twittId: string) {
    const twitt = await this.twittRepository.findOne({ where: { twitt_id: twittId } });
    if (!twitt) {
      throw new Error('Tweet no encontrado');
    }

    const existingRetweet = await this.retweetRepository.findOne({ 
      where: { user: { id: user.id }, twitt: { twitt_id: twittId } } 
    });

    if (existingRetweet) {
      // Si el usuario ya hizo retweet, se elimina (deshace el retweet)
      await this.retweetRepository.remove(existingRetweet);
      return { message: 'Retweet eliminado' };
    }

    const retweet = this.retweetRepository.create({ user, twitt });
    await this.retweetRepository.save(retweet);
    return { message: 'Retweet agregado' };
  }

  async getUserRetweets(userId: string) {
    const retweets = await this.retweetRepository.find({
      where: { user: { id: userId } },
      relations: ['twitt'], // Trae también los tweets retuiteados
    });

    return retweets.map(retweet => retweet.twitt);
  }
}
