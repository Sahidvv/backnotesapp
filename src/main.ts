import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express'; // Importar el adaptador de Express
import express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server)); // Usar Express como adaptador para NestJS

  // Configuración de CORS
  app.enableCors({
    origin: [
      'https://frontnotes.vercel.app',
      'https://backnotesapp.vercel.app',
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

void bootstrap();
