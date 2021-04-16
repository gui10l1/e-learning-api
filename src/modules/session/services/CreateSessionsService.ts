import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import User from '@modules/user/infra/database/typeorm/entities/User';
import IHashProvider from '@modules/user/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/authConfig';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ token: string; user: User }> {
    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new AppError('Credentials do not match');
    }

    const passwordMatch = await this.hashProvider.compare(
      findUserByEmail.password,
      password,
    );

    if (!passwordMatch) {
      throw new AppError('Credentials do not match');
    }

    const token = sign({}, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      token,
      user: findUserByEmail,
    };
  }
}

export default CreateSessionService;
