import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { RoleRepository } from '../database/repositories'

let errors

class RoleController {
  async store(req: Request, res: Response) {
    const { name, description } = req.body

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    if (await RoleRepository().findOne({ name }))
      return res.status(400).json({ error: 'Já existe role com este nome!' })

    const role = RoleRepository().create({
      name,
      description,
    })

    await RoleRepository().save(role)

    return res.status(201).json(role)
  }

  async index(req: Request, res: Response) {
    const roles = await RoleRepository().find()

    return res.json(roles)
  }
}

export default new RoleController()
