import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateCreate = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(20).required(),
  });

  return validate(req, res, schema);
};

export const validateModify = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    name: Joi.string().max(20).required(),
  });

  return validate(req, res, schema);
};