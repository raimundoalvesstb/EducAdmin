import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Habilita a política de CORS com configurações seguras
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get('EDUCADMIN_PORTA_API') || configService.get('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
