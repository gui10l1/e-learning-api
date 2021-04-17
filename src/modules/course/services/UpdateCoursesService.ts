import { inject, injectable } from 'tsyringe';
import fs from 'fs';
import path from 'path';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/uploadConfig';

import ICreateCoursesServiceDTO from '../dtos/ICreateCoursesServiceDTO';
import Course from '../infra/database/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';

interface IRequest {
  courseId: string;
  data: ICreateCoursesServiceDTO;
}

@injectable()
export default class UpdateCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,
  ) {}

  public async execute({ courseId, data }: IRequest): Promise<Course> {
    const findCourse = await this.coursesRepository.findById(courseId);

    if (!findCourse) {
      throw new AppError('Course not found!');
    }

    const filePath = path.resolve(uploadConfig.fileFolder, findCourse.image);

    await fs.promises.unlink(filePath);

    const updatedCourse = await this.coursesRepository.update(findCourse, data);

    return updatedCourse;
  }
}
