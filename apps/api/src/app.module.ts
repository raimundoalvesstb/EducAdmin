import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';
import { AlunosModule } from './alunos/alunos.module';
import { TurmasModule } from './turmas/turmas.module';
import { MatriculasModule } from './matriculas/matriculas.module';
import { DiarioModule } from './diario/diario.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTestEnv = configService.get('NODE_ENV') === 'test';

        if (!isTestEnv) {
          if (!configService.get('EDUCADMIN_BD_SENHA')) {
            throw new Error('A variável de ambiente EDUCADMIN_BD_SENHA é obrigatória em ambientes não-teste.');
          }
          if (!configService.get('EDUCADMIN_BD_USUARIO')) {
            throw new Error('A variável de ambiente EDUCADMIN_BD_USUARIO é obrigatória em ambientes não-teste.');
          }
          if (!configService.get('EDUCADMIN_BD_NOME')) {
            throw new Error('A variável de ambiente EDUCADMIN_BD_NOME é obrigatória em ambientes não-teste.');
          }
        }

        return {
          type: 'postgres',
          host: configService.get('EDUCADMIN_BD_SERVIDOR') || 'localhost',
          port: parseInt(configService.get('EDUCADMIN_BD_PORTA') || '5432', 10),
          username: configService.get('EDUCADMIN_BD_USUARIO') as string,
          password: configService.get('EDUCADMIN_BD_SENHA') as string,
          database: configService.get('EDUCADMIN_BD_NOME') as string,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          synchronize: false,
        };
      },
    }),
    UsuariosModule,
    AuthModule,
    TenantsModule,
    AlunosModule,
    TurmasModule,
    MatriculasModule,
    DiarioModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
