import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateSessionsService from '@modules/session/services/CreateSessionsService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const service = container.resolve(CreateSessionsService);

    const { token, user: responsedUser } = await service.execute({
      email,
      password,
    });

    const user = classToClass(responsedUser);

    return res.status(201).json({ user, token });
  }
}
