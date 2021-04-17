import FakeCoursesRepository from '../repositories/fakes/FakeCoursesRepository';
import ListCoursesService from './ListCoursesService';

let fakeCoursesRepository: FakeCoursesRepository;
let listCoursesService: ListCoursesService;

describe('ListCourses', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    listCoursesService = new ListCoursesService(fakeCoursesRepository);
  });

  it('should be able to list courses', async () => {
    const courseOne = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course One',
    });

    const courseTwo = await fakeCoursesRepository.create({
      image: 'image2.png',
      name: 'Course Two',
    });

    const courses = await listCoursesService.execute();

    expect(courses).toEqual([courseOne, courseTwo]);
  });
});
