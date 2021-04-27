import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Course from '../infra/database/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class FindCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(courseId: string): Promise<Course> {
    const course = await this.coursesRepository.findById(courseId);

    if (!course) {
      throw new AppError('Course not found');
    }

    return course;
  }
}
