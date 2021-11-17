import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from './BaseEntity'
import { Module } from './Module'

@Entity('lessons')
export class Lesson extends BaseEntity {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  lesson_url: string

  @ManyToOne(() => Module, (module) => module.id)
  module: Module
}
