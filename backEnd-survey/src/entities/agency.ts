import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Agency {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_agencyId' })
    id!: string

  @Column()
    name!: string
}
