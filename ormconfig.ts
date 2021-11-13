import 'dotenv/config'

export default {
  type: process.env.TYPE_DB,
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  synchronize: false,
  logging: false,
  entities: ['src/database/entity/**/*.ts'],
  migrations: ['src/database/migration/**/*.ts'],
  subscribers: ['src/database/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
  },
}
