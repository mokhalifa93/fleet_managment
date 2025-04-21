import { log } from 'console';
import {RequestHandler } from 'express';
import { ObjectSchema } from 'joi';

import mongoose from 'mongoose';

export const validateObjectId = () :RequestHandler => {
  return (req, res, next): void => {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Invalid vehicle ID format' });
        return
     }
    next();
  };
};
export const validateBody = (schema: ObjectSchema): RequestHandler => {
  return (req, res, next): void => {
    const obj = req.body
    const { error } = schema.validate(obj, { abortEarly: false });
    if (error) {
      console.log(error);
      
      res.status(400).json({
        message: 'Validation failed',
        details: error.details.map((d) => d.message),
      });
      return;
    }
    next();
  };
};