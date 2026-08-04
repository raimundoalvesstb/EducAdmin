import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.EDUCADMIN_BD_SERVIDOR || 'localhost',
  port: parseInt(process.env.EDUCADMIN_BD_PORTA || '5432', 10),
  username: process.env.EDUCADMIN_BD_USUARIO as string,
  password: process.env.EDUCADMIN_BD_SENHA as string,
  database: process.env.EDUCADMIN_BD_NOME as string,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
};

export const AppDataSource = new DataSource(databaseConfig);
