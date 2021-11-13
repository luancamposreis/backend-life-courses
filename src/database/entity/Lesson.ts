import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Module } from './Module'

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  lesson_url: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => Module)
  @JoinTable({
    name: 'modules',
    joinColumns: [{ name: 'id' }],
  })
  module: Module
}
