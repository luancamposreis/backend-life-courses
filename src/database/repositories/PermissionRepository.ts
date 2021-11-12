import { EntityRepository, Repository } from 'typeorm'
import { Permission } from '../entity/Permission'

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission> {}

export default PermissionRepository
