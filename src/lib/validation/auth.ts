import Joi from 'joi';
import validate from './validate';
import { Request, Response } from 'express';

export const validateRegister = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-z]+$/).min(4).max(20).required(),
    pw: Joi.string().min(8).max(25).required(),
    name: Joi.string().required(),
  });

  return validate(req, res, schema);
};

export const validateLogin = (req: Request, res: Response): boolean => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
    pw: Joi.string().required(),
  });

  return validate(req, res, schema);
};