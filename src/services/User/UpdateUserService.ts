import { hash } from 'bcryptjs'
import { Request } from 'express'

import { User } from '../../database/entities/User'
import { UserRepository } from '../../database/repositories'

type UserRequest = {
  id: string
  username: string
  name: string
  email: string
  avatar_url: string
  password_hash: string
}

type msg = {
  msg: string
}

export class UpdateUserService {
  async execute({
    id,
    username,
    name,
    email,
    avatar_url,
    password_hash,
  }: UserRequest): Promise<Error | msg> {
    const existUser = await UserRepository().findOne({ id })

    if (existUser) return new Error(`Usuário não existe!`)

    const passwordHashed = await hash(password_hash, 16)

    await UserRepository().update(id, {
      username,
      name,
      email,
      avatar_url,
      password_hash: passwordHashed,
    })
  }
}
