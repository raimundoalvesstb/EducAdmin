import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAlunosTable1722384000002 implements MigrationInterface {
    name = 'CreateAlunosTable1722384000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "alunos" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome_completo" character varying NOT NULL,
                "data_nascimento" date NOT NULL,
                "matricula" character varying,
                "cpf" character varying,
                "ativo" boolean NOT NULL DEFAULT true,
                "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "tenant_id" uuid NOT NULL,
                CONSTRAINT "PK_alunos" PRIMARY KEY ("id")
            );

            ALTER TABLE "alunos" ADD CONSTRAINT "FK_alunos_tenant" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alunos" DROP CONSTRAINT "FK_alunos_tenant"`);
        await queryRunner.query(`DROP TABLE "alunos"`);
    }
}
