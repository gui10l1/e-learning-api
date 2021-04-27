import { Repository, getRepository } from 'typeorm';

import ICoursesRepository from '@modules/course/repositories/ICoursesRepository';
import ICoursesRepositoryDTO from '@modules/course/dtos/ICoursesRepositoryDTO';
import Course from '../entities/Course';

export default class CoursesRepository implements ICoursesRepository {
  private ormRepository: Repository<Course>;

  constructor() {
    this.ormRepository = getRepository(Course);
  }

  public async create({ image, name }: ICoursesRepositoryDTO): Promise<Course> {
    const course = this.ormRepository.create({
      image,
      name,
    });

    await this.ormRepository.save(course);

    return course;
  }

  public async findById(courseId: string): Promise<Course | undefined> {
    return this.ormRepository.findOne({
      where: { id: courseId },
      relations: ['lessons'],
    });
  }

  public async listAllCourses(): Promise<Course[]> {
    return this.ormRepository.find({
      relations: ['lessons'],
    });
  }

  public async update(
    course: Course,
    data: ICoursesRepositoryDTO,
  ): Promise<Course> {
    const updatedCourse = this.ormRepository.merge(course, data);

    await this.ormRepository.save(updatedCourse);

    return updatedCourse;
  }
}
