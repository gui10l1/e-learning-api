import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListLessonsByCourseIdService from '@modules/lesson/services/ListLessonsByCourseIdService';

export default class LessonsByCourseController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = container.resolve(ListLessonsByCourseIdService);

    const lessons = await service.execute({
      courseId: id,
    });

    const response = classToClass(lessons);

    return res.status(200).json(response);
  }
}
