import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateCreateURL = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    file_name: Joi.string().required(),
  });

  return validate(req, res, schema);
};
