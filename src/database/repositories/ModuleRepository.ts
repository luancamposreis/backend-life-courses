import { EntityRepository, Repository } from 'typeorm'
import { Module } from '../entity/Module'

@EntityRepository(Module)
class ModuleRepository extends Repository<Module> {}

export default ModuleRepository
