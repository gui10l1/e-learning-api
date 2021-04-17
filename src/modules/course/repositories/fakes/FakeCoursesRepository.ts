import { v4 } from 'uuid';

import ICoursesRepositoryDTO from '@modules/course/dtos/ICoursesRepositoryDTO';
import Course from '@modules/course/infra/database/typeorm/entities/Course';

import ICoursesRepository from '../ICoursesRepository';

export default class FakeCoursesRepository implements ICoursesRepository {
  private courses: Course[] = [];

  public async create({ image, name }: ICoursesRepositoryDTO): Promise<Course> {
    const course = new Course();

    Object.assign(course, {
      id: v4(),
      image,
      name,
    });

    this.courses.push(course);

    return course;
  }

  public async findById(courseId: string): Promise<Course | undefined> {
    return this.courses.find(course => course.id === courseId);
  }

  public async listAllCourses(): Promise<Course[]> {
    return this.courses;
  }

  public async update(
    course: Course,
    { image, name }: ICoursesRepositoryDTO,
  ): Promise<Course> {
    const courseIndex = this.courses.findIndex(item => item.id === course.id);

    const updatedCourse = Object.assign(course, {
      image,
      name,
    });

    this.courses[courseIndex] = updatedCourse;

    return updatedCourse;
  }
}
