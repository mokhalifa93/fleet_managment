import { Request, Response, NextFunction } from 'express';
import { log } from '../utils/logs';

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    log.info(logMessage);
  });

  next();
};