import { MigrationInterface, QueryRunner } from "typeorm";

export class fixRealEstate1677715637680 implements MigrationInterface {
    name = 'fixRealEstate1677715637680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstate" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "UQ_8137b7f715382ad34dc87367d21" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "realEstate" ADD CONSTRAINT "FK_8137b7f715382ad34dc87367d21" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "FK_8137b7f715382ad34dc87367d21"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP CONSTRAINT "UQ_8137b7f715382ad34dc87367d21"`);
        await queryRunner.query(`ALTER TABLE "realEstate" DROP COLUMN "addressId"`);
    }

}
