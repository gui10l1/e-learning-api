import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Lesson from '../infra/database/typeorm/entities/Lesson';
import ILessonsRepository from '../repositories/ILessonsRepository';

interface IRequest {
  lessonId: string;
}

@injectable()
export default class FindLessonsService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute({ lessonId }: IRequest): Promise<Lesson> {
    const lesson = await this.lessonsRepository.findById(lessonId);

    if (!lesson) {
      throw new AppError('Lesson not found!');
    }

    return lesson;
  }
}
