import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm'
import { Agency } from './agency'

@Entity()
@Unique('UQ_email', ['email'])
export class User {
  @PrimaryColumn({ unique: true, primaryKeyConstraintName: 'PK_govId' })
    govId!: string

  @Column()
    email!: string

  @Column()
    name!: string

  @ManyToOne(() => Agency)
  @JoinColumn({ name: 'agencyId', foreignKeyConstraintName: 'FK_agencyId' })
    agencyId!: Agency

  @Column()
    description!: string

  @CreateDateColumn({ type: 'timestamptz', default: new Date() })
    created!: Date
}
