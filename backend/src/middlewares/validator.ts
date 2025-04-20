import { RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

export const validateBody = (schema: ObjectSchema): RequestHandler => {
  return (req, res, next): void => {
    const obj = req.params?.id ? {...req.body,vehicle:req.params.id } : req.body
    const { error } = schema.validate(obj, { abortEarly: false });
    if (error) {
      res.status(400).json({
        message: 'Validation failed',
        details: error.details.map((d) => d.message),
      });
      return;
    }
    next();
  };
};