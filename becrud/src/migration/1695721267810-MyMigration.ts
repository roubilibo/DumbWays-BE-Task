import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1695721267810 implements MigrationInterface {
    name = 'MyMigration1695721267810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paslon" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paslon" ALTER COLUMN "name" DROP NOT NULL`);
    }

}
