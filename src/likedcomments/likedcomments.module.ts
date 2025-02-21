import { Module } from '@nestjs/common';
import { LikedcommentsService } from './likedcomments.service';
import { LikedcommentsController } from './likedcomments.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LikedcommentsController],
  providers: [LikedcommentsService],
  imports:[
        // TypeOrmModule.forFeature([]),
        AuthModule,
      ]
})
export class LikedcommentsModule {}
