import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Retweet } from './entities/retweet.entity';
import { Twitt } from 'src/twitts/entities/twitt.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class RetweetsService {
  constructor(
    @InjectRepository(Retweet)
    private readonly retweetRepository: Repository<Retweet>,
    @InjectRepository(Twitt)
    private readonly twittRepository: Repository<Twitt>,
  ) {}

  async create(twittId: string, user: User): Promise<Retweet> {
    const originalTwitt = await this.twittRepository.findOne({ where: { twitt_id: twittId } });

    if (!originalTwitt) {
      throw new NotFoundException('Tweet no encontrado');
    }

    // Evitar retweets duplicados del mismo usuario sobre el mismo tweet
    const existingRetweet = await this.retweetRepository.findOne({
      where: { user, originalTwitt },
    });

    if (existingRetweet) {
      throw new Error('Ya has retwitteado este tweet');
    }

    const retweet = this.retweetRepository.create({ user, originalTwitt });
    return this.retweetRepository.save(retweet);
  }

  async findAll(): Promise<Retweet[]> {
    return this.retweetRepository.find({ relations: ['user', 'originalTwitt'] });
  }
}
