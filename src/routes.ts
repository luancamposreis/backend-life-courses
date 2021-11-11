import { Router } from 'express'
import { body } from 'express-validator'

import UserController from './controllers/UserController'

const routes = Router()

// Users
routes.post(
  '/users',
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
  body('avatar_url').isURL().withMessage('Url da imagem é inválido!'),
  body('password_hash')
    .isLength({ min: 8 })
    .withMessage('A senha deve conter conter no mínimo 8 digitos!'),
  UserController.store
)

export default routes
