import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ICreateCoursesServiceDTO from '../dtos/ICreateCoursesServiceDTO';
import Course from '../infra/database/typeorm/entities/Course';
import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider';
import ICoursesRepository from '../repositories/ICoursesRepository';

@injectable()
export default class CreateCoursesService {
  constructor(
    @inject('CoursesRepository')
    private coursesRepository: ICoursesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    name,
    image,
  }: ICreateCoursesServiceDTO): Promise<Course> {
    if (!name) {
      await this.storageProvider.deleteFile(image);
      throw new AppError('Name field id required!');
    }

    const course = await this.coursesRepository.create({
      image,
      name,
    });

    await this.storageProvider.saveFile(image);

    return course;
  }
}
