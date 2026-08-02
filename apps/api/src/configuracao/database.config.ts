import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): DataSourceOptions => {
  const isTestEnv = configService.get<string>('NODE_ENV') === 'test';

  if (!isTestEnv) {
    if (!configService.get<string>('EDUCADMIN_BD_SENHA')) {
      throw new Error('A variável de ambiente EDUCADMIN_BD_SENHA é obrigatória em ambientes não-teste.');
    }
    if (!configService.get<string>('EDUCADMIN_BD_USUARIO')) {
      throw new Error('A variável de ambiente EDUCADMIN_BD_USUARIO é obrigatória em ambientes não-teste.');
    }
    if (!configService.get<string>('EDUCADMIN_BD_NOME')) {
      throw new Error('A variável de ambiente EDUCADMIN_BD_NOME é obrigatória em ambientes não-teste.');
    }
  }

  return {
    type: 'postgres',
    host: configService.get<string>('EDUCADMIN_BD_SERVIDOR') || 'localhost',
    port: parseInt(configService.get<string>('EDUCADMIN_BD_PORTA') || '5432', 10),
    username: configService.get<string>('EDUCADMIN_BD_USUARIO'),
    password: configService.get<string>('EDUCADMIN_BD_SENHA'),
    database: configService.get<string>('EDUCADMIN_BD_NOME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: false, // Migrations will handle schema updates
  };
};