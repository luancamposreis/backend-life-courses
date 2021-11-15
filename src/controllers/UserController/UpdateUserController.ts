import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { UserRepository } from '../../database/repositories/index'
import { UpdateUserService } from '../../services/User/UpdateUserService'

let errors

export class UpdateUserController {
  async Update(req: Request, res: Response) {
    const { username, name, email, password_hash } = req.body
    const { id } = req.params

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    const updateUserService = new UpdateUserService()

    const userExist = await UserRepository().findOne({ id })

    let filename

    if (req.file === undefined) {
      filename = userExist.avatar_url
    } else {
      filename = `http://${req.rawHeaders[1]}/api/users/avatar/${req.file.filename}`
    }

    const result = await updateUserService.execute({
      id,
      username,
      name,
      email,
      avatar_url: filename,
      password_hash,
    })

    if (result instanceof Error) return res.status(400).json({ message: Error })

    if (result) res.json('Usuário atualizado com sucesso!')
  }
}
