import { inject, injectable } from 'tsyringe';

import Lesson from '../infra/database/typeorm/entities/Lesson';
import ILessonsRepository from '../repositories/ILessonsRepository';

@injectable()
export default class ListLessonsService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute(): Promise<Lesson[]> {
    return this.lessonsRepository.listAllLessons();
  }
}
