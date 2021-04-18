import { Router } from 'express';

import LessonsByCourseController from '../controllers/LessonsByCourseController';

const lessonRoutes = Router();
const lessonsByCourseController = new LessonsByCourseController();

// GET
lessonRoutes.get('/:id', lessonsByCourseController.index);

export default lessonRoutes;
