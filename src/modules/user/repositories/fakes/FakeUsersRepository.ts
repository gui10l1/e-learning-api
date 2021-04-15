import { v4 } from 'uuid';

import IUsersRepositoryDTO from '@modules/user/dtos/IUsersRepositoryDTO';
import User from '../../infra/database/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: IUsersRepositoryDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      ...data,
    });

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }
}

export default FakeUsersRepository;
