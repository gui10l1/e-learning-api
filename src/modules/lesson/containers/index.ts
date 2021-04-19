import { container } from 'tsyringe';

import LessonsRepository from '../infra/database/typeorm/repositories/LessonsRepository';
import ILessonsRepository from '../repositories/ILessonsRepository';

container.registerSingleton<ILessonsRepository>(
  'LessonsRepository',
  LessonsRepository,
);
