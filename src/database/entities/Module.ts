import { Column, Entity, OneToMany } from 'typeorm'

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

  @OneToMany(() => Lesson, (lesson) => lesson.id)
  lessons: Lesson[]
}
