import ILessonsRepositoryDTO from '../dtos/ILessonsRepositoryDTO';
import Lesson from '../infra/database/typeorm/entities/Lesson';

export default interface ILessonsRepository {
  create(data: ILessonsRepositoryDTO): Promise<Lesson>;
  update(lesson: Lesson, data: ILessonsRepositoryDTO): Promise<Lesson>;
  findById(lessonId: string): Promise<Lesson | undefined>;
  listAllLessons(): Promise<Lesson[]>;
  findCourseLessonsByName(
    courseId: string,
    lessonName: string,
  ): Promise<Lesson[]>;
  listCourseLessons(courseId: string): Promise<Lesson[]>;
}
