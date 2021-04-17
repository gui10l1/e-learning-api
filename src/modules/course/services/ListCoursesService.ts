import { inject, injectable } from 'tsyringe';

import Course from '../infra/database/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class ListCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(): Promise<Course[]> {
    const course = await this.coursesRepository.listAllCourses();

    return course;
  }
}
