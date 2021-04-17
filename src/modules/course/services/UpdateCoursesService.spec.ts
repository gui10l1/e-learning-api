import AppError from '@shared/errors/AppError';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import UpdateCoursesService from './UpdateCoursesService';

let fakeCoursesRepository: FakeCoursesRepository;
let updateCoursesService: UpdateCoursesService;

describe('UpdateCourses', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    updateCoursesService = new UpdateCoursesService(fakeCoursesRepository);
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
});
