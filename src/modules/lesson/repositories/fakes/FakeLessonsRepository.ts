import { v4 } from 'uuid';

import ILessonsRepositoryDTO from '@modules/lesson/dtos/ILessonsRepositoryDTO';
import Lesson from '@modules/lesson/infra/database/typeorm/entities/Lesson';

import ILessonsRepository from '../ILessonsRepository';

export default class FakeLessonsRepository implements ILessonsRepository {
  private lessons: Lesson[] = [];

  public async create(data: ILessonsRepositoryDTO): Promise<Lesson> {
    const lesson = new Lesson();

    Object.assign(lesson, {
      id: v4(),
      ...data,
    });

    this.lessons.push(lesson);

    return lesson;
  }

  public async findById(lessonId: string): Promise<Lesson | undefined> {
    return this.lessons.find(lesson => lesson.id === lessonId);
  }

  public async listAllLessons(): Promise<Lesson[]> {
    return this.lessons;
  }

  public async update(
    lesson: Lesson,
    data: ILessonsRepositoryDTO,
  ): Promise<Lesson> {
    const findIndex = this.lessons.findIndex(item => item.id === lesson.id);

    const updatedLesson = Object.assign(lesson, data);

    this.lessons[findIndex] = updatedLesson;

    return updatedLesson;
  }

  public async findCourseLessonsByName(
    courseId: string,
    lessonName: string,
  ): Promise<Lesson[]> {
    return this.lessons.filter(
      lesson => lesson.course_id === courseId && lesson.name === lessonName,
    );
  }

  public async listCourseLessons(courseId: string): Promise<Lesson[]> {
    return this.lessons.filter(lesson => lesson.course_id === courseId);
  }
}
