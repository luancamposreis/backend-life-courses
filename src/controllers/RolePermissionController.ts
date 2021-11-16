import { Request, Response } from 'express'

import { RoleRepository, PermissionRepository } from '../database/repositories'

export class RolePermissions {
  async store(req: Request, res: Response) {
    const { roleId } = req.params
    const { permissions } = req.body

    const role = await RoleRepository().findOne(roleId)

    if (!role) return res.json({ error: 'Role não econtrada!' })

    const Existpermissions = await PermissionRepository().findByIds(permissions)

    role.permissions = Existpermissions

    await RoleRepository().save(role)

    return res.json(role)
  }
}

export default new RolePermissions()
