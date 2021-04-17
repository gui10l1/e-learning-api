import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '../providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import CreateCoursesService from './CreateCoursesService';

let fakeStorageProvider: FakeStorageProvider;
let fakeCoursesRepository: FakeCoursesRepository;
let createCoursesService: CreateCoursesService;

describe('CreateCourses', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeCoursesRepository = new FakeCoursesRepository();
    createCoursesService = new CreateCoursesService(
      fakeCoursesRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new course', async () => {
    const course = await createCoursesService.execute({
      image: 'filepathtocourseimage.png',
      name: 'Biology course',
    });

    expect(course).toHaveProperty('id');
    expect(course.name).toBe('Biology course');
  });

  it('should not ba able to create a new course if name was not provided', async () => {
    await expect(
      createCoursesService.execute({
        image: 'filepathtocourseimage.png',
        name: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
