import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports:[
        // TypeOrmModule.forFeature([]),
        AuthModule,
      ]
})
export class LikesModule {}
