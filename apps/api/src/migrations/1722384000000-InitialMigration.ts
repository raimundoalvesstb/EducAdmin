import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1722384000000 implements MigrationInterface {
    name = 'InitialMigration1722384000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tenants" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying NOT NULL,
                "subdominio" character varying NOT NULL,
                "schema_nome" character varying NOT NULL,
                "plano" character varying NOT NULL DEFAULT 'gratuito',
                "ativo" boolean NOT NULL DEFAULT true,
                "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_subdominio" UNIQUE ("subdominio"),
                CONSTRAINT "UQ_schema_nome" UNIQUE ("schema_nome"),
                CONSTRAINT "PK_tenants" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tenants"`);
    }
}
