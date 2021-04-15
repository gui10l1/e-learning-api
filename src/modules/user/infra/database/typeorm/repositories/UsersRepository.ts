import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/user/repositories/IUsersRepository';

import IUsersRepositoryDTO from '@modules/user/dtos/IUsersRepositoryDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: IUsersRepositoryDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }
}

export default UsersRepository;
