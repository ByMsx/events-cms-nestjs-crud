import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('The Events CMS')
    .setDescription('')
    .setVersion('1.0')
    .addTag('Content', 'Управление контентом для экранов')
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
