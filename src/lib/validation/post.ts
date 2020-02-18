import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    title: Joi.string().min(1).max(50).required(),
    content: Joi.string().required(),
    is_private: Joi.boolean().required(),
    category_idx: Joi.number().integer().required(),
  });

  return validate(req, res, schema);
};