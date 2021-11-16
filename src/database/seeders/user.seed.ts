import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../entities/User'
import { hash } from 'bcryptjs'
import { RoleRepository } from '../repositories'
import { v4 as uuid } from 'uuid'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const role = await RoleRepository().find()
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: uuid(),
          name: 'Admin User',
          username: '@admin_user',
          email: 'adminuser@lifecouses.com.br',
          password_hash: await hash('123456', 8),
          avatar_url: 'http://localhost:3345/users/avatar/img-placeholder.png',
          roles: [role[0]],
        },
        {
          id: uuid(),
          name: 'Maria Alves',
          username: '@maria_alves',
          email: 'mariaalves@lifecouses.com.br',
          password_hash: await hash('123456', 8),
          avatar_url: 'http://localhost:3345/users/avatar/img-placeholder.png',
          roles: [role[1]],
        },
      ])
      .execute()
  }
}
