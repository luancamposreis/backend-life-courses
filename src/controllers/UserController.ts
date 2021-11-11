import { Request, Response } from 'express'

class UserController {
  async store(req: Request, res: Response) {
    const { username, name, email, avatar_url, password_hash } = req.body

    const user = {
      username,
      name,
      email,
      avatar_url,
      password_hash,
    }

    res.status(201).json(user)
  }
}

export default new UserController()
