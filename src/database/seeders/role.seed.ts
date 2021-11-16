import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Role } from '../entities/Role'
import { v4 as uuid } from 'uuid'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        {
          id: uuid(),
          name: 'ADMIN',
          description: 'User Administrator',
        },
        {
          id: uuid(),
          name: 'USER',
          description: 'Simple User',
        },
      ])
      .execute()
  }
}
