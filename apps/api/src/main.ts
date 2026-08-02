import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita a política de CORS com configurações seguras baseada no docker-compose.yml e .env
  app.enableCors({
    origin: process.env.CORS_ORIGIN || `http://localhost:${process.env.EDUCADMIN_PORTA_WEB || 3001}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  // Porta baseada na configuração da aplicação, garantindo 3000 por padrão (API) e 3001 para (WEB)
  const port = process.env.EDUCADMIN_PORTA_API || 3000;
  await app.listen(port);
  console.log(`EducAdmin API rodando na porta ${port}`);
}
bootstrap();