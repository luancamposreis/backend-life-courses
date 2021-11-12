import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getCustomRepository } from 'typeorm'

import PermissionRepository from '../database/repositories/PermissionRepository'

let errors

class PermissionController {
  async store(req: Request, res: Response) {
    const permissionRepository = getCustomRepository(PermissionRepository)
    const { name, description } = req.body

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    const existPermission = await permissionRepository.findOne({ name })

    if (existPermission)
      return res
        .status(400)
        .json({ error: 'Já existe uma permissião com este nome!' })

    const permission = permissionRepository.create({
      name,
      description,
    })

    await permissionRepository.save(permission)

    return res.status(201).json(permission)
  }

  async index(req: Request, res: Response) {
    const permissionRepository = getCustomRepository(PermissionRepository)

    const permissions = await permissionRepository.find()

    res.json(permissions)
  }
}

export default new PermissionController()
