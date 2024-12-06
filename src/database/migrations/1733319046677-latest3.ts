import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest31733319046677 implements MigrationInterface {
    name = 'Latest31733319046677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_history" DROP COLUMN "issue_date"`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP COLUMN "return_date"`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD "issuedDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD "returnedDate" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_history" DROP COLUMN "returnedDate"`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP COLUMN "issuedDate"`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD "return_date" date`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD "issue_date" date NOT NULL`);
    }

}
