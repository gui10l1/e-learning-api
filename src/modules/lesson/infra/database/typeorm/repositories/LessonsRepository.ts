import { getRepository, Repository } from 'typeorm';

import ILessonsRepositoryDTO from '@modules/lesson/dtos/ILessonsRepositoryDTO';
import ILessonsRepository from '@modules/lesson/repositories/ILessonsRepository';

import Lesson from '../entities/Lesson';

export default class LessonsRepository implements ILessonsRepository {
  private ormRepository: Repository<Lesson>;

  constructor() {
    this.ormRepository = getRepository(Lesson);
  }

  public async create(data: ILessonsRepositoryDTO): Promise<Lesson> {
    const lesson = this.ormRepository.create(data);

    await this.ormRepository.save(lesson);

    return lesson;
  }

  public async findById(lessonId: string): Promise<Lesson | undefined> {
    return this.ormRepository.findOne({
      where: { id: lessonId },
    });
  }

  public async listAllLessons(): Promise<Lesson[]> {
    return this.ormRepository.find();
  }

  public async update(
    lesson: Lesson,
    data: ILessonsRepositoryDTO,
  ): Promise<Lesson> {
    const updatedLesson = this.ormRepository.merge(lesson, data);

    await this.ormRepository.save(updatedLesson);

    return updatedLesson;
  }

  public async findCourseLessonsByName(
    courseId: string,
    lessonName: string,
  ): Promise<Lesson[]> {
    const lessons = await this.ormRepository.find({
      where: { course_id: courseId, name: lessonName },
    });

    return lessons;
  }

  public async listCourseLessons(courseId: string): Promise<Lesson[]> {
    return this.ormRepository.find({
      where: { course_id: courseId },
    });
  }
}
