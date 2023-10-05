import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1696488611473 implements MigrationInterface {
    name = 'MyMigration1696488611473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voter" RENAME COLUMN "voter_name" TO "voterName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voter" RENAME COLUMN "voterName" TO "voter_name"`);
    }

}
