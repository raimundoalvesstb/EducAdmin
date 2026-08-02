import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frequencia } from './frequencia.entity';
import { Avaliacao } from './avaliacao.entity';
import { Nota } from './nota.entity';
import { FrequenciaServico } from './frequencia.service';
import { FrequenciaController } from './frequencia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Frequencia, Avaliacao, Nota])],
  providers: [FrequenciaServico],
  controllers: [FrequenciaController],
  exports: [FrequenciaServico],
})
export class DiarioModule {}
