import { Module } from '@nestjs/common';
import { TwittsService } from './twitts.service';
import { TwittsController } from './twitts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Twitt } from './entities/twitt.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Twitt]),  // Registra Twitt como entidad
    AuthModule,
  ],
  controllers: [TwittsController],
  providers: [TwittsService],
  exports: [TypeOrmModule],  // Exporta TypeOrmModule para que otros módulos puedan usar TwittRepository
})
export class TwittsModule {}