import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/authConfig';
import AppError from '@shared/errors/AppError';

interface IPayloadToken {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthentication(
  req: Request,
  _: Response,
  next: NextFunction,
): void {
  const headers = req.headers.authorization;

  if (!headers) {
    throw new AppError('Authorization token is missing!');
  }

  const [, token] = headers.split(' ');

  try {
    const { sub } = verify(token, authConfig.jwt.secret) as IPayloadToken;

    req.user = {
      id: sub,
    };

    next();
  } catch {
    throw new AppError('Invalid authorization token!');
  }
}
