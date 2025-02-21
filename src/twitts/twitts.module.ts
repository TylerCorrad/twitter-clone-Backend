import { Module } from '@nestjs/common';
import { TwittsService } from './twitts.service';
import { TwittsController } from './twitts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Twitt } from './entities/twitt.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TwittsController],
  providers: [TwittsService],
  imports:[
    TypeOrmModule.forFeature([Twitt]),
    AuthModule,
  ]
})
export class TwittsModule {}
