import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express'; // Para usar Express en lugar del servidor predeterminado
import * as express from 'express';

const server = express(); // Crear la instancia de Express

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: ['https://frontnotes.vercel.app', 'https://backnotesapp.vercel.app'],
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.init();  // Asegurarse de que la app se inicializa correctamente
}

bootstrap();

export default server;  // Exportamos el servidor para que sea usado como función en Vercel
