import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports:[
      // TypeOrmModule.forFeature([]),
      AuthModule,
    ]
})
export class CommentsModule {}
