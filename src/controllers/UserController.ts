import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getCustomRepository } from 'typeorm'

import UserRepository from '../database/repositories/UserRepository'

let errors

class UserController {
  async store(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const { username, name, email, password_hash } = req.body

    let filename

    if (req.file === undefined) {
      filename = `http://${req.rawHeaders[1]}/api/users/avatar/default.png`
    } else {
      filename = `http://${req.rawHeaders[1]}/api/users/avatar/${req.file.filename}`
    }

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    const UserExist = await userRepository.findOne({ username })
    const EmailExist = await userRepository.findOne({ email })

    if (UserExist) {
      return res.status(400).json({ error: 'Usuário já existe!' })
    } else if (EmailExist) {
      return res.status(400).json({ error: 'Email já existe!' })
    }

    const user = userRepository.create({
      username,
      name,
      email,
      avatar_url: filename,
      password_hash,
    })

    await userRepository.save(user)

    res.status(201).json(user)
  }

  async index(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.find()

    return res.json(user)
  }

  async update(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)
    const { id } = req.params
    const { username, name, email, password_hash } = req.body

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array()[0].msg,
      })

    const userExist = await userRepository.findOne({ id })
    if (!userExist)
      return res.status(400).json({ error: 'Usuário não encontrado!' })

    let filename

    if (req.file === undefined) {
      filename = userExist.avatar_url
    } else {
      filename = `http://${req.rawHeaders[1]}/api/users/avatar/${req.file.filename}`
    }

    const user = await userRepository.update(id, {
      username,
      name,
      email,
      avatar_url: filename,
      password_hash,
    })

    if (user.affected)
      return res.json({ message: 'Usuário atualizado com sucesso!' })
  }

  async delete(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)
    const { id } = req.params

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array()[0].msg,
      })

    const userExist = userRepository.findOne({ id })
    if (!userExist)
      return res.status(400).json({ error: 'Usuario não encontrado' })

    const user = await userRepository.delete(id)

    if (!user.affected) {
      res.status(401).json({ error: 'Usuário não deletado!' })
    } else {
      res.status(201).json({ error: 'Usuário deletado com sucesso' })
    }
  }
}

export default new UserController()
