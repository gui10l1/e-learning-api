import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/uploadConfig';
import ensureAuthentication from '@modules/session/infra/http/middlewares/ensureAuthentication';

import CoursesController from '../controllers/CoursesController';

const coursesRoutes = Router();
const coursesController = new CoursesController();
const upload = multer(uploadConfig);

coursesRoutes.use(ensureAuthentication);

coursesRoutes.get('/', coursesController.index);
coursesRoutes.post('/', upload.single('image'), coursesController.create);
coursesRoutes.put('/', upload.single('image'), coursesController.update);

export default coursesRoutes;
