import { Router } from 'express';

import sessionRoutes from '@modules/session/infra/http/routes/session.routes';
import userRoutes from '@modules/user/infra/http/routes/user.routes';
import courseRoutes from '@modules/course/infra/http/routes/course.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);
routes.use('/users', userRoutes);
routes.use('/courses', courseRoutes);

export default routes;
