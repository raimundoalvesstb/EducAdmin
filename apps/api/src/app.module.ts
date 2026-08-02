import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './configuracao/database.config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';
import { AlunosModule } from './alunos/alunos.module';
import { TurmasModule } from './turmas/turmas.module';
import { MatriculasModule } from './matriculas/matriculas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsuariosModule,
    AuthModule,
    TenantsModule,
    AlunosModule,
    TurmasModule,
    MatriculasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
