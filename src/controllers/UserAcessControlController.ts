import { Request, Response } from 'express'

import {
  PermissionRepository,
  RoleRepository,
  UserRepository,
} from '../database/repositories'

export class UserAcessControlController {
  async store(req: Request, res: Response) {
    const { permissions, roles } = req.body
    const { userId } = req

    const user = await UserRepository().findOne(userId)

    if (!user) return res.status(400).json({ error: 'Usuário não existe!' })

    const permissionsExists = await PermissionRepository().findByIds(
      permissions
    )

    const roleExists = await RoleRepository().findByIds(roles)

    user.permissions = permissionsExists
    user.roles = roleExists

    await UserRepository().save(user)

    return user
  }
}
