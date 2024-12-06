import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest31733317349824 implements MigrationInterface {
    name = 'Latest31733317349824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_history" DROP CONSTRAINT "FK_3b91acf386cb5e8cb5984ec4b0c"`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP CONSTRAINT "FK_7c98789fd571860bd6a537840b1"`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP COLUMN "issueTo"`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD "issueTo" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP COLUMN "issueBy"`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD "issueBy" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD CONSTRAINT "FK_3b91acf386cb5e8cb5984ec4b0c" FOREIGN KEY ("issueTo") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD CONSTRAINT "FK_7c98789fd571860bd6a537840b1" FOREIGN KEY ("issueBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_history" DROP CONSTRAINT "FK_7c98789fd571860bd6a537840b1"`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP CONSTRAINT "FK_3b91acf386cb5e8cb5984ec4b0c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP COLUMN "issueBy"`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD "issueBy" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP COLUMN "issueTo"`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD "issueTo" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD CONSTRAINT "FK_7c98789fd571860bd6a537840b1" FOREIGN KEY ("issueBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD CONSTRAINT "FK_3b91acf386cb5e8cb5984ec4b0c" FOREIGN KEY ("issueTo") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
