import { Request } from 'express'
import path from 'path'
import multer from 'multer'
import crypto from 'crypto'

export const pathAvatar = 'public/uploads/users'

export const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', pathAvatar),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', pathAvatar))
    },
    filename: (
      req,
      file,
      cb: (error: Error | null, filename: string) => void
    ) => {
      crypto.randomBytes(8, (error, hash) => {
        if (error) cb(error, 'Upload Error')

        const filename = `${hash.toString('hex')}_${file.originalname}`

        cb(null, filename)
      })
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  filter: (
    req: Request,
    file: { mimetype: string },
    cb: (error: Error | null, arg1: boolean | undefined) => void
  ) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/jpg', 'image/png']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'), undefined)
    }
  },
}

export const pathModule = 'public/uploads/modules_avatar'
export const moduleMulterConfig = {
  dest: path.resolve(__dirname, '..', '..', pathModule),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', pathModule))
    },
    filename: (
      req,
      file,
      cb: (error: Error | null, filename: string) => void
    ) => {
      crypto.randomBytes(8, (error, hash) => {
        if (error) cb(error, 'Upload Error')

        const filename = `${hash.toString('hex')}_${file.originalname}`

        cb(null, filename)
      })
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  filter: (
    req: Request,
    file: { mimetype: string },
    cb: (error: Error | null, arg1: boolean | undefined) => void
  ) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/jpg', 'image/png']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'), undefined)
    }
  },
}
