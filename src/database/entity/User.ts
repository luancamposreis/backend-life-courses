import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  avatar_url: string

  @Column()
  password_hash: string

  @CreateDateColumn()
  created_at: Date
}
