import { MigrationInterface, QueryRunner, Repository } from 'typeorm'
import { Agency } from '../entities/agency'
import dataSource from '../ormConfig'

const agencies: {
    name: string;
}[] = [
  { name: 'A*Star' },
  { name: 'A*STAR Companies' },
  { name: 'ACRA' },
  { name: 'AGD Pensions Branch' },
  { name: "Attorney-General's Chambers" },
  { name: "Auditor-General's Office" },
  { name: 'Board of Architects' },
  { name: 'Building & Construction Authority' },
  { name: 'Central Provident Fund' },
  { name: 'Civil List for President' },
  { name: 'Civil Service College' },
  { name: 'Competition and Consumer Comm' },
  { name: 'Council for Estate Agencies' },
  { name: 'Civil Aviation Authority of Singapore' },
  { name: 'Defence Science & Tech Agency' },
  { name: 'Economic Development Board' },
  { name: 'Energy Market Authority' },
  { name: 'Enterprise Singapore' },
  { name: 'Gambling Regulatory Authority' },
  { name: 'GovTech' }
]

export class GovTech1694702950306 implements MigrationInterface {
  private agencyRepository: Repository<Agency>
  name = 'GovTech1694702950306'

  constructor () {
    this.agencyRepository = dataSource.getRepository(Agency)
  }

  private async populateAgency (): Promise<void> {
    await this.agencyRepository.save(agencies)
  }

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "agency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_agencyId" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "user" ("govId" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT \'"2023-09-14T14:49:11.076Z"\', "agencyId" uuid, CONSTRAINT "UQ_email" UNIQUE ("email"), CONSTRAINT "PK_govId" PRIMARY KEY ("govId"))')
    await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "FK_agencyId" FOREIGN KEY ("agencyId") REFERENCES "agency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    this.populateAgency()
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "FK_agencyId"')
    await queryRunner.query('DROP TABLE "user"')
    await queryRunner.query('DROP TABLE "agency"')
    await this.agencyRepository.createQueryBuilder()
      .delete()
      .execute()
  }
}
