import express from 'express'
import { Express } from 'express-serve-static-core'
import morgan from 'morgan'
import cors from 'cors'

import routes from './routes'

class App {
  express: Express
  constructor() {
    this.express = express()

    this.middlewares()
    this.router()
  }

  middlewares() {
    this.express.use(morgan('dev'))
    this.express.use(cors())
    this.express.use(express.json())
  }

  router() {
    this.express.use('/api', routes)
  }
}

export default new App().express
