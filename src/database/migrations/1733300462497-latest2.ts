import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest21733300462497 implements MigrationInterface {
    name = 'Latest21733300462497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("bookId" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, CONSTRAINT "UQ_c10a44a29ef231062f22b1b7ac5" UNIQUE ("title"), CONSTRAINT "PK_dc3b1731d65c319e954cb621c1b" PRIMARY KEY ("bookId"))`);
        await queryRunner.query(`CREATE TABLE "book_history" ("hist_id" SERIAL NOT NULL, "issue_date" date NOT NULL, "return_date" date, "title" character varying NOT NULL, "issueTo" uuid NOT NULL, "issueBy" uuid NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_96f12b83ba222347b64f4ea0298" PRIMARY KEY ("hist_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD CONSTRAINT "FK_65247f2fb4d4a5577a7f58c8618" FOREIGN KEY ("title") REFERENCES "book"("title") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD CONSTRAINT "FK_3b91acf386cb5e8cb5984ec4b0c" FOREIGN KEY ("issueTo") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_history" ADD CONSTRAINT "FK_7c98789fd571860bd6a537840b1" FOREIGN KEY ("issueBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_history" DROP CONSTRAINT "FK_7c98789fd571860bd6a537840b1"`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP CONSTRAINT "FK_3b91acf386cb5e8cb5984ec4b0c"`);
        await queryRunner.query(`ALTER TABLE "book_history" DROP CONSTRAINT "FK_65247f2fb4d4a5577a7f58c8618"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "book_history"`);
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
