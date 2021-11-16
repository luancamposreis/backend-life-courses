import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Permission } from '../entities/Permission'
import { v4 as uuid } from 'uuid'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values([
        {
          id: uuid(),
          name: 'VIEW_PERMISSION',
          description: 'Permission to view',
        },
        {
          id: uuid(),
          name: 'CREATE_PERMISSION',
          description: 'Permission to create',
        },
        {
          id: uuid(),
          name: 'UPDATE_PERMISSION',
          description: 'Permission to update',
        },
        {
          id: uuid(),
          name: 'DELETE_PERMISSION',
          description: 'Permission to delete',
        },
      ])
      .execute()
  }
}
