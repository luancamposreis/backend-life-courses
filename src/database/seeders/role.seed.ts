import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Role } from '../entities/Role'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values([
        {
          name: 'ADMIN',
          description: 'User Administrator',
        },
        {
          name: 'USER',
          description: 'Simple User',
        },
      ])
      .execute()
  }
}
