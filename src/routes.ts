import { Router } from 'express'
import { body, param } from 'express-validator'
import multer from 'multer'

import { multerConfig } from './config/multerConfig'
import AvatarController from './controllers/AvatarController'
import UserController from './controllers/UserController'

const routes = Router()

// AvatarUrl
routes.get('/users/avatar/:avatar', AvatarController.show)

// Users
routes.post(
  '/users',
  multer(multerConfig).single('avatar_url'),
  body('username')
    .matches(/^@[A-Za-z0-9]+([._][A-Za-z0-9]+)*$/)
    .toLowerCase()
    .withMessage(
      'Nome de usuário deve iniciar com @ e ter no mínimo 2 caracteres!'
    ),
  body('name')
    .matches(/[A-Z][a-z]* [A-Z][a-z]*/)
    .withMessage('Por favor preencha nome e sobrenome!'),
  body('email').isEmail().withMessage('Endereço de email inválido!'),
  body('password_hash')
    .isLength({ min: 8 })
    .withMessage('A senha deve conter conter no mínimo 8 digitos!'),
  UserController.store
)

routes.put(
  '/users/:id',
  multer(multerConfig).single('avatar_url'),
  param('id').isUUID().withMessage('Usuário não encontrado!'),
  body('username')
    .matches(/^@[A-Za-z0-9]+([._][A-Za-z0-9]+)*$/)
    .toLowerCase()
    .withMessage(
      'Nome de usuário deve iniciar com @ e ter no mínimo 2 caracteres!'
    ),
  body('name')
    .matches(/[A-Z][a-z]* [A-Z][a-z]*/)
    .withMessage('Por favor preencha nome e sobrenome!'),
  body('email').isEmail().withMessage('Endereço de email inválido!'),
  body('password_hash')
    .isLength({ min: 8 })
    .withMessage('A senha deve conter conter no mínimo 8 digitos!'),
  UserController.update
)

routes.get('/users', UserController.index)

routes.delete(
  '/users/:id',
  param('id').isUUID().withMessage('Usuário não encontrado!'),
  UserController.delete
)

export default routes
