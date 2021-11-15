import { getCustomRepository } from 'typeorm'
import { Request, Response } from 'express'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import 'dotenv/config'

import UserRepository from '../database/repositories/UserRepository'

class SessionController {
  async createSession(req: Request, res: Response) {
    const userRespository = getCustomRepository(UserRepository)
    const { username, email, password_hash } = req.body

    const user = await userRespository.findOne({
      where: [{ username }, { email }],
      relations: ['roles'],
    })

    if (!user) return res.status(400).json({ error: 'Usuário não existe!' })

    const matchPassword = await compare(password_hash, user.password_hash)

    if (!matchPassword)
      return res.status(400).json({ error: 'Usuário ou senha incorreto!' })

    const roles = user.roles.map((role) => role.name)

    const token = sign({ roles }, process.env.SECRET_JWT, {
      subject: user.id,
      expiresIn: '1d',
    })

    delete user.password_hash

    return res.json({ token, user })
  }
}

export default new SessionController()
