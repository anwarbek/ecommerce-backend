import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { json } from 'express';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(json({ limit: '5mb' }));
  app.enableCors();
  await app.listen(process.env.PORT || 5000);
  console.log(`Server running on ${process.env.PORT || 5000}`);
}
bootstrap();
