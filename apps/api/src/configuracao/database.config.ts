import { DataSourceOptions } from 'typeorm';

const isTestEnv = process.env.NODE_ENV === 'test';
if (!isTestEnv && !process.env.EDUCADMIN_BD_SENHA) {
  throw new Error('A variável de ambiente EDUCADMIN_BD_SENHA é obrigatória em ambientes não-teste.');
}

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.EDUCADMIN_BD_SERVIDOR || 'localhost',
  port: parseInt(process.env.EDUCADMIN_BD_PORTA || '5432', 10),
  username: process.env.EDUCADMIN_BD_USUARIO || 'educadmin',
  password: process.env.EDUCADMIN_BD_SENHA as string,
  database: process.env.EDUCADMIN_BD_NOME || 'educadmin',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false, // Migrations will handle schema updates
};
