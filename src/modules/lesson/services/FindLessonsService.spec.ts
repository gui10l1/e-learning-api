import AppError from '@shared/errors/AppError';
import FakeLessonsRepository from '../repositories/fakes/FakeLessonsRepository';
import FindLessonsService from './FindLessonsService';

let fakeLessonsRepository: FakeLessonsRepository;
let findLessonsService: FindLessonsService;

describe('FindLessons', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository();
    findLessonsService = new FindLessonsService(fakeLessonsRepository);
  });

  it('should not be able to find a non-existing lesson', async () => {
    await expect(
      findLessonsService.execute({
        lessonId: 'non-existing-lesson',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to find a lesson', async () => {
    const { id } = await fakeLessonsRepository.create({
      course_id: 'course-id',
      description: 'Lesson description',
      duration: 90,
      name: 'Lesson one',
      video_id: 'lesson-one-video-id',
    });

    const lesson = await findLessonsService.execute({ lessonId: id });

    expect(lesson.id).toBe(id);
    expect(lesson.name).toBe('Lesson one');
  });
});
