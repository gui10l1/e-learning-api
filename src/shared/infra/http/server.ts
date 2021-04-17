import 'reflect-metadata';
import 'dotenv';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';

import uploadConfig from '@config/uploadConfig';
import routes from './routes';
import AppError from '../../errors/AppError';

import '../database/typeorm/connection';
import '../../containers';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.fileFolder));
app.use(errors());
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.code).json({ type: 'error', message: err.message });
  }

  console.error(err);

  return res.status(500).json({
    type: 'error',
    message: 'Internal server error!',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333 (e-learning)');
});
