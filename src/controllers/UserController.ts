import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getCustomRepository } from 'typeorm'

import UserRepository from '../database/repositories/UserRepository'

class UserController {
  async store(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const { username, name, email, avatar_url, password_hash } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    const UserExist = await userRepository.findOne({ username })

    if (UserExist) return res.status(400).json({ error: 'Usuário já existe!' })

    const user = userRepository.create({
      username,
      name,
      email,
      avatar_url,
      password_hash,
    })

    await userRepository.save(user)

    res.status(201).json(user)
  }
}

export default new UserController()
