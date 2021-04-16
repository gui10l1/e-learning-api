import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUsersService from '@modules/user/services/CreateUsersService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password, name } = req.body;

    const service = container.resolve(CreateUsersService);

    const response = await service.execute({
      email,
      password,
      name,
    });

    const user = classToClass(response);

    return res.status(201).json(user);
  }
}
