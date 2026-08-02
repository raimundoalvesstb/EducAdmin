import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frequencia } from './frequencia.entity';
import { Avaliacao } from './avaliacao.entity';
import { Nota } from './nota.entity';
import { FrequenciaServico } from './frequencia.service';
import { FrequenciaController } from './frequencia.controller';
import { AvaliacaoServico } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { NotaServico } from './nota.service';
import { NotaController } from './nota.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Frequencia, Avaliacao, Nota])],
  providers: [FrequenciaServico, AvaliacaoServico, NotaServico],
  controllers: [FrequenciaController, AvaliacaoController, NotaController],
  exports: [FrequenciaServico, AvaliacaoServico, NotaServico],
})
export class DiarioModule {}
