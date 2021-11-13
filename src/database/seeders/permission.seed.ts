import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Permission } from './../entity/Permission'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values([
        {
          name: 'view_permission',
          description: 'Permission to View',
        },
        {
          name: 'create_permission',
          description: 'Permission to Create',
        },
        {
          name: 'update_permission',
          description: 'Permission to Update',
        },
        {
          name: 'delete_permission',
          description: 'Permission to Delete',
        },
      ])
      .execute()
  }
}
