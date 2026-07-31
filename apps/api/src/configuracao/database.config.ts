import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.EDUCADMIN_BD_SERVIDOR || 'localhost',
  port: parseInt(process.env.EDUCADMIN_BD_PORTA || '5432', 10),
  username: process.env.EDUCADMIN_BD_USUARIO || 'educadmin',
  password: process.env.EDUCADMIN_BD_SENHA || 'educadmin',
  database: process.env.EDUCADMIN_BD_NOME || 'educadmin',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false, // Migrations will handle schema updates
};
