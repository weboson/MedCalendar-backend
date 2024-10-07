import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigService, ConfigModule } from '@nestjs/config'; // lib работа с .env
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // из .env файла 
        signOptions: { expiresIn: '30d' } // токен будет действителен 30 дней, после снова сгенерируется новый токен
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
