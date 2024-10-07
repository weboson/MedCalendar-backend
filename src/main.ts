import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api') // станет: http://localhost:3000/api
  app.enableCors(); // для предоставления доверия обмена данными между источниками (доменами и поддоменами) запроса - CORS (безопасность между источниками): https://docs.nestjs.com/security/cors#getting-started
  await app.listen(3000);
}
bootstrap();
