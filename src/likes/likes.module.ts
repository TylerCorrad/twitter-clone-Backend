import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Like } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Twitt } from 'src/twitts/entities/twitt.entity';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [
    TypeOrmModule.forFeature([Like, Twitt]),
    AuthModule,
  ],
})
export class LikesModule {}
