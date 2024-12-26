import { MigrationInterface, QueryRunner } from "typeorm";

export class New1734155733231 implements MigrationInterface {
    name = 'New1734155733231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_c3c5b730cb6e90b5ad1efc58512"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "history" ADD "book_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "UQ_c10a44a29ef231062f22b1b7ac5"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "UQ_c10a44a29ef231062f22b1b7ac5" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "book_id"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "history" ADD "bookId" uuid`);
        await queryRunner.query(`ALTER TABLE "history" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_c3c5b730cb6e90b5ad1efc58512" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
