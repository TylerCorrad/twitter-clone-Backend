import { Module } from '@nestjs/common';
import { LikedcommentsService } from './likedcomments.service';
import { LikedcommentsController } from './likedcomments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Likedcomment } from './entities/likedcomment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LikedcommentsController],
  providers: [LikedcommentsService],
  imports:[
        TypeOrmModule.forFeature([Likedcomment]),
        AuthModule,
      ]
})
export class LikedcommentsModule {}
