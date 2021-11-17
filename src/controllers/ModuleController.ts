import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { ModuleRepository } from '../database/repositories'

let errors

class PermissionController {
  async store(req: Request, res: Response) {
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

    const existModule = await ModuleRepository().findOne({ name })

    if (existModule)
      return res
        .status(400)
        .json({ error: 'Já existe um modulo com este nome!' })

    const module = ModuleRepository().create({
      name,
      description,
      avatar_url: filename,
    })

    await ModuleRepository().save(module)

    return res.status(201).json(module)
  }

  async show(req: Request, res: Response) {
    const { id } = req.params
    const modules = await ModuleRepository().findOne(id, {
      relations: ['lesson'],
    })

    res.json(modules)
  }

  async index(req: Request, res: Response) {
    const modules = await ModuleRepository().find()

    res.json(modules)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, description } = req.body

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array()[0].msg,
      })

    const moduleExist = await ModuleRepository().findOne({ id })
    if (!moduleExist)
      return res.status(400).json({ error: 'Módulo não existe!' })

    let filename

    if (req.file === undefined) {
      filename = moduleExist.avatar_url
    } else {
      filename = `http://${req.rawHeaders[1]}/api/modules/avatar/${req.file.filename}`
    }

    const modules = await ModuleRepository().update(id, {
      name,
      description,
      avatar_url: filename,
    })

    if (modules.affected) {
      return res.json({ message: 'Módulo atualizado com sucesso!' })
    } else {
      return res.json({ error: 'Erro ao atualizar o módulo!' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array()[0].msg,
      })

    const moduleExist = ModuleRepository().findOne({ id })
    if (!moduleExist)
      return res.status(400).json({ error: 'Módulo não existe' })

    const modules = await ModuleRepository().delete(id)

    if (!modules.affected) {
      res.status(400).json({ error: 'Erro ao deletar o módulo!' })
    } else {
      res.status(200).json({ error: 'Módulo deletado com sucesso' })
    }
  }
}

export default new PermissionController()
