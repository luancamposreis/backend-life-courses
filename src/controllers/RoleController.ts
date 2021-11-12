import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import PermissionRepository from '../database/repositories/PermissionRepository'
import RoleRepository from '../database/repositories/RoleRepository'

class RoleController {
  async store(req: Request, res: Response) {
    const roleRepository = getCustomRepository(RoleRepository)
    const permissionRepository = getCustomRepository(PermissionRepository)

    const { name, description, permissions } = req.body

    const existRole = await roleRepository.findOne({ name })

    if (existRole)
      return res.status(400).json({ error: 'Já existe role com este nome!' })

    const existPermission = await permissionRepository.findByIds(permissions)

    if (!existPermission)
      return res.status(400).json({ error: 'Não foi encontrados permissões!' })

    const role = roleRepository.create({
      name,
      description,
      permissions: existPermission,
    })

    await roleRepository.save(role)

    return res.status(201).json(role)
  }

  async index(req: Request, res: Response) {
    const roleRepository = getCustomRepository(RoleRepository)

    const roles = await roleRepository.find()

    return res.json(roles)
  }
}

export default new RoleController()
