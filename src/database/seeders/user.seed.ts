import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../entities/User'
import { hash } from 'bcryptjs'
import { RoleRepository } from '../repositories'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const role = await RoleRepository().find()
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'Admin User',
          username: '@admin_user',
          email: 'adminuser@lifecouses.com.br',
          password_hash: await hash('123456', 8),
          roles: [role[0]],
        },
        {
          name: 'Maria Alves',
          username: '@maria_alves',
          email: 'mariaalves@lifecouses.com.br',
          password_hash: await hash('123456', 8),
          roles: [role[1]],
        },
      ])
      .execute()
  }
}
