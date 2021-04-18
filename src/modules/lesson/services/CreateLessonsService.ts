import { inject, injectable } from 'tsyringe';

import ICoursesRepository from '@modules/course/repositories/ICoursesRepository';
import AppError from '@shared/errors/AppError';

import ILessonsRepositoryDTO from '../dtos/ILessonsRepositoryDTO';
import Lesson from '../infra/database/typeorm/entities/Lesson';
import ILessonsRepository from '../repositories/ILessonsRepository';

@injectable()
export default class CreateLessonsService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute(data: ILessonsRepositoryDTO): Promise<Lesson> {
    const findCourse = await this.coursesRepository.findById(data.course_id);

    if (!findCourse) {
      throw new AppError('Course not found!');
    }

    const lessonsWithSameName = await this.lessonsRepository.findCourseLessonsByName(
      findCourse.id,
      data.name,
    );

    if (lessonsWithSameName.length > 0) {
      throw new AppError(
        'A lesson with this name already exists for this course',
      );
    }

    const lesson = await this.lessonsRepository.create(data);

    return lesson;
  }
}
