import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import CreateCoursesService from './CreateCoursesService';

let fakeCoursesRepository: FakeCoursesRepository;
let createCoursesService: CreateCoursesService;

describe('CreateCourses', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    createCoursesService = new CreateCoursesService(fakeCoursesRepository);
  });

  it('should be able to create a new course', async () => {
    const course = await createCoursesService.execute({
      image: 'filepathtocourseimage.png',
      name: 'Biology course',
    });

    expect(course).toHaveProperty('id');
    expect(course.name).toBe('Biology course');
  });
});
