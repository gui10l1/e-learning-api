import { container } from 'tsyringe';

import CoursesRepository from '../infra/database/typeorm/repositories/CoursesRepository';
import ICoursesRepository from '../repositories/ICoursesRepository';

import '../providers/containers';

container.registerSingleton<ICoursesRepository>(
  'CoursesRepository',
  CoursesRepository,
);
