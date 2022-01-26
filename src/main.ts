import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors(); // for testing auth0 with example SPA
  const config = new DocumentBuilder()
    .setTitle('The Events CMS')
    .setDescription('')
    .setVersion('1.0')
    .addTag('ContentGroup', 'Управление группами контента для экранов')
    .addTag('Content', 'Управление контентом в группах')
    .addTag('Screens', 'Управление экранами')
    .addTag('Playlists', 'Плейлисты')
    .addTag('Events', 'Мероприятия')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
