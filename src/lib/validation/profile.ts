import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    pw: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(20).required(),
    profile_image: Joi.string().max(800).required(),
  });

  return validate(req, res, schema);
};