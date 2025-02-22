import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetweetsService } from './retweets.service';
import { RetweetsController } from './retweets.controller';
import { Retweet } from './entities/retweet.entity';
import { Twitt } from 'src/twitts/entities/twitt.entity';
import { PassportModule } from '@nestjs/passport'; // 👈 Agregado aquí

@Module({
  imports: [
    TypeOrmModule.forFeature([Retweet, Twitt]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // 👈 Agregado aquí
  ],
  controllers: [RetweetsController],
  providers: [RetweetsService],
  exports: [RetweetsService],
})
export class RetweetsModule {}
