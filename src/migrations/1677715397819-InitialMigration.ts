import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1677715397819 implements MigrationInterface {
    name = 'InitialMigration1677715397819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying(45) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(6), "city" character varying(20) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "realEstate" ("id" SERIAL NOT NULL, "sold" boolean NOT NULL DEFAULT true, "value" numeric(12,2) NOT NULL DEFAULT '0', "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "categoryId" integer, CONSTRAINT "PK_3dda4b00f0afdfda35742b06969" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedulesUserProperties" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "realEstateId" integer, "userId" integer, CONSTRAINT "PK_63adfdcbfb7346d6a8690014743" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL DEFAULT true, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_66429ecade1b04f502b6e42c7a8" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedulesUserProperties" ADD CONSTRAINT "FK_540073b3f90eee6607e2a7a9517" FOREIGN KEY ("realEstateId") REFERENCES "realEstate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedulesUserProperties" ADD CONSTRAINT "FK_b0837dd1aa84d93de024b886c4e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedulesUserProperties" DROP CONSTRAINT "FK_b0837dd1aa84d93de024b886c4e"`);
        await queryRunner.query(`ALTER TABLE "schedulesUserProperties" DROP CONSTRAINT "FK_540073b3f90eee6607e2a7a9517"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_66429ecade1b04f502b6e42c7a8"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "schedulesUserProperties"`);
        await queryRunner.query(`DROP TABLE "realEstate"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
