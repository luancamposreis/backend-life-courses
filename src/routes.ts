import { Router } from 'express'
import { body, param } from 'express-validator'
import multer from 'multer'

import { moduleMulterConfig, multerConfig } from './config/multerConfig'
import AvatarController from './controllers/AvatarController'
import PermissionController from './controllers/PermissionController'
import RoleController from './controllers/RoleController'
import RolePermissionController from './controllers/RolePermissionController'
import { CreateUserAccessControlListController } from './controllers/UserAcessControlController'
import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { can, is } from './middlewares/permissions'
import LessonController from './controllers/LessonController'
import ModuleController from './controllers/ModuleController'

const routes = Router()

// AvatarUrl
routes.get('/users/avatar/:avatar', AvatarController.showUser)
routes.get('/modules/avatar/:avatar', AvatarController.showModule)
routes.post('/login', SessionController.createSession)

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
  ensureAuthenticated(),
  UserController.update
)

routes.get('/users', ensureAuthenticated(), is(['ADMIN']), UserController.index)

routes.post(
  '/users/acl',
  ensureAuthenticated(),
  is(['ADMIN']),
  // can(['CREATE_PERMISSION', 'VIEW_PERMISSION']),
  new CreateUserAccessControlListController().handle
)

routes.delete(
  '/users/:id',
  param('id').isUUID().withMessage('Usuário não encontrado!'),
  ensureAuthenticated(),
  UserController.delete
)

// Permission Routes
routes.get(
  '/permissions',
  ensureAuthenticated(),
  is(['ADMIN']),
  can(['VIEW_PERMISSION']),
  PermissionController.index
)
routes.post(
  '/permissions',
  body('name')
    .matches(/^[A-Za-z]+([_][A-Za-z]+)*$/)
    .toUpperCase()
    .withMessage('Nome da permisão deve conter no minímo 4 caractere'),
  body('description')
    .isLength({ min: 4 })
    .withMessage('Descrição da permissão deve conter no minímo 4 caractere'),
  ensureAuthenticated(),
  is(['ADMIN']),
  PermissionController.store
)

// Role Routes
routes.get(
  '/roles',
  ensureAuthenticated(),
  is(['ADMIN']),
  can(['VIEW_PERMISSION']),
  RoleController.index
)
routes.post(
  '/roles',
  body('name')
    .matches(/^[A-Za-z]+([_][A-Za-z]+)*$/)
    .toUpperCase()
    .withMessage('Nome da role deve conter no minímo 4 caractere'),
  body('description')
    .isLength({ min: 4 })
    .withMessage('Descrição da role deve conter no minímo 4 caractere'),
  ensureAuthenticated(),
  is(['ADMIN']),
  can(['CREATE_PERMISSION', 'VIEW_PERMISSION']),
  RoleController.store
)

// Lesson Routes
routes.get('/lessons', ensureAuthenticated(), LessonController.index)
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
  ensureAuthenticated(),
  is(['ADMIN']),
  can([
    'CREATE_PERMISSION',
    'VIEW_PERMISSION',
    'UPDATE_PERMISSION',
    'DELETE_PERMISSION',
  ]),
  LessonController.store
)

// Module Routes
routes.get('/modules', ensureAuthenticated(), ModuleController.index)
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
  ensureAuthenticated(),
  is(['ADMIN']),
  can([
    'CREATE_PERMISSION',
    'VIEW_PERMISSION',
    'UPDATE_PERMISSION',
    'DELETE_PERMISSION',
  ]),
  ModuleController.store
)
routes.put(
  '/modules/:id',
  multer(moduleMulterConfig).single('avatar_url'),
  param('id').isUUID().withMessage('Usuário não encontrado!'),
  body('name')
    .isLength({ min: 4 })
    .withMessage('O nome deve conter no minímo 4 caractere!'),
  body('description')
    .isLength({ min: 4 })
    .withMessage('A descrição deve conter no minímo 4 caractere!'),
  ensureAuthenticated(),
  ModuleController.update
)

routes.post(
  '/roles/:roleId',
  ensureAuthenticated(),
  is(['ADMIN']),
  can([
    'CREATE_PERMISSION',
    'VIEW_PERMISSION',
    'UPDATE_PERMISSION',
    'DELETE_PERMISSION',
  ]),
  RolePermissionController.store
)

export default routes
