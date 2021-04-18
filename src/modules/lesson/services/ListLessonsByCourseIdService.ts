import { inject, injectable } from 'tsyringe';

import ICoursesRepository from '@modules/course/repositories/ICoursesRepository';
import AppError from '@shared/errors/AppError';

import ILessonsRepository from '../repositories/ILessonsRepository';
import Lesson from '../infra/database/typeorm/entities/Lesson';

interface IRequest {
  courseId: string;
}

@injectable()
export default class ListLessonsByCourseIdService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ courseId }: IRequest): Promise<Lesson[]> {
    const findCourse = await this.coursesRepository.findById(courseId);

    if (!findCourse) {
      throw new AppError('Course not found!');
    }

    const lessons = await this.lessonsRepository.listCourseLessons(
      findCourse.id,
    );

    return lessons;
  }
}
