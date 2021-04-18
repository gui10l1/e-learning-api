import FakeCoursesRepository from '@modules/course/repositories/fakes/FakeCoursesRepository';
import AppError from '@shared/errors/AppError';

import FakeLessonsRepository from '../repositories/fakes/FakeLessonsRepository';
import CreateLessonsService from './CreateLessonsService';

let fakeCoursesRepository: FakeCoursesRepository;
let fakeLessonsRepository: FakeLessonsRepository;
let createLessonsService: CreateLessonsService;

describe('CreateLessons', () => {
  beforeEach(() => {
    fakeCoursesRepository = new FakeCoursesRepository();
    fakeLessonsRepository = new FakeLessonsRepository();
    createLessonsService = new CreateLessonsService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
  });

  it('should not be able to create lessons to a non-existing course', async () => {
    await expect(
      createLessonsService.execute({
        course_id: 'non-existing-course',
        description: 'New lesson from course',
        duration: 90,
        name: 'Lesson one',
        video_id: 'video-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a lesson with duplicated name in same course', async () => {
    const course = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course one',
    });

    await fakeLessonsRepository.create({
      course_id: course.id,
      description: 'New lesson from course one',
      duration: 90,
      name: 'Lesson one',
      video_id: 'video-id',
    });

    await expect(
      createLessonsService.execute({
        course_id: course.id,
        description: 'A brand new lesson from course one',
        duration: 120,
        name: 'Lesson one',
        video_id: 'video-id-two',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new lesson', async () => {
    const course = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course one',
    });

    const lesson = await createLessonsService.execute({
      course_id: course.id,
      description: 'New lesson from course one',
      duration: 90,
      name: 'Lesson one',
      video_id: 'video-id',
    });

    expect(lesson).toHaveProperty('id');
    expect(lesson.name).toBe('Lesson one');
  });
});
