import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api') // станет: http://localhost:3001/api
  app.enableCors({ // для предоставления доверия обмена данными между источниками (доменами и поддоменами) запроса - CORS (безопасность между источниками): https://docs.nestjs.com/security/cors#getting-started
    origin: ['http://localhost:3000', 'http://45.137.153.37:3000'], //! public ip VPS
  }); 
  await app.listen(3001); //! какой порт слушать (порт бэкенда сервера)(на каком сидит бэкенд)
}
bootstrap();
