import { Router } from 'express';

import sessionRoutes from '@modules/session/infra/http/routes/session.routes';
import userRoutes from '@modules/user/infra/http/routes/user.routes';
import courseRoutes from '@modules/course/infra/http/routes/course.routes';
import lessonRoutes from '@modules/lesson/infra/http/routes/lesson.routes';
import courseLessonsRoutes from '@modules/lesson/infra/http/routes/courseLessons.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);
routes.use('/users', userRoutes);
routes.use('/courses', courseRoutes);
routes.use('/lessons', lessonRoutes);
routes.use('/course-lessons', courseLessonsRoutes);

export default routes;
