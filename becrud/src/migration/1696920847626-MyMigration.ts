import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1696920847626 implements MigrationInterface {
    name = 'MyMigration1696920847626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "voter" ("id" SERIAL NOT NULL, "voterName" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "paslonId" integer, CONSTRAINT "PK_c1a0d8fd992c199219325d43705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "visi" character varying, "image" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fb7268cc991dfa9da1aa9c02941" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partai" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9c5c70fa29884e15f3b88a1b40b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "name" character varying, "posted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslons_parties_partai" ("paslonsId" integer NOT NULL, "partaiId" integer NOT NULL, CONSTRAINT "PK_5abbf98ced680c1d1a274d82cb0" PRIMARY KEY ("paslonsId", "partaiId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6046bca6f45451297ad73e6695" ON "paslons_parties_partai" ("paslonsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aaaa3734274c9ee8926996bb1c" ON "paslons_parties_partai" ("partaiId") `);
        await queryRunner.query(`ALTER TABLE "voter" ADD CONSTRAINT "FK_b6a3557076b565c888eb23f8308" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "voter" ADD CONSTRAINT "FK_c84e4a554527f0c6dd46919bafe" FOREIGN KEY ("paslonId") REFERENCES "paslons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "paslons_parties_partai" ADD CONSTRAINT "FK_6046bca6f45451297ad73e66952" FOREIGN KEY ("paslonsId") REFERENCES "paslons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "paslons_parties_partai" ADD CONSTRAINT "FK_aaaa3734274c9ee8926996bb1c6" FOREIGN KEY ("partaiId") REFERENCES "partai"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paslons_parties_partai" DROP CONSTRAINT "FK_aaaa3734274c9ee8926996bb1c6"`);
        await queryRunner.query(`ALTER TABLE "paslons_parties_partai" DROP CONSTRAINT "FK_6046bca6f45451297ad73e66952"`);
        await queryRunner.query(`ALTER TABLE "voter" DROP CONSTRAINT "FK_c84e4a554527f0c6dd46919bafe"`);
        await queryRunner.query(`ALTER TABLE "voter" DROP CONSTRAINT "FK_b6a3557076b565c888eb23f8308"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aaaa3734274c9ee8926996bb1c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6046bca6f45451297ad73e6695"`);
        await queryRunner.query(`DROP TABLE "paslons_parties_partai"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TABLE "partai"`);
        await queryRunner.query(`DROP TABLE "paslons"`);
        await queryRunner.query(`DROP TABLE "voter"`);
    }

}
