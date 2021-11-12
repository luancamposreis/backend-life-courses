import { NextFunction, Request, Response } from 'express'
import path from 'path'

class Avatar {
  async show(req: Request, res: Response, next: NextFunction) {
    const { avatar } = req.params

    const options = {
      root: path.resolve(__dirname, '..', '..', 'public', 'uploads', 'users'),
    }

    if (!avatar) {
      return res.status(400).json({ error: 'Avatar não encontrado!' })
    } else {
      res.sendFile(avatar, options, function (err) {
        if (err) {
          next(err)
        } else {
          console.error('Sent:', avatar)
        }
      })
    }
  }
}

export default new Avatar()
