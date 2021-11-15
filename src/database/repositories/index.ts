import { getRepository } from 'typeorm'

import { Lesson } from '../entities/Lesson'
import { Module } from '../entities/Module'
import { Permission } from '../entities/Permission'
import { Role } from '../entities/Role'
import { User } from '../entities/User'

export const UserRepository = () => getRepository(User)

export const RoleRepository = () => getRepository(Role)

export const PermissionRepository = () => getRepository(Permission)

export const ModuleRepository = () => getRepository(Module)

export const LessonRepository = () => getRepository(Lesson)
