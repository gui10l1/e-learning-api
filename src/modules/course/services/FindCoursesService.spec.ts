import AppError from '@shared/errors/AppError';
import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import FindCoursesService from './FindCoursesService';

let fakeCoursesRepository: FakeCoursesRepository;
let findCoursesService: FindCoursesService;

describe('FindCourses', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    findCoursesService = new FindCoursesService(fakeCoursesRepository);
  });

  it('should not be able to find a non-existing course', async () => {
    await expect(
      findCoursesService.execute('non-existing-course'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find a course', async () => {
    const { id } = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course one',
    });

    const course = await findCoursesService.execute(id);

    expect(course.id).toBe(id);
    expect(course.name).toBe('Course one');
  });
});
