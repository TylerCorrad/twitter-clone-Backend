import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commentaries } from './entities/comment.entity';
import { TwittsModule } from 'src/twitts/twitts.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports:[
      TypeOrmModule.forFeature([Commentaries]),
      AuthModule,
      TwittsModule,
    ]
})
export class CommentsModule {}
