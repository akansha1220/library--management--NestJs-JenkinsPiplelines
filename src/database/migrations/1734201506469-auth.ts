import { MigrationInterface, QueryRunner } from "typeorm";

export class Auth1734201506469 implements MigrationInterface {
    name = 'Auth1734201506469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "auth_id" uuid NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "auth_id"`);
    }

}
