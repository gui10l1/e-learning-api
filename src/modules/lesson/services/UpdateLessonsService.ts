import { inject, injectable } from 'tsyringe';

import ICoursesRepository from '@modules/course/repositories/ICoursesRepository';

import AppError from '@shared/errors/AppError';
import Lesson from '../infra/database/typeorm/entities/Lesson';
import ILessonsRepository from '../repositories/ILessonsRepository';
import ILessonsRepositoryDTO from '../dtos/ILessonsRepositoryDTO';

interface IRequest {
  lessonId: string;
  data: ILessonsRepositoryDTO;
}

@injectable()
export default class UpdateLessonsService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ lessonId, data }: IRequest): Promise<Lesson> {
    const findLesson = await this.lessonsRepository.findById(lessonId);

    if (!findLesson) {
      throw new AppError('Lesson not found');
    }

    const findCourse = await this.coursesRepository.findById(data.course_id);

    if (!findCourse) {
      throw new AppError('Course not found!');
    }

    const findLessonsWithDuplicatedName = await this.lessonsRepository.findCourseLessonsByName(
      data.course_id,
      data.name,
    );

    if (findLessonsWithDuplicatedName.length > 0) {
      throw new AppError(
        'A lesson with this name already exists for this course',
      );
    }

    const updatedLesson = await this.lessonsRepository.update(findLesson, data);

    return updatedLesson;
  }
}
