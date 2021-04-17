import ICoursesRepositoryDTO from '../dtos/ICoursesRepositoryDTO';
import Course from '../infra/database/typeorm/entities/Course';

export default interface ICoursesRepository {
  create(data: ICoursesRepositoryDTO): Promise<Course>;
  update(course: Course, data: ICoursesRepositoryDTO): Promise<Course>;
  findById(courseId: string): Promise<Course | undefined>;
  listAllCourses(): Promise<Course[]>;
}
