import { DataSource, DataSourceOptions } from 'typeorm';

// Este arquivo será usado pelas migrations do TypeORM via CLI.
// Como a CLI não injeta o NestJS ConfigService, precisamos ler diretamente o env (apenas para migrations).

const config: DataSourceOptions = {
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

export const AppDataSource = new DataSource(config);