import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTurmasMatriculasTables1722384000003 implements MigrationInterface {
    name = 'CreateTurmasMatriculasTables1722384000003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "series" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying NOT NULL,
                "descricao" character varying,
                "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "tenant_id" uuid NOT NULL,
                CONSTRAINT "PK_series" PRIMARY KEY ("id")
            );

            CREATE TYPE "turno_turma_enum" AS ENUM ('MATUTINO', 'VESPERTINO', 'NOTURNO', 'INTEGRAL');

            CREATE TABLE "turmas" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying NOT NULL,
                "ano_letivo" integer NOT NULL,
                "turno" "turno_turma_enum" NOT NULL,
                "capacidade" integer NOT NULL DEFAULT 40,
                "ativo" boolean NOT NULL DEFAULT true,
                "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "serie_id" uuid,
                "tenant_id" uuid NOT NULL,
                CONSTRAINT "PK_turmas" PRIMARY KEY ("id")
            );

            CREATE TYPE "status_matricula_enum" AS ENUM ('ATIVA', 'INATIVA', 'TRANSFERIDO', 'CONCLUIDA');

            CREATE TABLE "matriculas" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "data_matricula" date NOT NULL,
                "status" "status_matricula_enum" NOT NULL DEFAULT 'ATIVA',
                "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "aluno_id" uuid NOT NULL,
                "turma_id" uuid NOT NULL,
                "tenant_id" uuid NOT NULL,
                CONSTRAINT "PK_matriculas" PRIMARY KEY ("id")
            );

            ALTER TABLE "series" ADD CONSTRAINT "FK_series_tenant" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
            ALTER TABLE "turmas" ADD CONSTRAINT "FK_turmas_serie" FOREIGN KEY ("serie_id") REFERENCES "series"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
            ALTER TABLE "turmas" ADD CONSTRAINT "FK_turmas_tenant" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
            ALTER TABLE "matriculas" ADD CONSTRAINT "FK_matriculas_aluno" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
            ALTER TABLE "matriculas" ADD CONSTRAINT "FK_matriculas_turma" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
            ALTER TABLE "matriculas" ADD CONSTRAINT "FK_matriculas_tenant" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matriculas" DROP CONSTRAINT "FK_matriculas_tenant"`);
        await queryRunner.query(`ALTER TABLE "matriculas" DROP CONSTRAINT "FK_matriculas_turma"`);
        await queryRunner.query(`ALTER TABLE "matriculas" DROP CONSTRAINT "FK_matriculas_aluno"`);
        await queryRunner.query(`ALTER TABLE "turmas" DROP CONSTRAINT "FK_turmas_tenant"`);
        await queryRunner.query(`ALTER TABLE "turmas" DROP CONSTRAINT "FK_turmas_serie"`);
        await queryRunner.query(`ALTER TABLE "series" DROP CONSTRAINT "FK_series_tenant"`);
        await queryRunner.query(`DROP TABLE "matriculas"`);
        await queryRunner.query(`DROP TYPE "status_matricula_enum"`);
        await queryRunner.query(`DROP TABLE "turmas"`);
        await queryRunner.query(`DROP TYPE "turno_turma_enum"`);
        await queryRunner.query(`DROP TABLE "series"`);
    }
}
