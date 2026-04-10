import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { HttpModule } from './http/http.module';

import { GlobalExceptionFilter } from './http/filters/global-exception.filter';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: [
        'Accept',
        'Accept-Version',
        'Content-Type',
        'Api-Version',
        'Origin',
        'X-Requested-With',
        'Authorization',
      ],
      credentials: true,
      origin: '*',
    },
    bufferLogs: true,
  });

  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Info Tecnologia API')
    .setDescription('API for vehicle management system')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [HttpModule],
  });

  SwaggerModule.setup('docs', app, document);

  const { apiReference } = await import('@scalar/nestjs-api-reference');

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/openapi.json') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');
      res.json(document);
    } else {
      next();
    }
  });

  app.use(
    '/reference',
    apiReference({
      url: '/openapi.json',
    }),
  );

  await app.listen(3000);
}
bootstrap();
