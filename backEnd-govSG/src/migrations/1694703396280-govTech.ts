import { MigrationInterface, QueryRunner } from "typeorm";

export class GovTech1694703396280 implements MigrationInterface {
    name = 'GovTech1694703396280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("govId" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_username" UNIQUE ("username"), CONSTRAINT "PK_govId" PRIMARY KEY ("govId"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "timeStamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '"2023-09-14T14:56:37.024Z"', "govId" uuid, CONSTRAINT "UQ_token" UNIQUE ("token"), CONSTRAINT "PK_sessionId" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_userGovId" FOREIGN KEY ("govId") REFERENCES "user"("govId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_userGovId"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
