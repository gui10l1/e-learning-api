import { container } from 'tsyringe';

import CoursesRepository from '../infra/database/typeorm/repositories/CoursesRepository';
import ICoursesRepository from '../repositories/ICoursesRepository';

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CoursesRepository,
);
