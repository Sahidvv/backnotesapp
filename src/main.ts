import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();  // Usamos Express para Vercel

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server)); // Usar Express como adaptador para NestJS

  app.enableCors({
    origin: [
      'https://frontnotes.vercel.app',
      'https://backnotesapp.vercel.app',
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // En lugar de `app.listen`, usamos el manejador para Vercel
  return app.init();
}

bootstrap();

// Exportar para que sea utilizado como una función sin servidor en Vercel
export default server;
