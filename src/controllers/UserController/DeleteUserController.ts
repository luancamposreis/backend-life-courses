import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { DeleteUserService } from '../../services/User/DeleteUserService'

let errors
export class DeleteUserController {
  async delete(req: Request, res: Response) {
    const { id } = req.params

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array()[0].msg,
      })

    const deleteUserService = new DeleteUserService()
    const result = await deleteUserService.execute({ id })

    if (result instanceof Error) return res.status(400).json({ message: Error })

    if (result) res.json('Usuário deletado com sucesso!')
  }
}
