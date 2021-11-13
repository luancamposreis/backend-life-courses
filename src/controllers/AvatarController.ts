import { NextFunction, Request, Response } from 'express'
import path from 'path'

class Avatar {
  async show(req: Request, res: Response, next: NextFunction) {
    const { avatar } = req.params

    let options
    if (req.url === 'users') {
      options = {
        root: path.resolve(__dirname, '..', '..', 'public', 'uploads', 'users'),
      }
    } else {
      options = {
        root: path.resolve(
          __dirname,
          '..',
          '..',
          'public',
          'uploads',
          'modules_avatar'
        ),
      }
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
