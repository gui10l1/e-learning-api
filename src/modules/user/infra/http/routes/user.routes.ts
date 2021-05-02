import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ensureAuthentication from '@modules/session/infra/http/middlewares/ensureAuthentication';

import UsersController from '../controllers/UsersController';

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.use(ensureAuthentication);

// POST
userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default userRoutes;
