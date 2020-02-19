import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
    post_idx: Joi.number().integer().required(),
    reply_to: Joi.number().integer(),
  });

  return validate(req, res, schema);
};
