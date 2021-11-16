import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Permission } from '../entities/Permission'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values([
        {
          name: 'VIEW_PERMISSION',
          description: 'Permission to view',
        },
        {
          name: 'CREATE_PERMISSION',
          description: 'Permission to create',
        },
        {
          name: 'UPDATE_PERMISSION',
          description: 'Permission to update',
        },
        {
          name: 'DELETE_PERMISSION',
          description: 'Permission to delete',
        },
      ])
      .execute()
  }
}
