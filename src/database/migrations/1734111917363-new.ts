import { MigrationInterface, QueryRunner } from "typeorm";

export class New1734111917363 implements MigrationInterface {
    name = 'New1734111917363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."authentication_role_enum" AS ENUM('student', 'teacher')`);
        await queryRunner.query(`CREATE TABLE "authentication" ("id" uuid NOT NULL, "username" character varying(64) NOT NULL, "password" character varying(255) NOT NULL, "last_password" character varying array, "role" "public"."authentication_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_684fcb9924c8502d64b129cc8b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."book_status_enum" AS ENUM('available', 'issued')`);
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "author" character varying NOT NULL, "isbno" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "status" "public"."book_status_enum" NOT NULL DEFAULT 'available', CONSTRAINT "UQ_c10a44a29ef231062f22b1b7ac5" UNIQUE ("title"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "issue_date" TIMESTAMP NOT NULL DEFAULT now(), "return_date" TIMESTAMP, "title" character varying NOT NULL, "issue_to" uuid NOT NULL, "issue_by" uuid NOT NULL, "bookId" uuid, "issuedToId" uuid, "issuedById" uuid, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "phone" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_c3c5b730cb6e90b5ad1efc58512" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_7f32426206e0fdbae1a5a30e2ba" FOREIGN KEY ("issuedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_1382562975a842cf2fd62027cda" FOREIGN KEY ("issuedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_1382562975a842cf2fd62027cda"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_7f32426206e0fdbae1a5a30e2ba"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_c3c5b730cb6e90b5ad1efc58512"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "history"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TYPE "public"."book_status_enum"`);
        await queryRunner.query(`DROP TABLE "authentication"`);
        await queryRunner.query(`DROP TYPE "public"."authentication_role_enum"`);
    }

}
