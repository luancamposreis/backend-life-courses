import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { PermissionRepository } from '../database/repositories'

let errors

class PermissionController {
  async store(req: Request, res: Response) {
    const { name, description } = req.body

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    if (await PermissionRepository().findOne({ name }))
      return res
        .status(400)
        .json({ error: 'Já existe uma permissião com este nome!' })

    const permission = PermissionRepository().create({
      name,
      description,
    })

    await PermissionRepository().save(permission)

    return res.status(201).json(permission)
  }

  async index(req: Request, res: Response) {
    const permissions = await PermissionRepository().find()

    res.json(permissions)
  }
}

export default new PermissionController()
