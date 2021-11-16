import { NextFunction, Request, Response } from 'express'

import { UserRepository } from '../database/repositories'

export function can(permissionRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req

    const user = await UserRepository().findOne({
      where: { id: userId },
      relations: ['permissions'],
    })

    if (!user) return res.status(400).json({ error: 'Usuário não existe!' })

    const permissionsExists = user.permissions
      .map((permission) => permission.name)
      .some((permission) => permissionRoutes.includes(permission))

    if (!permissionsExists) return res.status(401).end()

    return next()
  }
}

export function is(roleRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req

    const user = await UserRepository().findOne({
      where: { id: userId },
      relations: ['roles'],
    })

    if (!user) return res.status(400).json({ error: 'Usuário não existe!' })

    const roleExists = user.roles
      .map((role) => role.name)
      .some((role) => roleRoutes.includes(role))

    if (!roleExists) return res.status(401).end()

    return next()
  }
}
