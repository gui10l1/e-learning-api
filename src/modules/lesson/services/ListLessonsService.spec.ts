import FakeLessonsRepository from '../repositories/fakes/FakeLessonsRepository';
import ListLessonsService from './ListLessonsService';

let fakeLessonsRepository: FakeLessonsRepository;
let listLessonsService: ListLessonsService;

describe('ListLessonsServive', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository();
    listLessonsService = new ListLessonsService(fakeLessonsRepository);
  });

  it('should be able to list all lessons form database', async () => {
    const lessonOne = await fakeLessonsRepository.create({
      course_id: 'course-one-id',
      description: 'Lesson one descripton',
      duration: 90,
      name: 'Lesson one',
      video_id: 'lesson-one-video-id',
    });

    const lessonTwo = await fakeLessonsRepository.create({
      course_id: 'course-two-id',
      description: 'Lesson two descripton',
      duration: 90,
      name: 'Lesson two',
      video_id: 'lesson-two-video-id',
    });

    const lessonThree = await fakeLessonsRepository.create({
      course_id: 'course-three-id',
      description: 'Lesson three descripton',
      duration: 90,
      name: 'Lesson three',
      video_id: 'lesson-three-video-id',
    });

    const lessons = await listLessonsService.execute();

    expect(lessons).toEqual([lessonOne, lessonTwo, lessonThree]);
  });
});
