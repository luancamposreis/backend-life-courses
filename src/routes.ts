import { Router } from 'express'
import { body, param } from 'express-validator'
import multer from 'multer'

import { moduleMulterConfig, multerConfig } from './config/multerConfig'
import AvatarController from './controllers/AvatarController'
import LessonController from './controllers/LessonController'
import ModuleController from './controllers/ModuleController'
import PermissionController from './controllers/PermissionController'
import RoleController from './controllers/RoleController'
import SessionController from './controllers/SessionController'
import UserController from './controllers/UserController'

const routes = Router()

// AvatarUrl
routes.get('/users/avatar/:avatar', AvatarController.show)
routes.get('/modules/avatar/:avatar', AvatarController.show)

// User Routes
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
  body('roles').isUUID().withMessage('Role inválida!'),
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

// Session Routes
routes.post('/sessions', SessionController.createSession)

// Permission Routes
routes.get('/permissions', PermissionController.index)
routes.post(
  '/permissions',
  body('name')
    .matches(/^[A-Za-z]+([_][A-Za-z]+)*$/)
    .toUpperCase()
    .withMessage('Nome da permisão deve conter no minímo 4 caractere'),
  body('description')
    .isLength({ min: 4 })
    .withMessage('Descrição da permissão deve conter no minímo 4 caractere'),
  PermissionController.store
)

// Role Routes
routes.get('/roles', RoleController.index)
routes.post(
  '/roles',
  body('name')
    .matches(/^[A-Za-z]+([_][A-Za-z]+)*$/)
    .toUpperCase()
    .withMessage('Nome da role deve conter no minímo 4 caractere'),
  body('description')
    .isLength({ min: 4 })
    .withMessage('Descrição da role deve conter no minímo 4 caractere'),
  body('permissions')
    .isArray()
    .isUUID()
    .withMessage('Permissões não encontrada!'),
  RoleController.store
)

// Permission Routes
routes.get('/lessons', LessonController.index)
routes.post(
  '/:id/lessons',
  body('name')
    .isLength({ min: 4 })
    .toUpperCase()
    .withMessage('Nome da lição deve conter no minímo 4 caractere!'),
  body('description')
    .isLength({ min: 4 })
    .withMessage('Descrição da lição deve conter no minímo 4 caractere!'),
  body('lesson_url').isURL().withMessage('Url inválida!'),
  param('id').isUUID().withMessage('Módulo invalido!'),
  LessonController.store
)

// Module Routes
routes.get('/modules', ModuleController.index)
routes.post(
  '/modules',
  multer(moduleMulterConfig).single('avatar_url'),
  body('name')
    .isLength({ min: 4 })
    .toUpperCase()
    .withMessage('Nome da lição deve conter no minímo 4 caractere!'),
  body('description')
    .isLength({ min: 4 })
    .withMessage('Descrição da lição deve conter no minímo 4 caractere!'),
  ModuleController.store
)

export default routes
