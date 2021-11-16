import { Column, Entity, JoinTable, ManyToOne } from 'typeorm'

import { BaseEntity } from './BaseEntity'
import { Lesson } from './Lesson'

@Entity('modules')
export class Module extends BaseEntity {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  avatar_url: string

  @ManyToOne(() => Lesson)
  @JoinTable({
    name: 'modules',
    joinColumns: [{ name: 'id' }],
  })
  lesson: Lesson
}
