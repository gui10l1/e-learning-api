import { inject, injectable } from 'tsyringe';

import ICreateCoursesServiceDTO from '../dtos/ICreateCoursesServiceDTO';
import Course from '../infra/database/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class CreateCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({
    name,
    image,
  }: ICreateCoursesServiceDTO): Promise<Course> {
    const course = await this.coursesRepository.create({
      image,
      name,
    });

    return course;
  }
}
