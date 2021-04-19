import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/uploadConfig';
// import ensureAuthentication from '@modules/session/infra/http/middlewares/ensureAuthentication';

import CoursesController from '../controllers/CoursesController';

const coursesRoutes = Router();
const coursesController = new CoursesController();
const upload = multer(uploadConfig);

// coursesRoutes.use(ensureAuthentication);

coursesRoutes.get('/', coursesController.index);
coursesRoutes.post('/', upload.single('image'), coursesController.create);
coursesRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  upload.single('image'),
  coursesController.update,
);

export default coursesRoutes;
