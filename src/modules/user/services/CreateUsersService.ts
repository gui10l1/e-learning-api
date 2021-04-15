import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUsersServiceDTO from '../dtos/ICreateUsersServiceDTO';
import User from '../infra/database/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    password,
  }: ICreateUsersServiceDTO): Promise<User> {
    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (findUserByEmail) {
      throw new AppError('Email already used!');
    }

    const hashedPassword = await this.hashProvider.hash(password);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUsersService;
