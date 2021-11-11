import { Request, Response, Router } from 'express'

const routes = Router()

routes.post('/users', (req: Request, res: Response) => {
  const { username, name, email, avatar_url, password_hash } = req.body

  const user = {
    username,
    name,
    email,
    avatar_url,
    password_hash,
  }

  res.status(201).json(user)
})

export default routes
