import { MigrationInterface, QueryRunner } from "typeorm";

export class Auth1734171928414 implements MigrationInterface {
    name = 'Auth1734171928414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authentication" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authentication" ALTER COLUMN "id" DROP DEFAULT`);
    }

}
