import FakeCoursesRepository from '@modules/course/repositories/fakes/FakeCoursesRepository';
import AppError from '@shared/errors/AppError';

import FakeLessonsRepository from '../repositories/fakes/FakeLessonsRepository';
import ListLessonsByCourseIdService from './ListLessonsByCourseIdService';

let fakeCoursesRepository: FakeCoursesRepository;
let fakeLessonsRepository: FakeLessonsRepository;
let listLessonsByCourseIdService: ListLessonsByCourseIdService;

describe('ListLessonsByCourseId', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    fakeLessonsRepository = new FakeLessonsRepository();
    listLessonsByCourseIdService = new ListLessonsByCourseIdService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
  });

  it('should not be able to list lessons from a non-existing course', async () => {
    await expect(
      listLessonsByCourseIdService.execute({
        courseId: 'non-existing-course',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to list lessons from a course', async () => {
    const course = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course one',
    });

    const lessonOne = await fakeLessonsRepository.create({
      course_id: course.id,
      description: 'Lesson one description',
      duration: 90,
      name: 'Lesson one',
      video_id: 'lesson-one-video-id',
    });

    const lessonTwo = await fakeLessonsRepository.create({
      course_id: course.id,
      description: 'Lesson two description',
      duration: 90,
      name: 'Lesson two',
      video_id: 'lesson-two-video-id',
    });

    await fakeLessonsRepository.create({
      course_id: 'any-other-course',
      description: 'Lesson one description',
      duration: 90,
      name: 'Lesson one',
      video_id: 'lesson-one-video-id',
    });

    const lessons = await listLessonsByCourseIdService.execute({
      courseId: course.id,
    });

    expect(lessons).toEqual([lessonOne, lessonTwo]);
  });
});
