import { DataSourceOptions } from 'typeorm';

const isTestEnv = process.env.NODE_ENV === 'test';
if (!isTestEnv) {
  if (!process.env.EDUCADMIN_BD_SENHA) {
    throw new Error('A variável de ambiente EDUCADMIN_BD_SENHA é obrigatória em ambientes não-teste.');
  }
  if (!process.env.EDUCADMIN_BD_USUARIO) {
    throw new Error('A variável de ambiente EDUCADMIN_BD_USUARIO é obrigatória em ambientes não-teste.');
  }
  if (!process.env.EDUCADMIN_BD_NOME) {
    throw new Error('A variável de ambiente EDUCADMIN_BD_NOME é obrigatória em ambientes não-teste.');
  }
}

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.EDUCADMIN_BD_SERVIDOR || 'localhost',
  port: parseInt(process.env.EDUCADMIN_BD_PORTA || '5432', 10),
  username: process.env.EDUCADMIN_BD_USUARIO as string,
  password: process.env.EDUCADMIN_BD_SENHA as string,
  database: process.env.EDUCADMIN_BD_NOME as string,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false, // Migrations will handle schema updates
};
