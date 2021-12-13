import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { hash } from 'bcryptjs'

import { RoleRepository, UserRepository } from '../database/repositories'

let errors

class UserController {
  async store(req: Request, res: Response) {
    const { username, name, email, password_hash, roles } = req.body

    let filename

    if (req.file === undefined) {
      filename = `http://${req.rawHeaders[1]}/api/users/avatar/default.png`
    } else {
      filename = `http://${req.rawHeaders[1]}/api/users/avatar/${req.file.filename}`
    }

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ error: errors.array()[0].msg })

    const usernameExist = await UserRepository().findOne({
      where: { username },
    })
    const emailExist = await UserRepository().findOne({ where: { email } })

    if (usernameExist || emailExist)
      return res.status(400).json({ error: 'Usuário já existe!' })

    const passwordHashed = await hash(password_hash, 16)

    let existRoles
    if (roles === undefined) {
      existRoles = await RoleRepository().find({
        where: { name: 'USER_NORMAL' },
      })
    } else {
      existRoles = await RoleRepository().findByIds(roles)
    }

    const user = UserRepository().create({
      username,
      name,
      email,
      avatar_url: filename,
      password_hash: passwordHashed,
      roles: existRoles,
    })

    await UserRepository().save(user)

    res.status(201).json(user)
  }

  async index(req: Request, res: Response) {
    const user = await UserRepository().find()

    user.forEach((element) => {
      delete element.password_hash
    })

    return res.json(user)
  }

  async show(req: Request, res: Response) {
    const user_id = req.userId

    console.log(user_id)

    const user = await UserRepository().findOne({ id: user_id })

    if (!user)
      return res.status(400).json({ error: 'usuário não autenticado!' })

    delete user.password_hash

    return res.json(user)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { username, name, email, password_hash } = req.body

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array()[0].msg,
      })

    const userExist = await UserRepository().findOne({ id })
    if (!userExist)
      return res.status(400).json({ error: 'Usuário não existe!' })

    let filename

    if (req.file === undefined) {
      filename = userExist.avatar_url
    } else {
      filename = `http://${req.rawHeaders[1]}/api/users/avatar/${req.file.filename}`
    }

    const passwordHashed = await hash(password_hash, 16)

    const user = await UserRepository().update(id, {
      username,
      name,
      email,
      avatar_url: filename,
      password_hash: passwordHashed,
    })

    if (user.affected)
      return res.json({ message: 'Usuário atualizado com sucesso!' })
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({
        error: errors.array()[0].msg,
      })

    const userExist = UserRepository().findOne({ id })
    if (!userExist) return res.status(400).json({ error: 'Usuario não existe' })

    const user = await UserRepository().delete(id)

    if (!user.affected) {
      res.status(400).json({ error: 'Erro ao deletar o usuário!' })
    } else {
      res.status(200).json({ error: 'Usuário deletado com sucesso' })
    }
  }
}

export default new UserController()
