import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Session } from './session'

@Entity()
@Unique('UQ_username', ['username'])
export class User {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_govId' })
    govId!: string

  @Column()
    username!: string

  @Column()
    password!: string

  @Column()
    name!: string

  @OneToMany(() => Session, (session) => session.govId, {
    cascade: true
  })
    session!: Session
}
