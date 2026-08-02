import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDiarioTables1722384000004 implements MigrationInterface {
    name = 'CreateDiarioTables1722384000004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "tipo_presenca_enum" AS ENUM ('PRESENTE', 'FALTA', 'FALTA_JUSTIFICADA');

            CREATE TABLE "frequencias" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "data_aula" date NOT NULL,
                "presenca" "tipo_presenca_enum" NOT NULL DEFAULT 'PRESENTE',
                "observacao" character varying,
                "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "matricula_id" uuid NOT NULL,
                "tenant_id" uuid NOT NULL,
                CONSTRAINT "PK_frequencias" PRIMARY KEY ("id")
            );

            CREATE TABLE "avaliacoes" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying NOT NULL,
                "peso" numeric(5,2) NOT NULL,
                "data_avaliacao" date NOT NULL,
                "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "turma_id" uuid NOT NULL,
                "tenant_id" uuid NOT NULL,
                CONSTRAINT "PK_avaliacoes" PRIMARY KEY ("id")
            );

            CREATE TABLE "notas" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "valor" numeric(5,2) NOT NULL,
                "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "matricula_id" uuid NOT NULL,
                "avaliacao_id" uuid NOT NULL,
                "tenant_id" uuid NOT NULL,
                CONSTRAINT "PK_notas" PRIMARY KEY ("id")
            );

            ALTER TABLE "frequencias" ADD CONSTRAINT "FK_frequencias_matricula" FOREIGN KEY ("matricula_id") REFERENCES "matriculas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
            ALTER TABLE "frequencias" ADD CONSTRAINT "FK_frequencias_tenant" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

            ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_avaliacoes_turma" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
            ALTER TABLE "avaliacoes" ADD CONSTRAINT "FK_avaliacoes_tenant" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

            ALTER TABLE "notas" ADD CONSTRAINT "FK_notas_matricula" FOREIGN KEY ("matricula_id") REFERENCES "matriculas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
            ALTER TABLE "notas" ADD CONSTRAINT "FK_notas_avaliacao" FOREIGN KEY ("avaliacao_id") REFERENCES "avaliacoes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
            ALTER TABLE "notas" ADD CONSTRAINT "FK_notas_tenant" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notas" DROP CONSTRAINT "FK_notas_tenant"`);
        await queryRunner.query(`ALTER TABLE "notas" DROP CONSTRAINT "FK_notas_avaliacao"`);
        await queryRunner.query(`ALTER TABLE "notas" DROP CONSTRAINT "FK_notas_matricula"`);

        await queryRunner.query(`ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_avaliacoes_tenant"`);
        await queryRunner.query(`ALTER TABLE "avaliacoes" DROP CONSTRAINT "FK_avaliacoes_turma"`);

        await queryRunner.query(`ALTER TABLE "frequencias" DROP CONSTRAINT "FK_frequencias_tenant"`);
        await queryRunner.query(`ALTER TABLE "frequencias" DROP CONSTRAINT "FK_frequencias_matricula"`);

        await queryRunner.query(`DROP TABLE "notas"`);
        await queryRunner.query(`DROP TABLE "avaliacoes"`);
        await queryRunner.query(`DROP TABLE "frequencias"`);
        await queryRunner.query(`DROP TYPE "tipo_presenca_enum"`);
    }
}
