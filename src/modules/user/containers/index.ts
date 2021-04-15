import { container } from 'tsyringe';

import UsersRepository from '../infra/database/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

import '../providers/containers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
