import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateLessonsService from '@modules/lesson/services/CreateLessonsService';
import FindLessonsService from '@modules/lesson/services/FindLessonsService';
import ListLessonsService from '@modules/lesson/services/ListLessonsService';
import UpdateLessonsService from '@modules/lesson/services/UpdateLessonsService';

export default class LessonsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListLessonsService);

    const lessons = await service.execute();

    const response = classToClass(lessons);

    return res.status(200).json(response);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, duration, course_id, description, video_id } = req.body;

    const service = container.resolve(CreateLessonsService);

    const lesson = await service.execute({
      course_id,
      description,
      duration,
      name,
      video_id,
    });

    const response = classToClass(lesson);

    return res.status(201).json(response);
  }

  public async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = container.resolve(FindLessonsService);

    const lesson = await service.execute({
      lessonId: id,
    });

    const response = classToClass(lesson);

    return res.status(200).json(response);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { id } = req.params;

    const service = container.resolve(UpdateLessonsService);

    const lesson = await service.execute({
      lessonId: id,
      data,
    });

    const response = classToClass(lesson);

    return res.status(201).json(response);
  }
}
