import { MigrationInterface, QueryRunner } from "typeorm";

export class Bookhistory1734195932799 implements MigrationInterface {
    name = 'Bookhistory1734195932799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_7f32426206e0fdbae1a5a30e2ba"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_1382562975a842cf2fd62027cda"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "issuedToId"`);
        await queryRunner.query(`ALTER TABLE "history" DROP COLUMN "issuedById"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "history" ADD "issuedById" uuid`);
        await queryRunner.query(`ALTER TABLE "history" ADD "issuedToId" uuid`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_1382562975a842cf2fd62027cda" FOREIGN KEY ("issuedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_7f32426206e0fdbae1a5a30e2ba" FOREIGN KEY ("issuedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
