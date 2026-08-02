import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsuariosTable1722384000001 implements MigrationInterface {
    name = 'CreateUsuariosTable1722384000001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "papel_usuario_enum" AS ENUM ('ADMINISTRADOR', 'DIRETOR', 'COORDENADOR', 'SECRETARIO', 'PROFESSOR', 'ALUNO', 'RESPONSAVEL');

            CREATE TABLE "usuarios" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome_completo" character varying NOT NULL,
                "email" character varying NOT NULL,
                "senha_hash" character varying NOT NULL,
                "papel" "papel_usuario_enum" NOT NULL DEFAULT 'ALUNO',
                "ativo" boolean NOT NULL DEFAULT true,
                "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
                "tenant_id" uuid,
                CONSTRAINT "UQ_email" UNIQUE ("email"),
                CONSTRAINT "PK_usuarios" PRIMARY KEY ("id")
            );

            ALTER TABLE "usuarios" ADD CONSTRAINT "FK_usuarios_tenant" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_usuarios_tenant"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "papel_usuario_enum"`);
    }
}
