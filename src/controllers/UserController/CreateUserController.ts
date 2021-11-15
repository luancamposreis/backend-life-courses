import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { CreateUserService } from '../../services/User/CreateUserService'

let errors

export class CreateUserController {
  async store(req: Request, res: Response) {
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

    const createUserService = new CreateUserService()
    const result = await createUserService.execute({
      username,
      name,
      email,
      avatar_url: filename,
      password_hash,
    })

    if (result instanceof Error) return res.status(400).json({ message: Error })

    return res.json(result)
  }
}

// async index(req: Request, res: Response) {
//   const userRepository = getCustomRepository(UserRepository)

//   const user = await userRepository.find()

//   return res.json(user)
// }

// async delete(req: Request, res: Response) {
//   const userRepository = getCustomRepository(UserRepository)
//   const { id } = req.params

//   errors = validationResult(req)
//   if (!errors.isEmpty())
//     return res.status(400).json({
//       error: errors.array()[0].msg,
//     })

//   const userExist = userRepository.findOne({ id })
//   if (!userExist) return res.status(400).json({ error: 'Usuario não existe' })

//   const user = await userRepository.delete(id)

//   if (!user.affected) {
//     res.status(400).json({ error: 'Erro ao deletar o usuário!' })
//   } else {
//     res.status(200).json({ error: 'Usuário deletado com sucesso' })
//   }
// }
