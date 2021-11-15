import { UserRepository } from '../../database/repositories'

type UserRequest = {
  id: string
}

type msg = {
  msg: string
}

export class DeleteUserService {
  async execute({ id }: UserRequest): Promise<Error | msg> {
    const existUser = await UserRepository().findOne({
      where: { id },
    })

    if (!existUser) return new Error(`Usuário não encontrado!`)

    await UserRepository().delete({
      id,
    })
  }
}
