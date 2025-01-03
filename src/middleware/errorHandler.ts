import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import { DEBUG_MODE } from '../config/';
import CustomErrorHandler from '../services/CustomErrorHandler';

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): Response => {
  let statusCode = 500;
  let data = {
    message: 'Internal server error',
    ...(DEBUG_MODE === 'true' && { originalError: (err as Error).message }),
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorHandler;
