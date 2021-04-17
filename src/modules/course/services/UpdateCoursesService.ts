import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateCoursesServiceDTO from '../dtos/ICreateCoursesServiceDTO';
import Course from '../infra/database/typeorm/entities/Course';
import ICoursesRepository from '../repositories/ICoursesRepository';
import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  courseId: string;
  data: ICreateCoursesServiceDTO;
}

@injectable()
export default class UpdateCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ courseId, data }: IRequest): Promise<Course> {
    if (!data.name) {
      await this.storageProvider.deleteFile(data.image);
      throw new AppError('Name field is required!');
    }

    const findCourse = await this.coursesRepository.findById(courseId);

    if (!findCourse) {
      throw new AppError('Course not found!');
    }

    await this.storageProvider.deleteFile(findCourse.image);

    await this.storageProvider.saveFile(data.image);

    const updatedCourse = await this.coursesRepository.update(findCourse, data);

    return updatedCourse;
  }
}
