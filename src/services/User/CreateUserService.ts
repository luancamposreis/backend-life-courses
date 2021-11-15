import { hash } from 'bcryptjs'

import { User } from '../../database/entities/User'
import { UserRepository } from '../../database/repositories'

type UserRequest = {
  username: string
  name: string
  email: string
  avatar_url: string
  password_hash: string
}

export class CreateUserService {
  async execute({
    username,
    name,
    email,
    avatar_url,
    password_hash,
  }: UserRequest): Promise<Error | User> {
    const existUser = await UserRepository().findOne({
      where: [{ username }, { email }],
    })

    if (existUser) return new Error(`Usuário ja existe!`)

    const passwordHashed = await hash(password_hash, 16)

    const user = UserRepository().create({
      username,
      name,
      email,
      avatar_url,
      password_hash: passwordHashed,
    })

    await UserRepository().save(user)

    return user
  }
}
