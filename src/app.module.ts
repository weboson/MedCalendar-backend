import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // доп lib для работы с .env - файлами 
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeModule } from './recipe/recipe.module';
import { MealscheduleModule } from './mealschedule/mealschedule.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    isGlobal: true,
  }), TypeOrmModule.forRootAsync({
    imports: [ConfigModule], // lib работа с .env
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      synchronize: true, // синхронизировать (в build убрать)
      entities: [__dirname + '/**/*.entity{.js, .ts}'], // подключим наши схемы БД (какие поля и types есть таблицах (user, auth etc.) БД). __dirname - это от глобальная переменная в Nodejs
    }),
    inject: [ConfigService], // подключить
  }), RecipeModule, MealscheduleModule, AuthModule],
  controllers: [AppController], // типа роуты
  providers: [AppService], // логика
})
export class AppModule { }
