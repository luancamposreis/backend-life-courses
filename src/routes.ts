import { Request, Response, Router } from 'express'
import UserController from './controllers/UserController'

const routes = Router()

// Users
routes.post('/users', UserController.store)

export default routes
