import { Router } from 'express';

import SessionController from '../controllers/SessionsController';

const sessionRoutes = Router();
const sessionsController = new SessionController();

sessionRoutes.post('/', sessionsController.create);

export default sessionRoutes;
