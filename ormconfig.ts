import 'dotenv/config'

export default {
  type: process.env.TYPE_DB,
  host: process.env.HOST_DB,
  port: process.env.PORT_DB,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  synchronize: true,
  logging: false,
  entities: ['src/database/entities/**/*.ts'],
  migrations: ['src/database/migration/**/*.ts'],
  subscribers: ['src/database/subscriber/**/*.ts'],
  seeds: ['src/database/seeders/**/*.ts'],
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
    seeds: 'src/database/seeders/',
  },
}
