import FakeCoursesRepository from '@modules/course/repositories/fakes/FakeCoursesRepository';
import AppError from '@shared/errors/AppError';

import FakeLessonsRepository from '../repositories/fakes/FakeLessonsRepository';
import UpdateLessonsService from './UpdateLessonsService';

let fakeLessonsRepository: FakeLessonsRepository;
let fakeCoursesRepository: FakeCoursesRepository;
let updateLessonsServices: UpdateLessonsService;

describe('UpdateLessons', () => {
  beforeEach(() => {
    fakeLessonsRepository = new FakeLessonsRepository();
    fakeCoursesRepository = new FakeCoursesRepository();
    updateLessonsServices = new UpdateLessonsService(
      fakeLessonsRepository,
      fakeCoursesRepository,
    );
  });

  it('should not be able to update a non-existing lesson', async () => {
    const course = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course one',
    });

    await expect(
      updateLessonsServices.execute({
        lessonId: 'non-existing-lesson',
        data: {
          course_id: course.id,
          description: 'Update description',
          duration: 90,
          name: 'Lesson updated',
          video_id: 'updated-video-id',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a lesson to a non-existing course', async () => {
    const course = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course one',
    });

    const lesson = await fakeLessonsRepository.create({
      course_id: course.id,
      description: 'Lesson description',
      duration: 90,
      name: 'New lesson',
      video_id: 'videp-id',
    });

    await expect(
      updateLessonsServices.execute({
        lessonId: lesson.id,
        data: {
          course_id: 'non-exisiting-course',
          description: 'Updated lesson',
          duration: 120,
          name: 'Updated lesson',
          video_id: 'updated-video-id',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to duplicate lesson name', async () => {
    const course = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course one',
    });

    await fakeLessonsRepository.create({
      name: 'Lesson one',
      course_id: course.id,
      description: 'Lesson one description',
      duration: 90,
      video_id: 'lesson-one-video-id',
    });

    const lesson = await fakeLessonsRepository.create({
      course_id: course.id,
      description: 'Lesson two description',
      duration: 90,
      name: 'Lesson two',
      video_id: 'lesson-two-video-id',
    });

    await expect(
      updateLessonsServices.execute({
        lessonId: lesson.id,
        data: {
          course_id: course.id,
          description: 'Lesson two description updated',
          duration: 120,
          name: 'Lesson one',
          video_id: 'lesson-two-video-updated-id',
        },
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a lesson', async () => {
    const courseOne = await fakeCoursesRepository.create({
      image: 'image.png',
      name: 'Course one',
    });

    const courseTwo = await fakeCoursesRepository.create({
      image: 'image.jpeg',
      name: 'Course two',
    });

    const lesson = await fakeLessonsRepository.create({
      name: 'Lesson one',
      course_id: courseOne.id,
      description: 'Lesson one description',
      duration: 90,
      video_id: 'lesson-one-video-id',
    });

    const lessonUpdated = await updateLessonsServices.execute({
      lessonId: lesson.id,
      data: {
        course_id: courseTwo.id,
        description: 'Updated lesson one description',
        duration: 120,
        name: 'Lesson one updated',
        video_id: 'lesson-one-video-updated-id',
      },
    });

    expect(lessonUpdated.id).toBe(lesson.id);
    expect(lessonUpdated.course_id).toBe(courseTwo.id);
    expect(lessonUpdated.name).toBe('Lesson one updated');
  });
});
