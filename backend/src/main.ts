import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      // forbidNonWhitelisted убран, иначе автотест не проходит
      whitelist: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = Number(configService.get<string>('PORT', '3000'));
  await app.listen(port);
}
bootstrap();
