import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('crawler-demo')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .build();
  SwaggerModule.setup(
    '/',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );
  await app.listen(3000);
}

bootstrap();
