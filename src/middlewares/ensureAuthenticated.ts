import { NextFunction, Request, Response } from 'express'
import { decode, verify } from 'jsonwebtoken'

export const ensureAuthenticated = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization

    if (!authHeaders) return res.status(400).json({ error: 'token is missing' })

    const [, token] = authHeaders.split(' ')

    try {
      verify(token, process.env.SECRET_JWT)

      const { sub } = decode(token)
      req.userId = sub.toString()

      return next()
    } catch (err) {
      return res.status(401).end()
    }
  }
}
