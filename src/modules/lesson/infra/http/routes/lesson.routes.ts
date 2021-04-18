import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@modules/session/infra/http/middlewares/ensureAuthentication';

import LessonsController from '../controllers/LessonsController';

const lessonRoutes = Router();
const lessonsController = new LessonsController();

// GET
lessonRoutes.get('/', ensureAuthentication, lessonsController.index);
lessonRoutes.get('/:id', lessonsController.find);

// POST
lessonRoutes.post(
  '/',
  ensureAuthentication,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      video_id: Joi.string().required(),
      course_id: Joi.string().uuid().required(),
      description: Joi.string().required(),
      duration: Joi.number().required(),
    },
  }),
  lessonsController.create,
);

// PUT
lessonRoutes.put(
  '/:id',
  ensureAuthentication,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  lessonsController.update,
);

export default lessonRoutes;
