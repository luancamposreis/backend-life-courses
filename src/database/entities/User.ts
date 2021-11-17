import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'

import { BaseEntity } from './BaseEntity'
import { Permission } from './Permission'
import { Role } from './Role'

@Entity('users')
export class User extends BaseEntity {
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

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[]
}
