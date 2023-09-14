import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { User } from './user'

@Entity()
@Unique('UQ_token', ['token'])
export class Session {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_sessionId' })
    id!: string

  @Column()
    token!: string

  @CreateDateColumn({ type: 'timestamptz', default: new Date() })
    timeStamp!: Date

  @JoinColumn({ name: 'govId', foreignKeyConstraintName: 'FK_userGovId' })
  @ManyToOne(() => User, (user) => user.session, {
    onDelete: 'CASCADE'
  })
    govId?: string
}
