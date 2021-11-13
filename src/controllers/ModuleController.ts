import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getCustomRepository } from 'typeorm'

import ModuleRepository from '../database/repositories/ModuleRepository'

let errors

class PermissionController {
  async store(req: Request, res: Response) {
    const moduleRepository = getCustomRepository(ModuleRepository)
    const { name, description } = req.body

    let filename

    if (req.file === undefined) {
      filename = `http://${req.rawHeaders[1]}/api/modules/avatar/img-placeholder.png`
    } else {
      filename = `http://${req.rawHeaders[1]}/api/modules/avatar/${req.file.filename}`
    }

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    const existModule = await moduleRepository.findOne({ name })

    if (existModule)
      return res
        .status(400)
        .json({ error: 'Já existe um modulo com este nome!' })

    const module = moduleRepository.create({
      name,
      description,
      avatar_url: filename,
    })

    await moduleRepository.save(module)

    return res.status(201).json(module)
  }

  async index(req: Request, res: Response) {
    const moduleRepository = getCustomRepository(ModuleRepository)

    const modules = await moduleRepository.find()

    res.json(modules)
  }
}

export default new PermissionController()
