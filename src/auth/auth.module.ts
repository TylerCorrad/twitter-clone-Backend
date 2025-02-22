import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    
    PassportModule.register({ defaultStrategy: 'jwt' }), // ✅ Se asegura de registrar Passport con JWT

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // ✅ Se obtiene la clave JWT desde las variables de entorno
        signOptions: { expiresIn: '2h' },
      }),
    }),
  ],
  exports: [AuthService, JwtStrategy, PassportModule, JwtModule], // ✅ Exportamos AuthService también
})
export class AuthModule {}
