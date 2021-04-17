import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '../providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import UpdateCoursesService from './UpdateCoursesService';

let fakeStorageProvider: FakeStorageProvider;
let fakeCoursesRepository: FakeCoursesRepository;
let updateCoursesService: UpdateCoursesService;

describe('UpdateCourses', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeCoursesRepository = new FakeCoursesRepository();
    updateCoursesService = new UpdateCoursesService(
      fakeCoursesRepository,
      fakeStorageProvider,
    );
  });

  it('should not be able to update a non-existing course', async () => {
    await expect(
      updateCoursesService.execute({
        courseId: 'non-existing-course',
        data: {
          image: 'pathtofile.jpeg',
          name: 'Course name',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a course', async () => {
    const { id } = await fakeCoursesRepository.create({
      image: 'image.jpeg',
      name: 'Course One',
    });

    const updatedCourse = await updateCoursesService.execute({
      courseId: id,
      data: {
        image: 'image.png',
        name: 'Course One Edited',
      },
    });

    expect(updatedCourse.name).toBe('Course One Edited');
    expect(updatedCourse.id).toBe(id);
  });

  it('should not be able to update a course if the name was not provided', async () => {
    const { id } = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course name',
    });

    await expect(
      updateCoursesService.execute({
        courseId: id,
        data: {
          image: 'newimage.png',
          name: '',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
