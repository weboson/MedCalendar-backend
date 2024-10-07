import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // импортируем нашу таблицу User, чтобы она была доступна в модуле.
    // импорт JWT модуль
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // из .env файла 
        signOptions: { expiresIn: '30d' } // токен будет действителен 30 дней, после снова сгенерируется новый токен
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // тобы он был виден за пределами этого модуля (использовальзуется в AuthService)
})
export class UserModule {}
