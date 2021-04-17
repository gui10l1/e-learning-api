import { Express, Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCoursesService from '@modules/course/services/CreateCoursesService';
import ListCoursesService from '@modules/course/services/ListCoursesService';

export default class CoursesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListCoursesService);

    const response = await service.execute();

    const courses = classToClass(response);

    return res.status(200).json(courses);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const filesFromRequest = req.file as Express.Multer.File;

    const image = filesFromRequest.filename;

    const service = container.resolve(CreateCoursesService);

    const response = await service.execute({
      image,
      name,
    });

    const course = classToClass(response);

    return res.status(201).json(course);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    return res.send({ name });
  }
}
