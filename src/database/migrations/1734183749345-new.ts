import { MigrationInterface, QueryRunner } from "typeorm";

export class New1734183749345 implements MigrationInterface {
    name = 'New1734183749345'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "UQ_9964b403bd69d2e36cbd5a01a84" UNIQUE ("isbno")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_9964b403bd69d2e36cbd5a01a84"`);
    }

}
